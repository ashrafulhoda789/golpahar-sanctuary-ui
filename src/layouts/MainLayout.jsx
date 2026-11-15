import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import FooterTopbar from "../components/common/FooterTopbar";
import ScrollToTop from "../components/common/ScrollToTop";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Topbar />
            <Navbar />
            <main className="grow">
                <Outlet />
            </main>
            <FooterTopbar />
            <Footer />
        </div>
    );
};

export default MainLayout;