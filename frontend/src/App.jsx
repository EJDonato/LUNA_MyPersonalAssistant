import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'

import Sidebar from './components/sidebar.jsx'
import Dashboard from './pages/dashboard.jsx'
import Tasks from './pages/tasks.jsx'
import Calendar from './pages/calendar.jsx'
import Settings from './pages/settings.jsx'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className='flex'>
        <Router>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>

          <div className={`flex-1 transition-all duration-300 ease-in-out
              ${isCollapsed ? "ml-5" : "ml-0"} 
            `}>

            <Routes>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<div className='m-10 text-3xl'>404 Not Found</div>} />

            </Routes>
          </div>

        </Router>
      </div>
    </>
  )
}

export default App
