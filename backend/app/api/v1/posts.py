from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.schemas.posts import PostBase

from uuid import UUID
from app.models.users import User

from app.api.v1.auth import get_current_user
from app.db.session import get_db

router = APIRouter(prefix="/posts",tags=["posts"])

@router.post("/")
def create_post(post:PostBase,
                current_user: User = Depends(get_current_user),
                db:Session = Depends(get_db)):
    pass

@router.get("/")
def get_excercise(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    pass

@router.get("/{p_id}")
def get_excercise(
    p_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    pass

