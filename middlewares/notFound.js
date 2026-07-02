export const notFound=(req,res,next)=>{
    const error= new Error(`Route: ${req.originalUrl} not found`);
    error.status=404;
    // if(error) return res.send(error.message)
    next(error);
}