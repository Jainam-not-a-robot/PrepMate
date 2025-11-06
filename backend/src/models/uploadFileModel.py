from sqlalchemy import Text, Integer, Column
from ..db.database import Base

class fileUploadModel(Base):
    __tablename__="filesuploaded"
    id=Column(Integer,primary_key=True,index=True)
    filename=Column(Text,nullable=False)