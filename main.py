import time
from typing import Union

from fastapi import FastAPI

from starlette.responses import FileResponse, JSONResponse

import judgeBot
import parser, summeryBot, titleBot, urlsFinder


app = FastAPI()

@app.get("/")
def read_root():
    return FileResponse('index.html')

@app.get("/parse-text")
def parse_url(url: str):
    return parser.grab_text_from_url(url)

@app.get("/summarize")
def summarize(newsText: str):
    summarizedText = summeryBot.summary(newsText)
    while(summarizedText == -1):
        time.sleep(1)
        summarizedText = summeryBot.summary(newsText)
    return summarizedText


@app.get("/title-generator")
def generate_title(summarizedText: str):
    title = titleBot.titleGenerator(summarizedText)
    while(title == -1):
        time.sleep(1)
        title = titleBot.titleGenerator(summarizedText)
    return title


@app.get("/urls-grabber")
def urls_grabber(newsTitle: str):
    urls = urlsFinder.get_news_urls(newsTitle)
    for url in urls:
        print(url)
    return urls

@app.get("/judge-two-articles")
def judge_two_articles(newsTitle: str, anotherNewsArticle: str):
    result = judgeBot.judgeArticles(newsTitle, anotherNewsArticle)
    while result == -1:
        time.sleep(1)
        result = judgeBot.judgeArticles(newsTitle, anotherNewsArticle)
    return result

@app.get("/get-score")
def get_score(url: str):
    text_of_news = parse_url(url)
    print("GRABBED TEXT")
    summarized_text = summarize(text_of_news)
    print("SUMMARIZED TEXT: " + summarized_text)
    news_title = generate_title(summarized_text)
    print("GENERATED TITLE: " + news_title)
    urls = urls_grabber(news_title.encode())
    print("FOUND URLS: " + str(len(urls)))
    score = {
        "agreed": 0,
        "disagreed": 0,
        "unrelated": 0
    }   
    for url in urls:
        anotherText = parse_url(url)
        print("\tGRABBED INFO FROM URL")
        summarizedAnotherText = summarize(anotherText)
        print("\tSUMMARIZED TEXT: " + summarizedAnotherText)
        result = judge_two_articles(news_title, anotherText)
        print("JUDGE RESULT: " + str(result))
        score[str(result).lower()] += 1
    return score