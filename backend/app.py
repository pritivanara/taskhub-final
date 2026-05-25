import requests
import os
import resend
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from utils.supabase_client import supabase

app = Flask(__name__)
load_dotenv()
resend.api_key = os.getenv("RESEND_API_KEY")

CORS(app)

@app.route("/")
def home():
    return {
        "message": "TaskHub Backend Running"
    }

@app.route("/users")
def get_users():

    data = supabase.table("users").select("*").execute()

    return {
        "data": data.data
    }

@app.route("/tasks")
def get_tasks():

    data = supabase.table("tasks").select("*").execute()

    return {
        "data": data.data
    }

@app.route("/add-user", methods=["POST"])
def add_user():

    body = request.json

    data = supabase.table("users").insert({
        "name": body["name"],
        "email": body["email"]
    }).execute()

    return {
        "message": "User Added",
        "data": data.data
    }

@app.route("/delete-task/<int:id>", methods=["DELETE"])
def delete_task(id):

    supabase.table("tasks").delete().eq("id", id).execute()

    return {
        "message": "Task Deleted"
    }

@app.route("/complete-task/<int:id>", methods=["PUT"])
def complete_task(id):

    supabase.table("tasks").update({
        "completed": True
    }).eq("id", id).execute()

    return {
        "message": "Task Completed"
    }



@app.route("/add-task", methods=["POST"])
def add_task():

    body = request.json

    data = supabase.table("tasks").insert({
    "title": body["title"],
    "description": body["description"],
    "assigned_to": body["assigned_to"],
    "completed": False
}).execute()

    try:

        params = {
            "from": "onboarding@resend.dev",
            "to": [body["assigned_to"]],
            "subject": "New Task Created 🚀",
            "html": f"""
                <h2>TaskHub Notification</h2>

                <p>A new task was created successfully.</p>

                <p><b>Title:</b> {body["title"]}</p>
            """
        }

        resend.Emails.send(params)

    except Exception as e:
        print(e)

    return {
        "message": "Task Added",
        "data": data.data
    }

@app.route("/generate-ai-images", methods=["POST"])
def generate_ai_images():

    headers = {
        "Authorization": f"Bearer {os.getenv('HF_TOKEN')}",
        "Content-Type": "application/json"
    }

    API_URL = "https://router.huggingface.co/hf-inference/models/prompthero/openjourney"

    payload = {
    "inputs": "professional product photography of luxury headphones, studio lighting, ultra realistic, commercial ad"
}

    response = requests.post(
        API_URL,
        headers=headers,
        json=payload
    )

    return {
        "status_code": response.status_code,
        "response": response.text
    }

@app.route("/send-email")
def send_email():

    params = {
        "from": "onboarding@resend.dev",
        "to": ["pritivanara@gmail.com"],
        "subject": "TaskHub Email Test",
        "html": "<h1>Email Notifications Working 🚀</h1>"
    }

    email = resend.Emails.send(params)

    return email

if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    port=int(os.environ.get("PORT", 5000))
)