from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# ─── Database URL ─────────────────────────────────────────────────────────────
# Defaults to local SQLite for development.
# In production (Railway + Neon), set DATABASE_URL to a PostgreSQL connection string.
# Neon example: postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dukaanai.db")

# ─── Engine ───────────────────────────────────────────────────────────────────
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    # SQLite: disable same-thread check (required for FastAPI's async threads)
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False},
    )
else:
    # PostgreSQL / Neon:
    # pool_pre_ping  — verifies connections before use (Neon drops idle connections)
    # pool_recycle   — recycles connections every 5 min to avoid stale connections
    # pool_size      — reasonable pool for a small backend service
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300,
        pool_size=5,
        max_overflow=10,
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency: yields a database session and closes it on exit."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
