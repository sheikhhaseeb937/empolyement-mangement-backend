import AddTask from "../model/addtask.model.js";

export const createTask = async (req, res) => {
    try {
        const { selectedDepartment, member, taskdescription, status, dateTime } = req.body;

        // Check if all required fields are provided
        if (!selectedDepartment || !member || !taskdescription  || !dateTime) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        const newTask = await AddTask.create({
            selectedDepartment,
            member,
            taskdescription,
            status,
            dateTime
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask
        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

///get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await AddTask.find();
        console.log(tasks)
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

///change status
export const changeTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    let { newStatus } = req.body;

    // Validate input
    if (!newStatus) {
      return res.status(400).json({
        success: false,
        message: "Please provide the new status",
      });
    }

    // Normalize (case-insensitive handling)
    const allowedStatuses = ["pending", "In Processing", "completed", "rejected"];
    const normalizedStatus =
      allowedStatuses.find(
        (s) => s.toLowerCase() === newStatus.toLowerCase()
      ) || null;

    if (!normalizedStatus) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`,
      });
    }

    // Check if the task exists
    const task = await AddTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Update the task status
    task.status = normalizedStatus;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


