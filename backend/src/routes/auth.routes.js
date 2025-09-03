

import express from 'express';
import { adminLogin, createEmployee, deleteMember, EditMember, employeeLogin, getAllEmployees } from '../controller/auth.controller.js';
import { changeTaskStatus, createTask, getAllTasks } from '../controller/addtask.controller.js';

const Authrouter = express.Router();
///create employee admin
Authrouter.post('/create',createEmployee)
///get all employee admin
Authrouter.get('/getAll', getAllEmployees);
////login employee
Authrouter.post('/loginEmployee', employeeLogin);
//adminlogin
Authrouter.post('/adminLogin', adminLogin);
///addtask
Authrouter.post('/addtask', createTask);
Authrouter.get("/getAllTasks",getAllTasks )
Authrouter.put("/changeTaskStatus/:taskId", changeTaskStatus);

////delete memeber
Authrouter.delete("/deleteMember/:id", deleteMember)
///edit member
Authrouter.put("/editMember/:id", EditMember)

export default Authrouter;