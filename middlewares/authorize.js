
export const authorize=(...roles)=>{

    return (req,res,next)=>{
        if(!roles.includes(req.student.role)){
            return res.status(401).json({message:`Access dinied: Requires on of [${roles.join(",")}]`});
            console.log(req.student.role);
        }
        next();
    }
}