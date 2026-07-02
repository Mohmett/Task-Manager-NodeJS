import TeachersModel from "../models/teachersModel.js";


export const getTeachers = async (req, res) => {
    console.log(req.body)
    const teachers = await TeachersModel.find();
    res.json(teachers);
    console.log(teachers);
}

export const getSingleTeacher= async(req,res)=>{
    try {
            const teacher= await TeachersModel.findOne({name:req.params.name});
            if(!teacher){
                return res.status(404).send(`${req.params.name} is not a Teacher`)
            }
    res.json(teacher);
    } catch (error) {
        res.send(error)
    }

}

export const createTeacher = async (req, res) => {
    const newTeacher = new TeachersModel(req.body);
    const saveTeacher = await newTeacher.save();
    res.status(201).json(saveTeacher);
}

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTeacher = await TeachersModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedTeacher) {
            return res.status(404).send("User not Found")
        };
        res.json(updatedTeacher)
    } catch (error) {
        res.send(error)
    }

}


export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTeacher = await TeachersModel.findByIdAndDelete(id);
        if(!deletedTeacher){
            return res.status(404).send("User Not Found");
        }
        res.send(`User ${id} deleted successfuly`);

    } catch (error) {
        res.send(error);
    }

}