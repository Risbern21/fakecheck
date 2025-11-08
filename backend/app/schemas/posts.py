from uuid import UUID
from pydantic import BaseModel

class PostBase(BaseModel):
    user_id:UUID
    post_id:UUID
    credibility_score:int

class PostRead(PostBase):
    id:UUID

