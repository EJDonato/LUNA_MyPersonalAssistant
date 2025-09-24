from fastapi import APIRouter 
from pydantic import BaseModel

tasks_bp = APIRouter(tags=["tasks"])

class Task(BaseModel):
    task_title: str
    description: str
    deadline_date: str | None = None
    status: str

@tasks_bp.post('/api/supabase/add_task')
async def add_task(task: Task):
    from models.tasks import add_task
    response = add_task(task)
    return response, 200

@tasks_bp.get('/api/supabase/get_all_tasks')
def get_all_tasks_route():
    from models.tasks import get_all_tasks
    tasks = get_all_tasks()
    print("Retrieved tasks:", tasks)
    return tasks, 200

@tasks_bp.patch('/api/supabase/update_task_status/{task_id}')
async def update_task_status(task_id: int, new_status: str):
    from models.tasks import update_task_status
    updated_task = update_task_status(task_id, new_status)
    return updated_task, 200

@tasks_bp.put('/api/supabase/update_task/{task_id}')
async def update_task(task_id: int, task: Task):
    from models.tasks import update_task
    response = update_task(task_id, task)
    return response, 200