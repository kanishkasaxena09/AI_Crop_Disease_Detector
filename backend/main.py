import random
import io
import json
import numpy as np
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr 
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from PIL import Image
import tensorflow as tf
from keras.layers import DepthwiseConv2D as KDepthwiseConv2D
import models, database

#Custom Class for Model Loading 
class DepthwiseConv2DFix(KDepthwiseConv2D):
    @classmethod
    def from_config(cls, config):
        config.pop("groups", None)
        return super().from_config(config)

#Database Setup
models.Base.metadata.create_all(bind=database.engine)

#ML MODEL LOADING
try:
    model = tf.keras.models.load_model(
        "crop_disease_model.h5",
        compile=False,
        custom_objects={"DepthwiseConv2D": DepthwiseConv2DFix},
    )
    with open("class_indices.json", "r") as f:
        class_indices = json.load(f)
    class_names = {int(v): k for k, v in class_indices.items()}
    print("AI Model and Classes are loaded successfully!")
except Exception as e:
    print(f"AI Model not loaded: {e}")  
    model = None
    class_names = {}

app = FastAPI()

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# email config
conf = ConnectionConfig(
    MAIL_USERNAME = "testweb0925@gmail.com",
    MAIL_PASSWORD = "hcbh ajhi nrym ikbk", 
    MAIL_FROM = "testweb0925@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

otp_storage = {} 

#data models
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    city: str  
    state: str 
    otp: str  

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ProfileUpdate(BaseModel):
    email: EmailStr
    name: str
    city: str
    state: str

class PhotoUpdate(BaseModel):
    email: EmailStr
    photo: str

@app.get("/")
def home():
    return {"message": "CropAI Backend is Live!"}

# L PREDICTION ROUTE 
@app.post("/predict")
async def predict(file: UploadFile = File(...), db: Session = Depends(database.get_db)):
    if model is None or not class_names:
        raise HTTPException(status_code=500, detail="AI Model missing!")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        image = image.resize((224, 224))
        
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array, verbose=0)[0]
        pred_index = np.argmax(predictions)
        confidence = float(np.max(predictions))
        disease_name = class_names[pred_index]

        new_scan = models.ScanHistory(
            disease=disease_name,
            confidence=f"{confidence*100:.2f}%"
        )
        db.add(new_scan)
        db.commit()
        db.refresh(new_scan)

        return {
            "disease": disease_name,
            "confidence": f"{confidence*100:.2f}%",
            "message": f"✅ Humne {disease_name} pehchana hai."
        }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Prediction fail ho gayi!")

# DASHBOARD DATA 
@app.get("/get-scans")
def get_scans(db: Session = Depends(database.get_db)):
    scans = db.query(models.ScanHistory).order_by(models.ScanHistory.id.desc()).all()
    total_scans = len(scans)
    healthy_count = sum(1 for s in scans if "healthy" in s.disease.lower())
    
    return {
        "total": total_scans,
        "healthy": healthy_count,
        "unhealthy": total_scans - healthy_count,
        "history": scans
    }

# AUTH ROUTES
@app.post("/send-otp")
async def send_otp(email_data: dict):
    email = email_data.get("email")
    if not email: raise HTTPException(status_code=400, detail="Email dalo!")
    otp = str(random.randint(100000, 999999))
    otp_storage[email] = otp  
    message = MessageSchema(subject="CropAI OTP", recipients=[email], body=f"OTP: {otp}", subtype=MessageType.plain)
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        return {"message": "OTP Sent"}
    except:
        raise HTTPException(status_code=500, detail="Email Error")

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(database.get_db)):
    if otp_storage.get(user.email) != user.otp: raise HTTPException(status_code=400, detail="Galat OTP")
    new_user = models.User(name=user.name, email=user.email, password=user.password, city=user.city, state=user.state)
    db.add(new_user)
    db.commit()
    return {"message": "Account created"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.password != user.password: raise HTTPException(status_code=401, detail="Error")
    return {
        "message": "Success", 
        "user": {
            "name": db_user.name, 
            "email": db_user.email, 
            "city": db_user.city, 
            "state": db_user.state,
            "photo": db_user.profile_photo
        }
    }

# photo
@app.put("/update-photo")
def update_photo(data: PhotoUpdate, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user: raise HTTPException(status_code=404, detail="User nahi mila")
    user.profile_photo = data.photo
    db.commit()
    return {"message": "Photo Saved in DB"}

@app.put("/update-profile")
def update_profile(data: ProfileUpdate, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user: raise HTTPException(status_code=404, detail="Error")
    user.name, user.city, user.state = data.name, data.city, data.state
    db.commit()
    return {"message": "Updated"}