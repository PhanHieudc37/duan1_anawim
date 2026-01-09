import { useState } from "react";
import { AuthPage } from "./components/AuthPage";
import { Dashboard } from "./components/Dashboard";
import { EditorCanvas } from "./components/EditorCanvas";
import { LessonEditor } from "./components/LessonEditor";

type AppView = "auth" | "dashboard" | "editor";

interface User {
  email: string;
  isAdmin: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("auth");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, isAdmin: boolean) => {
    setUser({ email, isAdmin });
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("auth");
  };

  const handleOpenEditor = () => {
    setCurrentView("editor");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  return (
    <div className="size-full">
      {currentView === "auth" && <AuthPage onLogin={handleLogin} />}
      
      {currentView === "dashboard" && user && (
        <Dashboard
          userEmail={user.email}
          isAdmin={user.isAdmin}
          onLogout={handleLogout}
          onOpenEditor={handleOpenEditor}
        />
      )}
      
      {currentView === "editor" && user && (
        <div className="h-full flex flex-col bg-white">
          <div className="flex-1">
            <LessonEditor onBack={handleBackToDashboard} />
          </div>
        </div>
      )}
    </div>
  );
}