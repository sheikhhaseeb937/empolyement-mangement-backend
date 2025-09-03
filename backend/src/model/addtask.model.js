import mongoose from "mongoose";


const addtaskSchema = new mongoose.Schema({
    selectedDepartment: {
        type: String,
        required: true
    },
    member:{
        type:String,
    },
    taskdescription: {
        type: String,
        required: true
    },
    
 
    status: {
        type: String,
        enum: ["pending", "In Processing", "completed","rejected"],
        default: "pending"
    },
       dateTime:{
        type: Date,
    
    },

 
});

const AddTask = mongoose.model("AddTask", addtaskSchema);
export default AddTask;