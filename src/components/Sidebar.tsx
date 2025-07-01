
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  CreditCard, 
  Menu, 
  X, 
  Building2,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Bill Management", href: "/bills", icon: CreditCard },
  { name: "Transaction Analytics", href: "/analytics", icon: TrendingUp },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 shadow-professional ${
      collapsed ? "w-16" : "w-64"
    }`}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border bg-white">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Enterprise Banking</h1>
              <p className="text-xs text-slate-500">Professional Suite</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4 text-slate-600" /> : <ChevronLeft className="h-4 w-4 text-slate-600" />}
        </button>
      </div>
      
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-6 left-3 right-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-900 mb-1">Need Help?</div>
            <div className="text-xs text-blue-700 mb-2">Our AI assistant is here to help with your banking needs.</div>
            <div className="text-xs text-blue-600">→ Click the chat bubble to get started</div>
          </div>
        </div>
      )}
    </div>
  );
}
