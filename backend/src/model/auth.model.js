import mongoose, { mongo, Schema } from "mongoose";



const  EmployeeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    department: {
        type: String
    },
    age:{
        type: String
    },
    dateTime:{
        type: Date,
    
    },
    imagePreview: {
        type: String
    },
    password: {
        type: String,
   
    },

    role:{
        type: String,
        enum: ["employee", "admin"],
        default: "employee"
    }
})

const Employee = mongoose.model("employeeAll", EmployeeSchema)
export default Employee;