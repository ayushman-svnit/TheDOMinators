from dotenv import load_dotenv
import os

load_dotenv()

from typing import TypedDict, Annotated, Sequence, List
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, ToolMessage, SystemMessage
from operator import add as add_messages
from langchain_core.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI

from vectorstore_setup import get_vectorstore

# Load vectorstore and retriever
vectorstore = get_vectorstore()
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 5})

@tool
def retriever_tool(query: str) -> str:
    """
    Retrieves relevant information from the TransitFlow knowledge base using semantic search.

    This tool queries an embedded document index (via LangGraph's retriever) for chunks of 
    information related to the user's query. It returns the top matching document segments 
    from the TransitFlow knowledge base, which contains details about:

    - City transportation systems (BRTS, local buses, railway routes)
    - Real-time schedules and service alerts
    - Fare calculation tools
    - Smart parking and ride-sharing recommendations
    - Platform features and developer credits

    Args:
        query (str): A natural language query about urban transit, smart commuting, or platform features.

    Returns:
        str: A formatted string containing one or more relevant document segments. If no results are found,
             a fallback message is returned.    """
    docs = retriever.invoke(query)
    if not docs:
        return "I found no relevant information."
    return "\n\n".join([f"Document {i+1}:\n{doc.page_content}" for i, doc in enumerate(docs)])

tools = [retriever_tool]
tools_dict = {tool_.name: tool_ for tool_ in tools}

# LLM and tool binding
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0).bind_tools(tools)

system_prompt = """
Your name is "Saarthi".You are Transit ChatBot, the smart travel companion for the website "TransitFlow"—a user-centric web app focused on city transportation.

Your role is to assist users in navigating city transit options efficiently. Provide helpful, accurate, and concise responses based on the following knowledge:

- The site offers an interactive map showing local and BRTS bus routes, as well as railway routes. Users can click on routes to view schedules, stops, and live tracking.
- You provide real-time bus/train arrival times, traffic-based dynamic updates, and service alerts (e.g., route changes, delays, detours).
- There is a fare calculator to estimate costs between stops and across transport types.
- For smart parking solutions, direct users to https://amazon.com.
- For carpooling and ride-sharing solutions, direct users to https://flipkart.com.
- You also assist with futuristic transit queries involving smart mobility, AI-powered traffic optimization, or sustainable transport ideas.
- The site is called TransitFlow, developed by Jenil Prajapati, Krishna Tahiliani, Ayushman Singh, and Vineet Gupta.

If users ask questions outside this domain, politely inform them that your expertise is limited to the TransitFlow platform and urban transit-related topics.
Always aim to be clear, concise, and helpful.
Always format your response in Markdown for better readability.
"""
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]

def should_continue(state: AgentState):
    """Check if the last message contains tool calls."""
    result = state['messages'][-1]
    return hasattr(result, 'tool_calls') and len(result.tool_calls) > 0

def call_llm(state: AgentState) -> AgentState:
    """Function to call the LLM with the current state."""
    messages = [SystemMessage(content=system_prompt)] + list(state["messages"])
    response = llm.invoke(messages)
    return {"messages": [response]}

def take_action(state: AgentState) -> AgentState:
    """Execute tool calls from the LLM's response."""
    tool_calls = state['messages'][-1].tool_calls
    results = []

    for call in tool_calls:
        result = tools_dict[call["name"]].invoke(call["args"].get("query", ""))
        results.append(ToolMessage(tool_call_id=call["id"], name=call["name"], content=str(result)))
    
    return {"messages": results}

graph = StateGraph(AgentState)
graph.add_node("llm", call_llm)
graph.add_node("retriever_agent", take_action)
graph.add_conditional_edges("llm", should_continue, {True: "retriever_agent", False: END})
graph.add_edge("retriever_agent", "llm")
graph.set_entry_point("llm")

rag_agent = graph.compile()

def ask_question(messages: List[BaseMessage]) -> str:
    result = rag_agent.invoke({"messages": messages})
    return result["messages"][-1].content