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

class DepthwiseConv2DFix(KDepthwiseConv2D):
    @classmethod
    def from_config(cls, config):
        config.pop("groups", None)
        return super().from_config(config)

# 1. Database Setup
models.Base.metadata.create_all(bind=database.engine)

# ---------------------------------------------------------
# 🤖 ML MODEL & JSON LOADING (Lala Check Here)
# ---------------------------------------------------------
try:
    # Model load karo (vahi naam jo predicate.py mein hai)
    model = tf.keras.models.load_model(
        "crop_disease_model.h5",
        compile=False,
        custom_objects={"DepthwiseConv2D": DepthwiseConv2DFix},
    )
    with open("class_indices.json", "r") as f:
        class_indices = json.load(f)
    
    # Numbers ko names mein badlo {0: "Healthy", 1: "Blight"}
    class_names = {int(v): k for k, v in class_indices.items()}
    print("AI Model and Classes are loaded successfully!")
except Exception as e:
    print(f"AI Model not loaded: {e}")
    model = None
    class_names = {}
# ---------------------------------------------------------

app = FastAPI()

# 2. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Email Configuration
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

# 4. Data Models (Schemas)
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

@app.get("/")
def home():
    return {"message": "CropAI Backend is Live!"}

# --- 📸 ML PREDICTION ROUTE ---
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None or not class_names:
        raise HTTPException(status_code=500, detail="AI Model ya Class Mapping nahi mili!")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        image = image.resize((224, 224)) # Predicate.py ke hisab se 224x224
        
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array, verbose=0)[0]
        pred_index = np.argmax(predictions)
        confidence = float(np.max(predictions))

        # Result Logic (Predicate.py wala)
        if confidence < 0.35:
            return {
                "disease": "Pata nahi chal raha",
                "confidence": f"{confidence*100:.2f}%",
                "message": "⚠️ Low confidence! Please saaf photo upload karein."
            }
        else:
            return {
                "disease": class_names[pred_index],
                "confidence": f"{confidence*100:.2f}%",
                "message": f"✅ Humne {class_names[pred_index]} pehchana hai."
            }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Prediction fail ho gayi!")

# --- BAKI ROUTES (OTP, SIGNUP, LOGIN, CONTACT, PROFILE) ---
# (Yahan wahi purane routes rahenge jo upar diye gaye thae)
@app.post("/send-otp")
async def send_otp(email_data: dict):
    email = email_data.get("email")
    if not email: raise HTTPException(status_code=400, detail="Email dalo!")
    otp = str(random.randint(100000, 999999))
    otp_storage[email] = otp  
    message = MessageSchema(subject="CropAI OTP", recipients=[email], body=f" Namaste! CropAI par account banane ke liye apka OTP hai: {otp}", subtype=MessageType.plain)
    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "OTP Sent"}

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
    return {"message": "Success", "user": {"name": db_user.name, "email": db_user.email, "city": db_user.city, "state": db_user.state}}

@app.post("/contact")
async def receive_contact(msg: ContactCreate, db: Session = Depends(database.get_db)):
    new_entry = models.ContactMessage(name=msg.name, email=msg.email, message=msg.message)
    db.add(new_entry)
    db.commit()
    return {"message": "Saved"}

@app.put("/update-profile")
def update_profile(data: ProfileUpdate, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user: raise HTTPException(status_code=404, detail="Error")
    user.name, user.city, user.state = data.name, data.city, data.state
    db.commit()
    return {"message": "Updated"}