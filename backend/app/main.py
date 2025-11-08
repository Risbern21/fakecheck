from fastapi import FastAPI

from app.api.v1 import analysis, auth, posts, users

app = FastAPI()

app.include_router(users.router, prefix="/api/v1")
app.include_router(posts.router, prefix="/api/v1")
app.include_router(analysis.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "root endpoint works"}
