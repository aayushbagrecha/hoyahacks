from fastapi import APIRouter, Depends, HTTPException
from jose import jwt, JWTError
from app.database import user_collection
from app.config import SECRET_KEY, ALGORITHM
from fastapi.security import OAuth2PasswordBearer
from app.models import getUser_summaries
import requests

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def chatbot():
    # summary = load_summary()
    # if not summary:
        # print("Generating summary now...")
        # conversation_text = read_transcription(transcription_file_path)
        # summary = generate_summary(conversation_text)

        # if not summary:
            # print("Failed to generate summary. Exiting chatbot.")
            # return

    print("\nChatbot is ready! Ask anything related to the medical summary.")
    print("Type 'exit' to end the conversation.\n")

    API_URL = "http://10.150.237.60:1234/v1/chat/completions"

    async def getUserSummaries(username):
      summaries = getUser_summaries(username)
      patientReport = ''
      cnt = 1
      for sum in summaries:
        patientReport = patientReport + f'\n Report {cnt}' + sum
        cnt += 1
      return patientReport
    
    @router.post("/chatBot")
    async def chat(userMessage,username):
      summary = await getUserSummaries(username)
      prompt = f"""
        You are a medical expert and will help me with a few questions based on the following consultation summary with my doctor.
        Here is a summarized medical report:

        {summary}

        Based on this, answer the following question:
        {userMessage}
        """
      
      payload = {
            "model": "iecjsu/Llama-32-3B-IT-ChatDoctor",
            "messages": [
                {"role": "system", "content": "You are a helpful medical assistant providing answers based on the provided medical summary."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 500,
        }
      try:
        response = requests.post(API_URL, json=payload, timeout=600)
        response_json = response.json()

        if 'choices' in response_json and len(response_json['choices']) > 0:
            chatbot_response = response_json['choices'][0]['message']['content']
            print("\nChatbot:", chatbot_response)
            return {"message": chatbot_response}
        else:
            print("Unexpected response format.")
            return {"message": "Unexpected response format"}
      except Exception as e:
        print(f"Error during chatbot interaction: {e}")
        return {"message": f"Error during chatbot interaction: {e}"}
