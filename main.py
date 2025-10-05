from typing import Union

from fastapi import FastAPI

from starlette.responses import FileResponse

import parser

app = FastAPI()

@app.get("/")
def read_root():
    return FileResponse('index.html')

@app.get("/parse-text")
def status(url: str):
    return parser.grab_text_from_url(url)