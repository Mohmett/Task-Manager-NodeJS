import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useAuthStore = create(

    // Reason using Zustand is getting or accessing every page the user Information and Token. To Make sure if this user is accessable using this page. and also managing roles like user, admin, student, parent cause i can get whole the user infomation i need in local storage of the computer/ mobile.


    persist( //Persist is used when you want to save data into local Storage
        (set, get) => ({
            student: null,
            token: null,
            isAuthenticated: false,

            // After Login successfuly
            setAuth: (studentData, token) => set({
                student: studentData,
                token,
                isAuthenticated: true
            }),

            // Clear when logged out
            clearAuth: () => set({
                student: null,
                token: null,
                isAuthenticated: false,
            }),

            // Get token(for use outside of the react Components)
            getToken:()=>get().token

        }),
        {
            name:"auth-storage",
            partialize:(state)=>({
                student:state.student,
                token:state.token,
                isAuthenticated:state.isAuthenticated

            })
        }
    )
);


export default useAuthStore;