
export const globalErrorMessages=(error)=>{
    if(!error) return null;

    if(error.response?.data){
        const data = error.response.data;

        // Handle Zod validation errors
        if(data.errors && Array.isArray(data.errors)){
            return data.errors.map(err=>err.message).join(',');
        }

        // Hanlde Single Error Message
        if(data.message){
            return data.message;
        }

        if(data.error){
            return data.error;
        }

    }

    // Network or external error
    if(error.response && !error.response){
        return "Network Error, Please check your network"
    }

    if(error.message){
        return error.message
    }

    return "Something wrong, please try again"
}