import Member from "../model/addmember.js";


// ✅ Add a new member
export const addMember = async (req, res) => {
  try {
    const { name, gender, age } = req.body;

    // validation
    if (!name || !gender || !age) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMember = new Member({
      name,
      gender,
      age,
    });

    await newMember.save();

    res.status(201).json({
      message: "Member added successfully!",
      member: newMember,
    });
  } catch (error) {
    console.error("Add Member Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single member by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete a member
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
