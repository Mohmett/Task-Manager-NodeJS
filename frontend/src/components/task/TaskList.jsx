import { ClipboardCheck, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import TaskCard from './TaskCard';
import Task from '@/Task';
import { all } from 'axios';


const TaskList = ({ tasks, isLoading, onEdit, onDelete, onStatusChange }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks= tasks.filter(task=>{
        const matchSearch= task.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        return matchSearch;
    })

    const GetStats = () => {

        const AllTaskByStatus = ({
            pendingTasks : tasks.filter(task => task.status === 'pending').length,
            inProgressTasks : tasks.filter(task => task.status === 'in progress').length,
            completedTasks : tasks.filter(task => task.status === 'completed').length,
        });

        const catogrisedTasks=({
            all: filteredTasks,
            pending: filteredTasks.filter(task => task.status === 'pending'),
            inProgress: filteredTasks.filter(task => task.status === 'in progress'),
            completed: filteredTasks.filter(task => task.status === 'completed'),
        })

        const stats = {
            allTasks: tasks.length,
            pendingTasks: AllTaskByStatus.pendingTasks,
            inProgressTasks: AllTaskByStatus.inProgressTasks,
            completedTasks: AllTaskByStatus.completedTasks,
        };

        const total=tasks.length;


        return{total,stats, catogrisedTasks};
    };

    const { total, stats, catogrisedTasks} = GetStats();

    // const stats = GetStats();

    const TaskGrid = ({ tasks, emptyMessage }) => {
        if (tasks.length === 0) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">{emptyMessage}</p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                    />
                ))}
            </div>
        )
    };



    return (
        <div className='space-y-6'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">{stats?.allTasks}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{stats?.pendingTasks}</p>
                </div>


                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{stats?.inProgressTasks}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Completed</p>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats?.completedTasks}</p>
                </div>
            </div>

            {/* search input */}

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2  h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
                    <Input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-sm pl-10 hover:border-primary border-2 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>


            {/* Task Tabs */}
            <Tabs defaultValue="all" className="flex flex-col gap-8 w-full">
                <TabsList className="grid w-full grid-cols-2 gap-2  md:grid-cols-4">
                    <TabsTrigger value="all">
                        All Tasks
                        <Badge variant="primary" className="ml-2"> {stats?.allTasks} </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending">Pending
                        <Badge variant="primary" className="ml-2"> {stats?.pendingTasks} </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress
                        <Badge variant="primary" className="ml-2"> {stats?.inProgressTasks} </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed">Completed
                        <Badge variant="primary" className="ml-2"> {stats?.completedTasks} </Badge>
                    </TabsTrigger>
                </TabsList>
                <div>
                <TabsContent value="all">
                    <TaskGrid
                        tasks={catogrisedTasks?.all}
                        emptyMessage="No tasks available."
                    />
                </TabsContent>
                <TabsContent value="pending">
                    <TaskGrid
                        tasks={catogrisedTasks?.pending}
                        emptyMessage="No pending tasks."
                    />
                </TabsContent>
                <TabsContent value="in-progress">
                    <TaskGrid
                        tasks={catogrisedTasks?.inProgress}
                        emptyMessage="No in-progress tasks."
                    />
                </TabsContent>
                <TabsContent value="completed">
                    <TaskGrid
                        tasks={catogrisedTasks?.completed}
                        emptyMessage="No completed tasks."
                    />
                </TabsContent>
                </div>
            </Tabs>

        </div>
    )
}

export default TaskList