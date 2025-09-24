from utils.supabase_client import client

def add_task(task):
    response = (
        client.table("tasks")
        .insert({
            "task_title": task.task_title,
            "description": task.description,
            "deadline_date": task.deadline_date,
            "status": task.status
        })
        .execute()
    )
    return response.data

def get_all_tasks():
    response = (
        client.table("tasks")
        .select("*")
        .execute()
    )
    return response.data

def update_task_status(task_id: int, new_status: str):
    response = (
        client.table("tasks")
        .update({"status": new_status})
        .eq("id", task_id)
        .execute()
    )
    return response.data

def update_task(task_id: int, task):
    response = (
        client.table("tasks")
        .update({
            "task_title": task.task_title,
            "description": task.description,
            "deadline_date": task.deadline_date,
            "status": task.status
        })
        .eq("id", task_id)
        .execute()
    )
    return response.data