import { Outlet } from "react-router-dom";
import { TeacherSidebar } from "./TeacherSidebar";

export function TeacherLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <TeacherSidebar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
