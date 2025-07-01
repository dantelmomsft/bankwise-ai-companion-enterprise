
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  Menu, 
  X, 
  Building2,
  TrendingUp,
  FileText
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Bill Management", href: "/bills", icon: CreditCard },
  { name: "Transaction Analytics", href: "/analytics", icon: TrendingUp },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
      collapsed ? "w-16" : "w-64"
    }`}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold text-sidebar-foreground">Enterprise Banking</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="mt-8 px-3">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
    </div>
  );
}
