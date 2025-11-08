from app.schemas.users import UserCreate,UserRead,UserUpdate
from sqlalchemy.orm import Session
from app.core.security import get_password_hash
from app.models.users import User
from fastapi import HTTPException,status,Response
from uuid import UUID
from sqlalchemy.exc import SQLAlchemyError

def create_user(user:UserCreate,db:Session)->UserRead:
    try:       
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=get_password_hash(user.hashed_password),
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"unable to create a user {str(e)}",
        )

def update_user(id: UUID, user: UserUpdate, db: Session):
    try:
        db_user = (
            db.query(User)
            .filter(User.id == id)
            .update(
                {
                    User.hashed_password: get_password_hash(user.hashed_password),
                }
            )
        )
        if db_user == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found",
            )

        db.commit()

        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        db.rollback()

        if e == SQLAlchemyError:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="user not found"
            )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"unable to update user {str(e)}",
        )


def delete_user(u_id: UUID, current_user: User, db: Session):
    try:
        if current_user.id != u_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="you do not have necessary permissions",
            )

        db_user = db.query(User).filter(User.id == u_id).first()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no such user in database",
            )
        db.delete(db_user)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"unable to delete user {str(e)}",
        )