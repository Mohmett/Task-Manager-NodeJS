import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api/apiClient'
// import toast from 'react-hot-toast'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useAuthStore from '@/lib/store/authStore'
import { toast } from "sonner"
import { Loader } from 'lucide-react'


const TaskForm = ({ task, open = true, onOpenChange }) => {


  const { token } = useAuthStore();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "pending",
    expiryDate: ""
  });

  const queryClient = useQueryClient();

  // CREATE TASK MUTATION
  // CREATE TASK MUTATION
  // CREATE TASK MUTATION
  const createTasMutation = useMutation({
    mutationFn: async (newTask) => {
      const response = await api.post('/tasks', newTask);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`Task "${formValues.title}" Created Successfully`);
      queryClient.invalidateQueries(['tasks']);
      onOpenChange?.(false);
      setFormValues({
        title: "",
        description: "",
        status: "pending",
        expiryDate: ""
      });
    },
    onError: (error) => {
      toast.error("Failed to create task");
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await api.put(`/tasks/update/${task._id}`, taskData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`${task._id} Updated successfully`);
      onOpenChange?.(false);
      queryClient.invalidateQueries(['tasks']);
      setFormValues({
        title: "",
        description: "",
        status: "pending",
        expiryDate: ""
      });
    },
    onError: (error) => {
      toast.error(`${updateMutation.error}`);
    }
  });

  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title,
        description: task.description || "",
        status: task.status,
        expiryDate: task.expiryDate ? new Date(task.expiryDate).toISOString().split('T')[0] : null
      })
    } else {
      setFormValues({
        title: "",
        description: "",
        status: "pending",
        expiryDate: ""
      })
    }
  }, [task, open]);


  // HANDLE SAVE TASK
  // HANDLE SAVE TASK
  // HANDLE SAVE TASK
  const handleSaveTask = (e) => {
    e.preventDefault();
    if (formValues.title == "") {
      return toast.error("All fields must Fill");
    };
      // updateMutation.mutate({
      //   title: formValues.title.trim(),
      //   description: formValues.description.trim(),
      //   status: formValues.status,
      //   expiryDate: formValues.expiryDate ? new Date(formValues.expiryDate).toISOString() : null
      // });

    if (task) {
      updateMutation.mutate({
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        status: formValues.status,
        expiryDate: formValues.expiryDate ? new Date(formValues.expiryDate).toISOString() : null
      });
    } else {
      createTasMutation.mutate({
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        status: formValues.status,
        expiryDate: formValues.expiryDate ? new Date(formValues.expiryDate).toISOString() : null
      });



    }
  };

  const isLoading = updateMutation?.isPending || createTasMutation?.isPending;

  //HANDLE INPUT CHANGE
  //HANDLE INPUT CHANGE
  //HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogTrigger />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Fill here to create new Task
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="task">Task</Label>
              <Input value={formValues.title} onChange={handleInputChange} id="task" name="title" placeholder="Task" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea value={formValues.description} onChange={handleInputChange} id="description" name="description" placeholder="Description" />
            </Field>

            <Field>
              <Select value={formValues.status} onValueChange={(value) => setFormValues({ ...formValues, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="in progress">in progress</SelectItem>
                    <SelectItem value="completed">completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input type="date" value={formValues.expiryDate} onChange={handleInputChange} id="expiryDate" name="expiryDate" />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button onClick={handleSaveTask} disabled={isLoading} type="submit">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className='text-sm' />
                  {task ? 'Updating...' : 'Creating...'}
                </span>
              ) : task ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default TaskForm