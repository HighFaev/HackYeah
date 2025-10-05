import os

import requests
from dotenv import load_dotenv

load_dotenv()

def get_news_urls(title, num_results=11):
    base_url = "https://newsapi.org/v2/everything"

    params = {
        'q': title,
        'pageSize': num_results,
        'apiKey': os.getenv('NEWS_API_KEY'),
        'sortBy': 'relevancy'
    }

    try:
        response = requests.get(url=base_url, params=params)
        response.raise_for_status()

        data = response.json()
        articles = data.get('articles', [])

        return [article['url'] for article in articles if article['url']]

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при запросе: {e}")
        return []
    except KeyError:
        print("Некорректный ответ от API")
        return []