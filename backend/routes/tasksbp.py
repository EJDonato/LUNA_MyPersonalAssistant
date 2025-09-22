from fastapi import APIRouter 

tasks_bp = APIRouter(tags=["tasks"])

@tasks_bp.get('/api/supabase/get_all_tasks')
def get_all_tasks_route():
    from models.tasks import get_all_tasks
    tasks = get_all_tasks()
    print("Retrieved tasks:", tasks)
    return tasks, 200