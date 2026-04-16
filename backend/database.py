from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 💡 Ek baar check karo MySQL Workbench mein 'crop_ai' hi naam hai na?
# 'crop_ai' ki jagah 'cropai_db' likho (bina space ke)
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:123456@localhost/cropai_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
