import os
from dotenv import load_dotenv
import requests

load_dotenv()

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {os.getenv('HF_TOKEN2')}",
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def judgeArticles(newsText, anotherNewsText):
    response = query({
        "messages": [
            {
                "role": "user",
                "content": "I will show you two summarized text of two news. Read them and say if second article agrees, disagrees or unrelated to the second article. IN RESPONSE RETURN ONE WORD - agreed OR disagreed OR unrelated DO NOT CHANGE THE FORM OF THIS WORDS AND DO NOT ADD ANY ADDITIONAL SYMBOLS. FIRST NEW:\n" + newsText + "\nSECOND NEW:\n" + anotherNewsText
            }
        ],
        "model": "meta-llama/Llama-3.2-3B-Instruct:hyperbolic"
    })
    if "choices" not in response:
        print("Error from API:", response)
        return -1
    return response["choices"][0]["message"]["content"]

