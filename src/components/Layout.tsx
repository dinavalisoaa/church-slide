import React, { useState } from 'react'
import Sidebar from './Sidebar'
import MyAppBar from './MyAppBar'
import { Outlet } from 'react-router-dom'
import MyToolbar from './MyToolbar'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      <div style={{ flexGrow: 1 }}>
        <MyAppBar onToggleSidebar={toggleSidebar} />
        <div style={{ padding: '20px', marginTop: '60px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
