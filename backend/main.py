"""
Portfolio Backend API
Serves dynamic portfolio content from JSON data files.
Easy to swap to Supabase later by replacing data-loading functions.
"""

import json
import os
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent / "data"


def load_json(filename: str):
    """Load a JSON data file."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        raise HTTPException(status_code=404, detail=f"Data file {filename} not found")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(filename: str, data):
    """Save data to a JSON file."""
    filepath = DATA_DIR / filename
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ──────────── API ROUTES ────────────


@app.get("/")
def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}


@app.get("/api/profile")
def get_profile():
    """Get profile/hero data."""
    return load_json("profile.json")


@app.get("/api/skills")
def get_skills():
    """Get all skills."""
    return load_json("skills.json")


@app.get("/api/projects")
def get_projects():
    """Get all projects."""
    return load_json("projects.json")


@app.get("/api/experience")
def get_experience():
    """Get experience/timeline entries."""
    return load_json("experience.json")


class ContactMessage(BaseModel):
    name: str
    email: str
    phone: str = ""
    subject: str = ""
    message: str


@app.post("/api/contact")
def submit_contact(msg: ContactMessage):
    """Store a contact form submission."""
    contacts_file = DATA_DIR / "contacts.json"

    # Load existing contacts
    if contacts_file.exists():
        with open(contacts_file, "r", encoding="utf-8") as f:
            contacts = json.load(f)
    else:
        contacts = []

    # Append new message
    contacts.append({
        "id": len(contacts) + 1,
        "name": msg.name,
        "email": msg.email,
        "phone": msg.phone,
        "subject": msg.subject,
        "message": msg.message,
        "timestamp": datetime.now().isoformat(),
    })

    save_json("contacts.json", contacts)
    return {"success": True, "message": "Message received! I'll get back to you soon."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
