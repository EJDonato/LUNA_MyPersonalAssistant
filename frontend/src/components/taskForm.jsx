import { useEffect, useState } from "react";


function TaskForm( { setShowAddTaskForm, setRefresh, selectedTask, setSelectedTask } ) {
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadlineDate, setDeadlineDate] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (selectedTask) {
            setTaskTitle(selectedTask.task_title || "");
            setDescription(selectedTask.description || "");
            setDeadlineDate(selectedTask.deadline_date ? selectedTask.deadline_date.split('T')[0] : "");
        } else {
            setTaskTitle("");
            setDescription("");
            setDeadlineDate("");
            setStatus("Pending");
        }
    }, [selectedTask]);

    const exitForm = () => {
        setShowAddTaskForm(false);
        setSelectedTask(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskTitle) {
            alert("Task title is required");
            return;
        }

        try {
            if (selectedTask) {
                // Update existing task
                console.log("Updating existing task");
                const response = await fetch(`http://127.0.0.1:8000/api/supabase/update_task/${selectedTask.id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        task_title: taskTitle,
                        description: description,
                        deadline_date: deadlineDate === "" ? null : deadlineDate,
                        status: status,
                    })
                });
                if (response.ok) {
                    setRefresh(prev => !prev); 
                }
            } else {
                // Add new task
                console.log("Adding new task");
                const response = await fetch("http://127.0.0.1:8000/api/supabase/add_task", {
                    method: "POST",
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify({
                        task_title: taskTitle,
                        description: description,
                        deadline_date: deadlineDate === "" ? null : deadlineDate,
                        status: status,
                    })
                }); 

                if (response.ok) {
                    setRefresh(prev => !prev); 
                }
            }
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setShowAddTaskForm(false);
            setSelectedTask(null);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden
            w-[30vw] h-[60vh] shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-3xl bg-white">
            <button className="absolute right-5 top-5 shadow-lg rounded-2xl w-10 h-10 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                onClick={() => exitForm()}
                >X</button>

            <p className="text-2xl flex justify-center items-center mt-5 shadow-lg p-3">Add Task</p>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-25 m-10">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="taskTitle" className="font-medium text-gray-700">Task Title: </label>
                        <input 
                            type="text" 
                            id="taskTitle"
                            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Task Title"
                            />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="deadlineDate" className="font-medium text-gray-700">Deadline: </label>
                        <input 
                            type="date"
                            id="deadlineDate" 
                            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            value={deadlineDate}
                            onChange={(e) => setDeadlineDate(e.target.value)}
                            />
                    </div>
                </div>
                <div className="flex flex-col m-10 my-0 gap-3">
                    <label htmlFor="description" className="font-medium text-gray-700">Description: </label>
                    <textarea 
                        type="text"
                        id="description" 
                        className="px-3 py-2 pb-0 h-60 border border-gray-300 rounded-lg shadow-sm resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Your task description here..."
                        />
                </div>

                <div className="flex justify-center items-center">
                    <button className="mt-2 h-13 w-130 font-medium transition-shadow duration-500 ease-in-out hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]">
                        Save Task
                    </button>
                </div>
                
            </form>
        </div>
    )
};

export default TaskForm;