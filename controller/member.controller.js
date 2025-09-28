import Member from "../model/member.model.js";

export const createMember = async (req, res) => {
  const data = req.body || {};
  const { name } = data;

  try {
    const member = await Member.findOne({ name });
    if (member) {
      return res.status(409).json({
        status: "error",
        message: "This member already exit!",
        data: member,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const newMember = new Member({
      name,
      ...data,
      image: imageUrl,
    });
    await newMember.save();
    return res.status(201).json({
      status: "success",
      message: "Member created successfully!",
      data: newMember,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const getAllMember = async (req, res) => {
  try {
    const members = await Member.find();

    res.status(200).json({
      status: "success",
      message: "Retrieve all members successfully!",
      data: members,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findById(id);
    if (!member) {
      return res
        .status(404)
        .json({ status: "error", message: "Member not found!" });
    }

    res.status(200).json({
      status: "success",
      message: "Retrieve a member successfully!",
      data: member,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateMember = async (req, res) => {
  const data = req.body || {};
  const { id } = req.params;

  try {
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({
        status: "error",
        message: "Member not found!",
        data: member,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        ...data,
        ...(imageUrl && { ...imageUrl }),
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "Member updated successfully!",
      data: updatedMember,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({
        status: "error",
        message: "Member not found!",
        data: member,
      });
    }

    const deletedMe = await Member.findByIdAndDelete(id);
    return res.stmberatus(200).json({
      status: "success",
      message: "Member deleted successfully!",
      data: deletedMe,
    });
  } catch (error) {
    console.log("Error", error);
  }
};
