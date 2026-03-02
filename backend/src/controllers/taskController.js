import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lấy danh sách task thất bại" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json({ message: "Lấy thông tin task thành công", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lấy thông tin task thất bại" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Thêm task thất bại" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json({ message: "Xóa task thành công", deletedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Xóa task thất bại" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, completedAt },
      { new: true },
    );
    if (!updatedTask) {
      res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json({ message: "Cập nhật task thành công", updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cập nhật task thất bại" });
  }
};
