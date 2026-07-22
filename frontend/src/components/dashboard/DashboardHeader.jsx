import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ClipboardCheck } from 'lucide-react'
import useAuthStore from '@/lib/store/authStore'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

const DashboardHeader = () => {



    const {student,clearAuth}= useAuthStore();
    const navigate= useNavigate();
    const queryClient= useQueryClient(); //QueryClient is a powerful For clearing and

    const [showLogoutDialog,setShowLogoutDialog]= useState(false);

    const handleLogout = () => {
        // if (confirm("Are you sure you want to logout?")) {
            clearAuth();
            queryClient.clear();
            navigate("/login", { replace: true });
        // }
    }

    return (
        <>

        <header className="bg-card border-b border-border shadow-sm">
            <div className="w-full px-8 py-6 flex items-center justify-between">


                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <ClipboardCheck className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl font-semibold text-foreground">Task Dashboard</h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                        Welcome, <span className="font-medium text-foreground">{student?.name.split(" ")[0] || "User"}</span>
                    </span>

                    {/* <Button variant={"outline"} 
                    onClick={handleLogout}
                    >
                        Logout
                    </Button> */}

                                        <Button variant={"outline"} 
                    onClick={()=>setShowLogoutDialog(true)}
                    >
                        Logout
                    </Button>


                    
                </div>
            </div>
        </header>
                <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently Logout?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleLogout} >Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog></>
    )
}
export default DashboardHeader