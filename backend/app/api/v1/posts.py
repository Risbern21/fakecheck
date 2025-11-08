from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.schemas.posts import PostBase

from uuid import UUID
from app.models.users import User
from app.crud import posts

from app.api.v1.auth import get_current_user
from app.db.session import get_db

router = APIRouter(prefix="/posts",tags=["posts"])

@router.post("/")
def create_post(post:PostBase,
                current_user: User = Depends(get_current_user),
                db:Session = Depends(get_db)):
    return posts.create_post(post=post,db=db)

@router.get("/{p_id}")
def get_post(
    p_id:UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return posts.get_posts(p_id=p_id,db=db)

@router.put("/{p_id}")
def update_post(
    p_id:UUID,
    post:PostBase,
    current_user: User = Depends(get_current_user),
    db:Session=Depends(get_db)
):
    return posts.update_post(post_id=p_id,post=post,db=db)

@router.delete("/{p_id}")
def delete_post(
    p_id:UUID,
    current_user: User = Depends(get_current_user),
    db:Session=Depends(get_db)
):
    return posts.delete_post(post_id=p_id,db=db)