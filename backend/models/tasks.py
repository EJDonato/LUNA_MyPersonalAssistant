from utils.supabase_client import client

def get_all_tasks():
    response = (
        client.table("tasks")
        .select("*")
        .execute()
    )
    return response.data

