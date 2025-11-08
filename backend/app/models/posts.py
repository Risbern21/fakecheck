import uuid

from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.models.users import User

from app.db.session import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey(User.id, ondelete="CASCADE"))
    likes = Column(Integer, default=0)
    dislikes = Column(Integer, default=0)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    url = Column(String, nullable=True)
