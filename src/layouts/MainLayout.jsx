import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import HomeSwitcherBar from "../components/common/HomeSwitcherBar";
import FooterTopbar from "../components/common/FooterTopbar";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />
            <Navbar />
            <main className="grow">
                <Outlet />
            </main>
            <FooterTopbar />
            <Footer />
            <HomeSwitcherBar />
        </div>
    );
};

export default MainLayout;