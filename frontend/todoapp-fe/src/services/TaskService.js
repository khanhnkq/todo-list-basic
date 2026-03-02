import axiosInstance from "@/utils/axios";

const TaskService = {
  getAllTasks: async () => {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  },
  getTaskById: async (id) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },
  createTask: async (task) => {
    const response = await axiosInstance.post("/tasks", task);
    return response.data;
  },
  updateTask: async (id, task) => {
    const response = await axiosInstance.put(`/tasks/${id}`, task);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default TaskService;
