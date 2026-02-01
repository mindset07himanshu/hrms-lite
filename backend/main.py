from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from models import Employee, Attendance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.post("/employees")
def add_employee(emp: dict):
    db = SessionLocal()

    if db.query(Employee).filter(Employee.employee_id == emp["employee_id"]).first():
        raise HTTPException(400, "Duplicate Employee ID")

    db.add(Employee(**emp))
    db.commit()
    return {"msg": "Employee Added"}

@app.get("/employees")
def get_employees():
    db = SessionLocal()
    return db.query(Employee).all()

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str):
    db = SessionLocal()
    emp = db.query(Employee).filter(Employee.employee_id == emp_id).first()

    if not emp:
        raise HTTPException(404, "Employee Not Found")

    db.delete(emp)
    db.commit()
    return {"msg": "Deleted"}

@app.post("/attendance")
def mark_attendance(data: dict):
    db = SessionLocal()
    db.add(Attendance(**data))
    db.commit()
    return {"msg": "Attendance Marked"}

@app.get("/attendance/{emp_id}")
def get_attendance(emp_id: str):
    db = SessionLocal()
    return db.query(Attendance).filter(Attendance.employee_id == emp_id).all()
