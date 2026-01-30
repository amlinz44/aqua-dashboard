from fastapi import FastAPI


app = FastAPI(title="Aqua Dashboard API")

@app.get("/health")
def health():
    return {"status": "ok"}