import { useEffect, useState } from "react";

import TaskForm from "../components/taskForm.jsx";

function Tasks() {
    // For the table
    const tableHeaders = ["Task Title", "Description", "Due Date", "Status"];
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);

    // For status cycling
    const statusCycles = ["Pending", "Ongoing", "Completed"];

    // For adding a task
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // For editing a task
    const [selectedTask, setSelectedTask] = useState(null);

    
    useEffect(() => {
        // Fetch tasks from backend API
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/supabase/get_all_tasks");
                const data = await response.json();
                console.log("Fetched tasks:", data);
                setTasks(data[0]); 
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, [refresh]);

    const editTask = (task) => {
        setSelectedTask(task);
        setShowAddTaskForm(true);
    }

    const handleStatusClick = async (taskId, currentStatus) => {
        const currentIndex = statusCycles.indexOf(currentStatus);
        const nextStatus = statusCycles[(currentIndex + 1) % statusCycles.length];

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: nextStatus } : task
            )
        );

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/supabase/update_task_status/${taskId}?new_status=${nextStatus}`, {
                method: "PATCH",    
            });
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }

    return (
        <div className="flex flex-col items-center h-[calc(100vh-40px)] flex-1 m-5 ml-0 rounded-2xl shadow-lg relative">
            {showAddTaskForm && (<TaskForm setShowAddTaskForm={setShowAddTaskForm} setRefresh={setRefresh} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>)}

            <div className="flex flex-col justify-center items-center mt-30">
                <div className="w-full flex justify-end mb-5">
                    <button 
                        className="w-30 h-10 shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition-color duration-200 ease-in-out font-semibold hover:bg-gray-100 hover:shadow-xl active:scale-98 active:shadow-sm"
                        onClick={() => setShowAddTaskForm(true)}>
                        Add Task
                    </button>
                </div>

                <div>
                    <table className="w-[60vw] bg-white table-fixed">
                        <thead>
                            <tr>
                                {tableHeaders.map((header) => (
                                    <th key={header} className="px-6 py-3 border-b-2 border-gray-300 shadow-sm text-center text-lg font-semibold w-1/4">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
                
                <div className="overflow-y-auto h-[60vh] shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                    <table className="w-[60vw] bg-white table-fixed">
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={tableHeaders.length}>Loading...</td>
                                </tr>
                            ) : (
                                [...tasks]
                                .sort((a, b) => {
                                    if (!a.deadline_date) return 1;
                                    if (!b.deadline_date) return -1;
                                    return new Date(a.deadline_date) - new Date(b.deadline_date);
                                })
                                .map((task) => (
                                    <tr key={task.id} className={`${task.status === "Completed" ? "text-gray-400" : "" }`}>
                                        <td className="px-6 py-4 border-b border-gray-200 text-center"><button 
                                            className="w-30 h-10 rounded-xl transition-shadow duration-300 ease-in-out hover:shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                                            onClick={() => editTask(task)}
                                            >{task.task_title}</button></td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-center max-w-sm overflow-hidden whitespace-nowrap text-ellipsis">{task.description ? task.description : "-----"}</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-center">{task.deadline_date ? new Date(task.deadline_date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                            }) : "-----"}</td>
                                        <td className="px-6 border-b border-gray-200 text-center"><button className={`w-30 h-10 rounded-xl transition-shadow duration-300 ease-in-out hover:shadow-[0_4px_10px_rgba(0,0,0,0.4)]
                                            ${task.status === "Pending" ? "bg-red-300" : "" }
                                            ${task.status === "Ongoing" ? "bg-blue-300" : "" }
                                            ${task.status === "Completed" ? "bg-green-300 text-black" : "" }
                                            `} onClick={() => handleStatusClick(task.id, task.status)}>{task.status}</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Tasks;