import { useQueryClient, useMutation, } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


const createTask = async (newTask) => {
    const response = await fetch("http://localhost:3000/api/tasks",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        }

    );
    if (!response.ok) throw new Error("Created new Task failed");
    return response.json();

}

const Task = () => {

    const [task, setTask] = useState('');

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });

        }
    });

    const handleTask = () => {
        mutation.mutate({ title: task, completed: false })

    }

    return (
        <div>
            <Input className="lg" value={task} onChange={(e) => setTask(e.target.value)} />
            <Button onClick={handleTask} size='lg'>Add Task</Button>
        </div>
    )
}

export default Task