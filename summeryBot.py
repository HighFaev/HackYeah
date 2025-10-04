import os
from dotenv import load_dotenv
import requests

load_dotenv()

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {os.getenv('HF_SUMMARIZE_TOKEN')}",
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def summary(newsText):
    response = query({
        "messages": [
            {
                "role": "user",
                "content": "Please summarize this news. DO NOT SKIP ANYTHING IMPORTANT." + newsText
            }
        ],
        "model": "meta-llama/Llama-3.2-3B-Instruct:hyperbolic"
    })
    return response["choices"][0]["message"]



