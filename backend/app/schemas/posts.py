from uuid import UUID
from pydantic import BaseModel

class PostBase(BaseModel):
    user_id:UUID
    likes:int | None = 0
    dislikes:int | None = 0
    title:str
    content:str
    url:str|None = None

class PostRead(PostBase):
    id:UUID
