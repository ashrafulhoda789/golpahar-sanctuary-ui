import { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../../components/admin/common/AdminSidebar";
import AdminNavbar from "../../components/admin/common/AdminNavbar";


export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen  flex flex-col xl:flex-row font-sans antialiased text-stone-900 overflow-hidden">
            
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
            />

            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

                <AdminNavbar 
                    onOpenSidebar={() => setIsSidebarOpen(true)} 
                />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}