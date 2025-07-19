from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma as RawChroma

import os

CHROMA_DIR = "chroma_db"
COLLECTION_NAME = "TransitFlow"

pdf_path = "./Transit_Chatbot.pdf"
embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

def get_vectorstore():
    # Check if persistent DB already exists
    if os.path.exists(CHROMA_DIR) and len(os.listdir(CHROMA_DIR)) > 0:
        print("✅ Loading existing Chroma vectorstore")
        return Chroma(
            embedding_function=embeddings,
            collection_name=COLLECTION_NAME,
            persist_directory=CHROMA_DIR
        )
    
    print("⏳ Creating new Chroma vectorstore...")

    loader = PyPDFLoader(pdf_path)
    pages = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=200)
    chunks = text_splitter.split_documents(pages)

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=CHROMA_DIR
    )
    vectorstore.persist()
    print("✅ Vectorstore created and saved")

    return vectorstore
