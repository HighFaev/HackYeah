from typing import Union

from fastapi import FastAPI

from starlette.responses import FileResponse, JSONResponse

import parser, summeryBot

app = FastAPI()

@app.get("/")
def read_root():
    return FileResponse('index.html')

@app.get("/parse-text")
def status(url: str):
    return JSONResponse()

@app.get("/summarize")
def summarize(newsText: str):
    return summeryBot.summary(newsText)