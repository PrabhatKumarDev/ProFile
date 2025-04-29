import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHome, FaFileAlt, FaFolder, FaCog } from 'react-icons/fa'; // Corrected imports

const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={` h-[100vh] border-r transition-all duration-300 ${sidebarCollapsed ? 'w-[60px]' : 'w-[240px]'} flex flex-col`}
      >
        <div className="p-2 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="h-8 w-8 flex items-center justify-center"
          >
            {sidebarCollapsed ? (
              <FaChevronRight className="h-4 w-4" />
            ) : (
              <FaChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
        <nav className="flex-1">
          <div className="px-3 py-2">
            <button
              className={`w-full justify-start mb-1 ${sidebarCollapsed ? 'px-2' : ''}`}
            >
              <FaHome className="h-5 w-5 mr-2" />
              {!sidebarCollapsed && <span>Home</span>}
            </button>
            <button
              className={`w-full justify-start mb-1 ${sidebarCollapsed ? 'px-2' : ''}`}
            >
              <FaFileAlt className="h-5 w-5 mr-2" />
              {!sidebarCollapsed && <span>Create Portfolio</span>}
            </button>
            <button
              className={`w-full justify-start mb-1 ${sidebarCollapsed ? 'px-2' : ''}`}
            >
              <FaFolder className="h-5 w-5 mr-2" />
              {!sidebarCollapsed && <span>My Portfolios</span>}
            </button>
            <button
              className={`w-full justify-start mb-1 ${sidebarCollapsed ? 'px-2' : ''}`}
            >
              <FaCog className="h-5 w-5 mr-2" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
