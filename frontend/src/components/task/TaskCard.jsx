import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from '../ui/button'
import { Badge } from '../ui/badge';
import { Calendar, Calendar1, Calendar1Icon, CalendarX2, Edit2, LucideCalendar1, MoreVertical, Trash2 } from 'lucide-react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/api/apiClient';


const STATUS_CONFIG = {
    'pending': {
        variant: 'secondary',
        label: 'Pending',
        color: 'text-yellow-600'
    },
    'in progress': {
        variant: 'outline',
        label: 'In Progress',
        color: 'text-blue-600'
    },
    'completed': {
        variant: 'outline',
        label: 'Completed',
        color: 'text-green-600'
    }
};

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

const TaskCard = ({ task, onEdit, onStatusChange }) => {


    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const statusConfig = STATUS_CONFIG[task?.status] || STATUS_CONFIG['pending'];


    const queryClient = useQueryClient();
    const deleteMutation= useMutation({
        mutationFn: async (taskId) => {
            const response = await api.delete(`/tasks/delete/${taskId}`);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tasks']); // Invalidate the tasks query to refetch the updated list
            toast.success("Task deleted successfully!");
        },
        onError: (error) => {
            toast.error("Failed to delete task", error.message);
        }

    });

    const handleDelete = () => {
        setDeleteLoading(true);
        deleteMutation.mutate(task._id, {
            onSettled: () => {
                setDeleteLoading(false);
            }
        });
    };

    return (
        <>
        <Card className="mx-auto w-full" key={task._id}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{task?.title}</CardTitle>
                    <div className='flex items-center gap-2'>
                        <Badge variant={statusConfig.variant} className={statusConfig.color}>
                            {statusConfig.label}
                        </Badge>

                        {/* Dropdown for status change */}
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                    <MoreVertical variant="ghost" className='h-4 w-4' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem className={"text-blue-600"}
                                onClick={()=>onEdit(task)}
                                >
                                    <Edit2 className='mr-2 h-4 w-4' />
                                    Edit</DropdownMenuItem>
                                <DropdownMenuItem className={"text-red-600"}
                                onClick={()=>setShowDeleteDialog(true)}
                                >
                                    <Trash2 className='mr-2 h-4 w-4' />
                                    Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </CardHeader>
            <CardContent className="-mb-(--card-spacing) flex flex-col gap-4">
                <div className='space-y-4 mb-4'>
                <CardDescription>{task?.description}</CardDescription>
                <CardDescription className={'flex items-center gap-2'}><Calendar className="h-4 w-4 text-muted-foreground" />Due Date: <Badge variant='outline' className=' text-black'> {formatDate(task?.expiryDate)} </Badge></CardDescription>
                </div>
            </CardContent>
            <CardFooter>
                <div className='text-muted-foreground flex gap-2 items-center'>
                    <Calendar className="h-4 w-4 "/>
                    <div className='h-2 w-0.5 bg-gray-500'></div>
                    <span className='text-xs'>{formatDate(task?.createdAt)}</span>
                </div>
            </CardFooter>
        </Card>

{/* Alert Dialog for Delete Confirmation */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} >Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}

export default TaskCard