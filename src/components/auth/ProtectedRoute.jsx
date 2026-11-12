
import { Navigate } from "react-router";
import { authClient } from "../../lib/auth-client";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-100">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-[#5c060c] border-t-transparent rounded-full animate-spin" />
                    <span className="text-stone-700 font-medium text-sm">
                        Verifying secure session...
                    </span>
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return <Navigate to="/admin/sign-in" replace />;
    }

    const userRole = session.user.role;

    if (!userRole || (allowedRoles && !allowedRoles.includes(userRole))) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-100">
                <p className="text-red-600 font-semibold">
                    Unauthorized access! You do not have permission.
                </p>
            </div>
        );
    }

    return children;
}
