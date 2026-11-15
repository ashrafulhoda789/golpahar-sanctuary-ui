import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/homepage/HomePage";
import SignIn from "../pages/auth/SignInPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import DashboardOverview from "../pages/admin/DashboardOverview";
import PujaManagementPage from "../pages/admin/PujaManagement";
import AboutUsPage from "../pages/about/AboutUs";
import HistoryPage from "../pages/about/History";
import PageContent from "../pages/admin/PageContent"
import DeitiesPage from "../pages/deities/DeitiesPage";
import PujaRitualsPage from "../pages/puja-rituals/Puja-Rituals";
import ContactPage from "../pages/contact/ContactPage";
import DonationPage from "../pages/donation/DonationPage";
import NotFoundPage from "../pages/not-found/NotFound";
import EventsNoticesManagementPage from "../pages/admin/EventsNoticesManagement";
import GalleryManagementPage from "../pages/admin/GalleryManagement";
import CommitteeManagementPage from "../pages/admin/CommitteeManagement";
import UpcomingEventsPage from "../pages/festivals/UpcomingEvents";
import GalleryPage from "../pages/gallery/Gallery";
import NoticesPage from "../pages/notice/NoticePage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/about-us",
                element: <AboutUsPage />
            },
            {
                path: "/history",
                element: <HistoryPage />
            }, {
                path: "/deities",
                element: <DeitiesPage />
            },
            {
                path: "/puja-rituals",
                element: <PujaRitualsPage />
            },
            {
                path: "/upcoming-events",
                element: <UpcomingEventsPage />
            },
            {
                path: "/gallery",
                element: <GalleryPage />
            },
            {
                path: "/notice",
                element: <NoticesPage />
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/donation",
                element: <DonationPage />
            }

        ]
    },
    {
        path: "/admin/sign-in",
        element: <SignIn />
    },

    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute allowedRoles={["super_admin"]}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardOverview />
            },
            {
                path: "content",
                element: <PageContent />
            },
            {
                path: "pujas",
                element: <PujaManagementPage />
            },
            {
                path: "notices",
                element: <EventsNoticesManagementPage />
            },
            {
                path: "gallery",
                element: <GalleryManagementPage />
            },
            {
                path: "committee",
                element: <CommitteeManagementPage />
            }
        ]
    },

    {
        path: "/user/dashboard",
        element: (
            <ProtectedRoute allowedRoles={["editor"]}>
                <div className="p-8">
                    <h1 className="text-2xl font-bold">Content Editor Dashboard</h1>
                </div>
            </ProtectedRoute>
        )
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])