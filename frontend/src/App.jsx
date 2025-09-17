import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Sidebar from './components/sidebar.jsx'
import Dashboard from './pages/dashboard.jsx'
import Tasks from './pages/tasks.jsx'
import Calendar from './pages/calendar.jsx'
import Settings from './pages/settings.jsx'

function App() {

  return (
    <>
      <div className='flex'>
        <Router>
          <Sidebar />
          <Routes>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<div className='m-10 text-3xl'>404 Not Found</div>} />

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
