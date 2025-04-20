FROM python:3.12.8 AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Set up Python environment
RUN python -m venv .venv
COPY requirements.txt ./
RUN .venv/bin/pip install -r requirements.txt

# Install Node.js & npm
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Copy frontend and build it
COPY frontend/ frontend/
RUN cd frontend && npm install && npm run build

# Copy backend and other code
COPY backend/ backend/

# Copy env
COPY .env ./

# Copy built frontend into static dir
RUN mkdir static && cp -r frontend/dist/* static/


# =========================
# FINAL STAGE
# =========================

FROM python:3.12.8-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Copy virtual env from builder
COPY --from=builder /app/.venv .venv/

# Set up PATH to use venv
ENV PATH="/app/.venv/bin:$PATH"

# Copy app files from builder (includes backend/, static/, etc.)
COPY --from=builder /app/backend backend/
COPY --from=builder /app/static static/
COPY --from=builder /app/.env ./


# Start FastAPI via Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

