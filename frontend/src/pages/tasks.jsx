import { useEffect, useState } from "react";


function Tasks() {
    const tableHeaders = ["Task Title", "Description", "Due Date", "Status"];
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);
    const statusCycles = ["Pending", "Ongoing", "Completed"];

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
    }, []);

    const handleStatusClick = async (taskId, currentStatus) => {
        
    }

    return (
        <div className="flex flex-col items-center h-[calc(100vh-40px)] flex-1 m-5 ml-0 rounded-2xl shadow-lg">
            <div className="flex justify-center items-center mt-30">
                <table className="w-[60vw] bg-white">
                    <thead>
                        <tr>
                            {tableHeaders.map((header) => (
                                <th key={header} className="px-6 py-3 border-b-2 border-gray-300 shadow-sm text-center text-lg font-semibold">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={tableHeaders.length}>Loading...</td>
                            </tr>
                        ) : (
                            tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 border-b border-gray-200 text-center">{task.task_title}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-center">{task.description}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-center">{new Date(task.deadline_date).toLocaleDateString("en-US", {
                                                                                                            year: "numeric",
                                                                                                            month: "long",
                                                                                                            day: "numeric"
                                                                                                        })}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-center"><button onClick={() => handleStatusClick(task.id, task.status)}>{task.status}</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>

    )
}

export default Tasks;