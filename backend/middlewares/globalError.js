export const globalError=(err,req,res,next)=>{
    const status= err.statusCode || 500;
    res.status(status).json({
        success:false,
        message:`Global Error: ${err.message}` || 'Something went wrong saaxiib!',
        status:err.status
    })
}