import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Topbar = () => {
    const { isAdmin } = useAuthStore()
    return (
        <div className="flex items-center justify-between p-4 sticky bg-zinc-900/75
        backdrop-blur-md z-10 rounded-md
    ">
            <div className="flex gap-2 items-center ">
                <img src="/Vibeify.png" alt="" className="size-12 rounded-full"/>
                <p className="font-bold text-lg">Vibeify</p>
            </div>
            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link to={'/admin'} className={cn(buttonVariants({ variant: 'outline' }))}>
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                )}
                <SignedOut>
                    <SignInOAuthButtons />
                </SignedOut>

                <UserButton />
            </div>
        </div>
    )
}

export default Topbar
