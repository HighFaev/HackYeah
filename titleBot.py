import os
from dotenv import load_dotenv
import requests

load_dotenv()

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {os.getenv('HF_TOKEN')}",
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def titleGenerator(newsText):
    response = query({
        "messages": [
            {
                "role": "user",
                "content": "Please, just give me just title of the news text. In text may be some additional info not related to the news, ignore it. News text - " + newsText
            }
        ],
        "model": "meta-llama/Llama-3.2-3B-Instruct:hyperbolic"
    })
    if "choices" not in response:
        print("Error from API:", response)
        return -1
    return response["choices"][0]["message"]["content"]

