# from langchain_community.vectorstores import Chroma
# from langchain_community.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain.vectorstores.chroma import Chroma as RawChroma

# import os

# CHROMA_DIR = "chroma_db"
# COLLECTION_NAME = "TransitFlow"

# pdf_path = "./Transit_Chatbot.pdf"
# embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

# def get_vectorstore():
#     # Check if persistent DB already exists
#     if os.path.exists(CHROMA_DIR) and len(os.listdir(CHROMA_DIR)) > 0:
#         print("✅ Loading existing Chroma vectorstore")
#         return Chroma(
#             embedding_function=embeddings,
#             collection_name=COLLECTION_NAME,
#             persist_directory=CHROMA_DIR
#         )
    
#     print("⏳ Creating new Chroma vectorstore...")

#     loader = PyPDFLoader(pdf_path)
#     pages = loader.load()

#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=200)
#     chunks = text_splitter.split_documents(pages)

#     vectorstore = Chroma.from_documents(
#         documents=chunks,
#         embedding=embeddings,
#         collection_name=COLLECTION_NAME,
#         persist_directory=CHROMA_DIR
#     )
#     vectorstore.persist()
#     print("✅ Vectorstore created and saved")

#     return vectorstore

# from langchain_astradb import AstraDBVectorStore
# from langchain_community.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# import os

# # Configuration
# COLLECTION_NAME = "transitflow_chatbot"
# EMBEDDING_MODEL = "models/embedding-001"  # Google's embedding model

# def get_vectorstore():
#     # Initialize Google's embedding model
#     embeddings = GoogleGenerativeAIEmbeddings(
#         model=EMBEDDING_MODEL,
#         google_api_key=os.getenv("GOOGLE_API_KEY")
#     )
    
#     # Initialize AstraDB vector store
#     vectorstore = AstraDBVectorStore(
#         embedding=embeddings,
#         collection_name=COLLECTION_NAME,
#         token=os.getenv("ASTRA_DB_APPLICATION_TOKEN"),
#         api_endpoint=os.getenv("ASTRA_DB_API_ENDPOINT"),
#     )
    
#     # Check if collection is empty
#     if vectorstore.similarity_search("test", k=1):
#         print("✅ Using existing AstraDB collection")
#         return vectorstore
    
#     print("⏳ Creating new AstraDB collection...")
    
#     # Load and process PDF
#     loader = PyPDFLoader("./Transit_Chatbot.pdf")
#     pages = loader.load()
    
#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=800,
#         chunk_overlap=200
#     )
#     chunks = text_splitter.split_documents(pages)
    
#     # Add documents to AstraDB
#     vectorstore.add_documents(chunks)
#     print("✅ Documents added to AstraDB")
    
#     return vectorstore