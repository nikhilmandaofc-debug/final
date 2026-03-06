from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi import HTTPException

from app.db.database import get_db
from app.models.doctor import Doctor

router = APIRouter(prefix="/doctors", tags=["Doctors"])


class DoctorCreate(BaseModel):
    name: str
    ward: str


@router.post("/add")
def add_doctor(data: DoctorCreate, db: Session = Depends(get_db)):

    doctor = Doctor(
        name=data.name,
        ward=data.ward
    )

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return doctor


@router.get("/")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()

@router.delete("/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):

    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    db.delete(doctor)
    db.commit()

    return {"message": "Doctor deleted"}