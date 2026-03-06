from fastapi import APIRouter, Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.ward import Ward

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/wards")
def get_wards(db: Session = Depends(get_db)):
    return db.query(Ward).all()


@router.post("/wards")
def create_ward(data: dict, db: Session = Depends(get_db)):

    ward = Ward(name=data["name"])
    db.add(ward)
    db.commit()
    db.refresh(ward)

    return ward

@router.delete("/wards/{ward_id}")
def delete_ward(ward_id: int, db: Session = Depends(get_db)):

    ward = db.query(Ward).filter(Ward.id == ward_id).first()

    if not ward:
        raise HTTPException(status_code=404, detail="Ward not found")

    db.delete(ward)
    db.commit()

    return {"message": "Ward deleted"}