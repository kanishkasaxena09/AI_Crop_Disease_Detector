import random
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
import models, database

# 1. Database Setup
models.Base.metadata.create_all(bind=database.engine)

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

@app.get("/")
def home():
    return {"message": "CropAI Backend is Live!"}

# --- OTP ROUTE ---
@app.post("/send-otp")
async def send_otp(email_data: dict):
    email = email_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email address dalo lala!")
    
    otp = str(random.randint(100000, 999999))
    otp_storage[email] = otp  
    
    message = MessageSchema(
        subject="CropAI Verification Code",
        recipients=[email],
        body=f"Namaste! CropAI par account banane ke liye apka OTP hai: {otp}",
        subtype=MessageType.plain
    )
    
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        return {"message": "OTP bhej diya gaya hai!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Email nahi ja paya.")

# --- SIGNUP ROUTE ---
@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(database.get_db)):
    saved_otp = otp_storage.get(user.email)
    if not saved_otp or saved_otp != user.otp:
        raise HTTPException(status_code=400, detail="Galat OTP!")

    user_exists = db.query(models.User).filter(models.User.email == user.email).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Email pehle se register hai!")
    
    new_user = models.User(
        name=user.name, 
        email=user.email, 
        password=user.password, 
        city=user.city, 
        state=user.state
    )
    db.add(new_user)
    db.commit()
    del otp_storage[user.email]
    return {"message": "Account ban gaya."}

# --- LOGIN ROUTE ---
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Galat credentials!")
        
    return {
        "message": "Login Safal!", 
        "user": {
            "name": db_user.name, 
            "email": db_user.email,
            "city": db_user.city,   
            "state": db_user.state  
        }
    }

# --- 🚀 CONTACT ROUTE (Updated) ---
@app.post("/contact")
async def receive_contact(msg: ContactCreate, db: Session = Depends(database.get_db)):
    try:
        # 1. Database mein save karo
        new_entry = models.ContactMessage(
            name=msg.name, 
            email=msg.email, 
            message=msg.message
        )
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)

        # 2. Tumhari Email par notification bhejo
        email_content = f"""
        Namaste Lala!
        
        CropAI website par naya message aaya hai:
        --------------------------------------
        Kisan ka Naam: {msg.name}
        Email: {msg.email}
        Sandesh: {msg.message}
        --------------------------------------
        Iska jawab dene ke liye taiyar rahein!
        """

        mail_msg = MessageSchema(
            subject=f"New CropAI Message from {msg.name}",
            recipients=["testweb0925@gmail.com"], # 👈 Yahan tumhari email aayegi
            body=email_content,
            subtype=MessageType.plain
        )

        fm = FastMail(conf)
        await fm.send_message(mail_msg)

        return {"message": "Success! Database update ho gaya aur email bhej di gayi hai."}
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Kuch galti ho gayi, email nahi ja payi!")