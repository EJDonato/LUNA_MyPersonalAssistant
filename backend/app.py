import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.tasksbp import tasks_bp

class FastAPIapp():
    def __init__(self):
        self.app = FastAPI()
        
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        self.app.include_router(tasks_bp)
    

    def run(self, **kwargs):
        uvicorn.run("app:app", **kwargs)

app = FastAPIapp().app

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)