import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { globalErrorMessages } from '@/lib/utils/globalError';
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const RegisterForm = () => {

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confimrPassword: ""
  }); //Form Data State
  const [error, setError] = useState(null); //Error State

  const registerMutation = useMutation({
    mutationFn: async (studentData) => {
      const response = await api.post('/auth/register', studentData)
      return response.data;
    },
    onSuccess: (data) => {
      navigate('/login');
    },
    onError:(err) => {
      setError(globalErrorMessages(err));
    }
  }); // Giving Data to the Database using axios

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (formValues.name == "" || formValues.email == ""  || formValues.password == ""  || formValues.confimrPassword == "" ) {
      setError("All fields must fill");
      return;
    }
    if (formValues.password !== formValues.confimrPassword) {
      setError("Mismatch Password");
      return;
    }

    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
  }; //Register Form Handling 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]:value
    })
  } //Handling The changes of the inputs


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardDescription>
          Enter your details below to create your account
          
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {
            error && (
              <div className='p-2 mb-2 rounded-lg text-sm font-regular text-destructive bg-destructive/10 text-center'>
                {error}
              </div>
            )
          }
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                value={formValues.name}
              onChange={handleInputChange}
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={formValues.email}
                onChange={handleInputChange}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={formValues.password}
                onChange={handleInputChange}
                id="password" 
                type="password" 
                name="password" 
                required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input 
              value={formValues.confimrPassword}
              onChange={handleInputChange}
              id="password"
              name="confimrPassword"
               type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {registerMutation.isPending ? <span><LoaderCircle/> Creating Account....</span>: "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button type="submit" variant="link" className="p-0 h-auto font-normal" onClick={() => { navigate('/login') }}>
            Login
          </Button>
        </div>
      </CardFooter>
    </Card>

  )
}

export default RegisterForm