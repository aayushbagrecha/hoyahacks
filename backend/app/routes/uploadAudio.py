from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
from app.models import insert_patient_consultation
import os
import whisper
import requests
router = APIRouter()

async def transcribe_audio(audio_path, output_file):
    try:
        model = whisper.load_model("small")
        result = model.transcribe(audio_path, task = "translate")
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(result["text"])

        print("\nTranscription saved to 'transcription.txt'.")
        return result["text"]
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None
async def generate_summary(conversation_text):
    if not conversation_text:
        print("No conversation text available.")
        return None

    API_URL = "http://10.150.237.60:1234/v1/chat/completions"

    prompt = f"""
    Give information from the following conversation for:
    
    1. *Symptoms:* List all reported symptoms.
    2. *Prescriptions:* List the prescribed medications with medicine name and times to take.
    3. *Lab Tests:* Name the suggested tests.
    4. *General Health Advice:* Provide advice given by the doctor.
    5. *Drug Interaction Warnings:* 
        - Identify potential interactions between prescribed medications.
        - Highlight any contraindications or special precautions.
        - Provide alerts about possible side effects and safety guidelines.

    Conversation start:

    {conversation_text}

    <conversation end>

    Don't include the entire conversation.

    Provide the summary in bullet points.
    
    """

    payload = {
        "model": "iecjsu/Llama-32-3B-IT-ChatDoctor",
        "messages": [
            {"role": "system", "content": "You are a helpful medical assistant."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.5,
        "max_tokens": 1000,
    }

    try:
        print("Sending request to LM Studio...")
        response = requests.post(API_URL, json=payload, timeout=600)
        response_json = response.json()

        if 'choices' in response_json and len(response_json['choices']) > 0:
            generated_text = response_json['choices'][0]['message']['content']

            summary_text = generated_text.strip()
            summary_file_path = "summary.txt"
            
            with open(summary_file_path, "w", encoding="utf-8") as summary_file:
                summary_file.write(summary_text)
            return summary_text
        elif 'error' in response_json:
            print("API Error:", response_json['error'])
            return None
        else:
            print("Unexpected response format:", response_json)
            return None
    except Exception as e:
        print(f"Error during API request: {e}")
        return None

@router.post("/")
async def upload_audio(user_id: str = Form(...), doc_id: str = Form(...), file: UploadFile = File(...)):
    try:
        print("Uploading audio file...")
        print(f"User ID: {user_id}")
        print(f"Doc ID: {doc_id}")
        print(f"File Name: {file.filename}")
        
        DATA_FOLDER = "data"
        if not os.path.exists(DATA_FOLDER):
            os.makedirs(DATA_FOLDER)

        # Save the uploaded file
        file_path = os.path.join(DATA_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        transcription_file_path = "transcription.txt"
        
        conversation_text = await transcribe_audio('data/'+file.filename, transcription_file_path)
        summary = await generate_summary(conversation_text)
        # print(user_id,doc_id, summary)
        result = insert_patient_consultation({"patientId": user_id, "doctorId": doc_id, "summary": summary})
        print(result)

        return JSONResponse({"message": "File uploaded successfully", "file_path": file_path, "consultation_summary": summary})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
