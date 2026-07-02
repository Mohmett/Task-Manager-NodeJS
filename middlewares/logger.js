export const logger=(req,res,next)=>{
    console.log(`Logger Data is:- Date:${new Date().toDateString()}, Method: ${req.method}, URL:${req.originalUrl}`)
    next();
}