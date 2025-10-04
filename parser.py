import requests
from bs4 import BeautifulSoup

def grab_text_from_url(url: str) -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        text = soup.get_text(separator="\n", strip=True)
        return text
    except requests.RequestException as e:
        return f"Error fetching URL: {e}"
