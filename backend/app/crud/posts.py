from app.schemas.posts import PostBase
from sqlalchemy.orm import Session
from app.models.posts import Post
from fastapi import HTTPException,status,Response
from typing import List
from uuid import UUID
from app.models.users import User

def create_post(post:PostBase,db:Session)->Post:
    try:
        db_post = Post(
            user_id = post.user_id,
            likes = post.likes,
            dislikes = post.dislikes,
            title= post.title,
            content = post.content,
            url=post.url
        )
        
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {e}"
        )
        
def get_posts(p_id:UUID,db:Session)->List[Post]:
    try:
        db_post = db.query(Post).filter(Post.id == p_id).first()
        if db_post is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="posts not found",
            )

        return db_post
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
def update_post(post_id:UUID,post:PostBase,db:Session):
    try:
        db_user = db.query(User).filter(User.id == post.user_id)
        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found",
            )

        db.query(Post).filter(Post.id == post_id).update(
            {
                Post.title:post.title,
                Post.content:post.content,
            }
        )
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

def delete_post(post_id:UUID,db:Session):
    try:
        db_post = db.query(Post).filter(Post.id == post_id).first()

        if db_post is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found"
            )

        db.delete(db_post)
        db.commit()

        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )