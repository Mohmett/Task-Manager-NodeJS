import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api/apiClient';
import useAuthStore from '@/lib/store/authStore';
import { globalErrorMessages } from '@/lib/utils/globalError';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';


const LoginForm = () => {

    const navigate = useNavigate();
    const {setAuth,student}= useAuthStore();
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null); //Error State


    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            if(data.token){
                const student = data.student;
                const token= data.token;
                setAuth(student,token)
                navigate('/dashboard');
                toast.success(`Welcome Back! ${student.name}`)
                // return toast.success(`Welcome Back Mr.${student.name}`);
            }
        },
        onError: (error) => {
            setError(globalErrorMessages(error));
            toast.error(error.response?.data?.message || error.message || "An error occurred during login.");
        }
    })
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setLoginValues({
            ...loginValues,
            [name]: value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!loginValues.email || !loginValues.password) {
            setError("Must fill the inputs");
            return
        }

        loginMutation.mutate({
            email: loginValues.email,
            password: loginValues.password
        })
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardDescription>
                    <p className='text-center'>Enter your email below to log in to your account</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    {
                        error && (
                            <div className='p-2 mb-2 rounded-lg text-sm font-regular text-destructive bg-destructive/10 text-center'>
                                {error}
                            </div>
                        )
                    }
                    <div className="flex flex-col gap-6">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                onChange={handleInputs}
                                value={loginValues.email}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                            // required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                onChange={handleInputs}
                                value={loginValues.password}
                                id="password"
                                type="password"
                            // required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                           {loginMutation.isLoading ? "Logging in..." : "Log In"} 
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Button variant="link" className="p-0 h-auto font-normal" onClick={() => { navigate('/register') }}>
                        Sign Up
                    </Button>
                </div>
            </CardFooter>
        </Card>

    )
}

export default LoginForm