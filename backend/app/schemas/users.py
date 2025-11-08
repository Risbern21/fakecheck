from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserBase(BaseModel):
    username:str
    email:EmailStr

class UserCreate(UserBase):
    hashed_password:str

class UserRead(UserBase):
    id:UUID

    class Config:
        orm_mode=True
        
class UserUpdate(BaseModel):
    hashed_password:str