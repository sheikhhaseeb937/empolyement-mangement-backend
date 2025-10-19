import mongoose, { mongo, Schema } from "mongoose";



const  EmployeeSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
   
    password: {
        type: String,
   
    },

 
})

const Employee = mongoose.model("employeeAll", EmployeeSchema)
export default Employee;