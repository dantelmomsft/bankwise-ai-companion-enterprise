
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";

export default function Navigation() {
  // Mock user data - in a real app this would come from authentication
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@enterprisebank.com",
    avatar: "/placeholder.svg",
    initials: "SJ"
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // In a real app, this would handle the logout process
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // In a real app, this would navigate to settings
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-slate-900">Banking Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm font-medium text-slate-900">{user.name}</div>
          <div className="text-xs text-slate-500">{user.email}</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2 hover:bg-slate-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
            <DropdownMenuLabel>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
