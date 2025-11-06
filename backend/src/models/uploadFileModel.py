from sqlalchemy import Text, Integer, Column, Boolean
from ..db.database import Base

class fileUploadModel(Base):
    __tablename__="filesuploaded"
    id=Column(Integer,primary_key=True,index=True)
    filename=Column(Text,nullable=False)

class checklistModel(Base):
    __tablename__="checklist"
    checklist_id=Column(Integer,primary_key=True,index=True)
    item=Column(Text,nullable=False)
    isCompleted=(Boolean,default=False)

class multipleChecklistModel(Base):
    __tablename__="multichecklist"
    item_id=Column(Integer,primary_key=True,index=True)

class quizModel(Base):
    __tablename__="quiz"
    question_id=Column(Integer,primary_key=True,index=True)
    question=Column(Text,nullable=False)
    option_1=Column(Text,nullable=False)
    option_2=Column(Text,nullable=False)
    option_3=Column(Text,nullable=False)
    option_4=Column(Text,nullable=False)
    correct_answer=Column(Text,nullable=False)