import Task from "../models/TaskModel.js"


export const taskCreator = async (req, res, next) => {
    try {
        const task = await Task.create({ ...req.body, createdBy: req.student._id });
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({createdBy: req.student._id}).sort({createdAt:-1});
        res.status(200).json(tasks);
    } catch (error) {
        next();
    }
};

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteTask = await Task.findByIdAndDelete(id);
        res.status(200).json(deleteTask);
    } catch (error) {
        next();
    }
};

export const updateTask= async (req,res,next)=>{
    const {id}= req.params;
    try {
        const updatedTask= await Task.findByIdAndUpdate({_id:id, createdBy:req.student._id},req.body,{new:true});

        if(!updateTask) return res.send(`${id} is not exist`)
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

// export const updateTask= async(req,res,nect)=>{
//     const {id}=req.params;
//     try {
//         const updatedTask= await Task.findByIdAndUpdate(id,{createdBy:req.student._id},req.body,{new:true});
//         res.status(200).json(updateTask);
//     } catch (error) {
//         next(error);
//     }
// }