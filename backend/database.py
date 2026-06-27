from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# ─── Database URL ─────────────────────────────────────────────────────────────
# Defaults to local SQLite for development.
# In production, set DATABASE_URL to a PostgreSQL connection string.
#
# Supported cloud providers:
#   Neon:     postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
#   Supabase: postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
#   Vercel:   postgres://... (Vercel Postgres uses postgres:// prefix)
# ─────────────────────────────────────────────────────────────────────────────
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dukaanai.db")

# ─── Handle postgres:// → postgresql:// ──────────────────────────────────────
# Some providers (Heroku, Vercel Postgres) use "postgres://" as the URL scheme,
# but SQLAlchemy 2.0+ requires "postgresql://". Fix it automatically.
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgres://", "postgresql://", 1
    )

# ─── Engine ───────────────────────────────────────────────────────────────────
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    # SQLite: disable same-thread check (required for FastAPI's async threads)
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False},
    )
else:
    # PostgreSQL (Neon / Supabase / Vercel Postgres):
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
