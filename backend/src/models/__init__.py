from .uploadFileModel import FileUploadModel, QuizModel, MultipleChecklistModel, ChecklistModel

from ..db.database import engine, Base

Base.metadata.create_all(bind=engine)
