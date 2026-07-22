import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import TaskForm from '@/components/task/TaskForm';
import TaskList from '@/components/task/TaskList';
import { Button } from '@/components/ui/button';
import api from '@/lib/api/apiClient';
import useAuthStore from '@/lib/store/authStore'
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const DashboardPage = () => {

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };

  const handleCreateTaskClick = () => {
    setShowCreateForm(true);
    setEditingTask(null);
  }

  const taskQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
    onsuccess: (data) => {
    },
    onerror: (error) => {
      console.error('Error fetching tasks:', error);
    },
    retry: 1,
  });

  if (taskQuery.isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin font-medium text-2xl text-orange-500' size={25} />
      </div>
    )
  }
  
  if (taskQuery.isError) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p className='text-red-500'>Error loading tasks: {taskQuery.error.message}</p>
            </div>
        )
    }

const handleEditTask = (task)=>{
  setEditingTask(task);
  setShowCreateForm(true);
}



const handleStatusChange= async(taskId,statusData)=>{
  // Implementation for changing the status of a task
}

  return (
    <div className='h-screen bg-background'>
      {/* Header */}
      <DashboardHeader />
      <main className='max-w-full w-auto px-4 py-8 space-y-6'>
        {/* Welcome Section */}
        <DashboardWelcome
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTaskClick}
        />
        {/* Task Section */}
        <div>
          <TaskList
          tasks={taskQuery?.data || []}
          isLoading={taskQuery.isLoading}
          onEdit={handleEditTask}
          onStatusChange={handleStatusChange}
          />
        </div>

      </main>

      {/* Task Dailog Form */}
      <TaskForm
      task={editingTask}
        open={showCreateForm || !!editingTask}
        onOpenChange={handleCloseForm}
      />
    </div>
  )
}

export default DashboardPage