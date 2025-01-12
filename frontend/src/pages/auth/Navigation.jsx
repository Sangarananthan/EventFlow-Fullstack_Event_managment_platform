import React from "react";
import { useState } from "react";
import {
  Calendar,
  Settings,
  Users,
  PieChart,
  Ticket,
  BookMarked,
  Home,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard" },
    { icon: Calendar, label: "My Events", path: "/dashboard/events" },
    { icon: Ticket, label: "Attending", path: "/dashboard/attending" },
    { icon: BookMarked, label: "Saved", path: "/dashboard/saved" },
    { icon: PieChart, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Users, label: "Attendees", path: "/dashboard/attendees" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
            EventPro
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <item.icon className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Dashboard
              </h2>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
