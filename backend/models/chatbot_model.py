import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load API Key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Configure Gemini
if api_key:
    genai.configure(api_key=api_key) # type: ignore
else:
    print("❌ GEMINI_API_KEY not found.")
    raise ValueError("Missing Gemini API Key")

# Initialize model - Corrected model name
model = genai.GenerativeModel(model_name="gemini-2.0-flash")  # Or "gemini-2.0-flashgemini-pro" if preferred

# Chatbot response generator
def generate_response(emotion: str, message: str) -> str:
    prompt = (
        f"You are MoodMate, an empathetic and supportive AI friend.\n"
        f"The user feels {emotion} and said: \"{message}\"\n"
        f"Reply in one short, comforting sentence."
    )

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"❌ Gemini response error: {e}")
        return "Sorry, I'm having trouble responding. Please try again soon."