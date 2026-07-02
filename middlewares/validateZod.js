import { object, success } from "zod";

export const validate =(schema)=>async(req,res,next)=>{
    const result = await schema.safeParse(req.body);
    console.log("Result is:",result)

    if(!result.success){
        const formated = result.error.format();
    console.log("Formatted is:",formated)

        return res.status(400).json({
            success:false,
            message:"Validation Failed",
            errors:Object.keys(formated).map(field=>({
                field,
                message:formated[field]?._errors?.[0] || "Invalid inputs",
        
            }))

        })
    }
    next();
}