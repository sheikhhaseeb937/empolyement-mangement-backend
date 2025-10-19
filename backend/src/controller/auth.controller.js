import Employee from "../model/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const createEmployee = async (req, res) => {
    try {
        const { fullname, email, password,  } = req.body;



// /// Check if all required fields are provided
    if (!fullname || !email || !password  ) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }
        //// Check if user already exists
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const newEmployee = await Employee.create({
            fullname,
            email,
        
            password,
          
        });
console.log(newEmployee)


   

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newEmployee
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


///login controller
export const employeeLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        //// Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
            });
        }
        ///// Validate email format
        const user = await Employee.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User email not found",
            });
        }
        console.log(user)

        //// Validate password
        // const isPasswordValid = bcrypt.compareSync(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({
        //         message: "Invalid password and email ",
        //     });
        // }


        //jwt token 
        const tokenjwt = jwt.sign({
            userId: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

// console.log(tokenjwt)

        // Successful login
        res.status(200).json({
            message: "Login successful",
            user,
            tokenjwt
        });

        
    } catch (error) {
        /// Handle errors
        return res.status(500).json({
            message: "An error occurred while logging in",
            error: error.message,
        })
    }
}

////login admin
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        //// Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
            });
        }
        ///// Validate email format
        const user = await Employee.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "admin email not found",
            });
        }
        console.log(user)

        //// Validate password
        // const isPasswordValid = bcrypt.compareSync(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({
        //         message: "Invalid password and email ",
        //     });
        // }


        //jwt token 
        const tokenjwt = jwt.sign({
            userId: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

// console.log(tokenjwt)

        // Successful login
        res.status(200).json({
            message: "Login successful",
            user,
            tokenjwt
        });

        
    } catch (error) {
        /// Handle errors
        return res.status(500).json({
            message: "An error occurred while logging in",
            error: error.message,
        })
    }
}

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


///delete member 
export const deleteMember = async(req,res)=>{
try {
    const {id}=req.params;
    const deleteEmployee = await Employee.findByIdAndDelete(id);
    console.log(deleteEmployee)
    if(deleteEmployee){

    return res.status(201).json({ message: 'Empolyee Delete successfully' });

    }else{
   return res.status(404).json({ message: 'Empolyee Not Found' });

    }

} catch (error) {
 console.log(error)  
   res.status(500).json({
            success: false,
            message: "Internal server error"
        }); 
}
}

////edit member
export const EditMember = async(req,res)=>{
try {
    const {id}=req.params;
    const editEmployee = await Employee.findByIdAndUpdate(id,{
        $set:req.body,
        new:true
    })
    console.log(editEmployee)
if(!editEmployee){
  return res.status(404).json({ message: 'Employee not found' });
}else{
   return res.status(201).json({ message: 'Employee Edit Successfully' });
}
} catch (error) {
    return res.status(500).json({
        message: "Internal server error"
      
    })
}
}