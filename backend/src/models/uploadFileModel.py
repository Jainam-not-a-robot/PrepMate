from sqlalchemy import Text, Integer, Column, Boolean , func , ForeignKey , DateTime
from sqlalchemy.orm import relationship
from ..db.database import Base

class FileUploadModel(Base):
    __tablename__="filesuploaded"
    id=Column(Integer,primary_key=True,index=True)
    filename=Column(Text,nullable=False)

class MultipleChecklistModel(Base):
    __tablename__="multichecklist"
    item_id=Column(Integer,primary_key=True,index=True)
    checklist_name=Column(Text,nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    checklists=relationship("ChecklistModel",back_populates="parent",cascade="all, delete-orphan")

class ChecklistModel(Base):
    __tablename__="checklist"
    checklist_id=Column(Integer,primary_key=True,index=True)
    item_id = Column(Integer, ForeignKey("multichecklist.item_id"),nullable=False)
    item=Column(Text,nullable=False)
    isCompleted=Column(Boolean,default=False)
    parent = relationship("MultipleChecklistModel", back_populates="checklists")

class QuizModel(Base):
    __tablename__="quiz"
    question_id=Column(Integer,primary_key=True,index=True)
    question=Column(Text,nullable=False)
    option_1=Column(Text,nullable=False)
    option_2=Column(Text,nullable=False)
    option_3=Column(Text,nullable=False)
    option_4=Column(Text,nullable=False)
    correct_answer=Column(Text,nullable=False)