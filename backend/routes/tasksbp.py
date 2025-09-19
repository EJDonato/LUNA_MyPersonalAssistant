from flask import Blueprint

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/api/supabase/get_all_tasks', methods=['GET'])
def get_all_tasks_route():
    from models.tasks import get_all_tasks
    tasks = get_all_tasks()
    return tasks, 200