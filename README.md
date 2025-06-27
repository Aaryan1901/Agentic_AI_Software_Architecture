# 🧠 Design Panda: Agentic AI-Based Software Architecture Enhancer

> **🏆 Special Mention Award @ ETE 5.0 Hackathon**  
> Developed by Team NOT NULL | Puducherry Technological University

---

## 🚀 About the Project

**Design Panda** is an agentic AI system designed to automate and enhance the software architecture design process using intelligent LLM agents. It mirrors the human-driven software design workflow through a multi-agent pipeline and retrieval-augmented generation (RAG), ensuring intelligent decision-making, optimization, and validation.

---

## 🧩 How It Works

The system employs a **multi-agent model** with the following roles:

### 👤 Requirements Engineer
- Extracts detailed functional and non-functional requirements from user input.

### 🏗️ Architect
- Generates an initial software architecture based on extracted requirements.
- Leverages contextual data using FAISS + BM25 RAG.

### 🧐 Critic
- Analyzes architecture for design flaws, anti-patterns, and misalignments.
- If flawed, routes to the Optimizer; otherwise, forwards to the Arbiter.

### 🔧 Optimizer
- Refines the architecture using Critic feedback and requirement constraints.
- Supports up to 3 optimization cycles to prevent infinite loops.

### ⚖️ Arbiter
- Performs final validation.
- Ensures alignment with original business requirements before delivery.

### 📐 UML Generator
- Converts the finalized architecture into a PlantUML-based class/component diagram.

---

## 📊 System Architecture

```mermaid
graph LR
    A[User Input] --> B(Requirements Engineer)
    B --> C(Architect)
    C --> D(Critic)
    D -- Needs Optimization --> E(Optimizer)
    E --> D
    D -- Optimal --> F(Arbiter)
    F --> G(UML Generator)
    G --> H[Final Output]
🔧 Tech Stack
Layer	Technology
Agent Orchestration	LangGraph, LangChain
Language Models	Groq (CodeLlama, Deepseek-r1, StarCoder2, Mixtral, Qwen-2.5)
Backend	FastAPI, Streamlit (testing)
Frontend	React
Vector Stores	FAISS, BM25Retriever
Embeddings	HuggingFace – BAAI/bge-base-en-v1.5

💻 Run Locally
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Aaryan1901/Agentic_AI_Software_Architecture.git
cd Agentic_AI_Software_Architecture
2. Set Up Virtual Environment
bash
Copy
Edit
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
3. Install Dependencies
bash
Copy
Edit
pip install -r requirements.txt
4. Run the Backend (FastAPI)
bash
Copy
Edit
uvicorn main:app --reload
API is available at: http://localhost:8000

5. Run the Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
🌐 Live Demo
Static UI: https://agentic-ai-virid.vercel.app

👨‍💻 Developed By
Team NOT NULL – Puducherry Technological University

Aaryan M

Aadhithya Selvaraj

Amalesh Kalaimani

Aadhavan

Anandhan

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgments
ETE 5.0 Hackathon – SVCE

FODSE – Forum of Data Science Engineers

LangChain, LangGraph, Groq, HuggingFace, and all open-source contributors










