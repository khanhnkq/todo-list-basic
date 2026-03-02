import { useEffect, useState } from "react";
import { AddTaskModal } from "@/components/AddTaskModal";
import TaskService from "@/services/TaskService";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UpdateTaskModal } from "@/components/UpdateTaskModal";

export const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await TaskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      await TaskService.updateTask(id, {
        status: "completed",
        completedAt: new Date(),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách Task</h1>
        <AddTaskModal onTaskAdded={fetchTasks} />
      </div>
      <Table>
        <TableCaption>Task list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tiêu đề</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-left">Ngày tạo</TableHead>
            <TableHead className="text-left">Ngày hoàn thành</TableHead>
            <TableHead className="text-left">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell className="text-left">
                {new Date(task.createdAt).toLocaleString("vi-VN")}
              </TableCell>
              <TableCell className="text-left">
                {task.completedAt
                  ? new Date(task.completedAt).toLocaleString("vi-VN")
                  : "Đang cập nhật"}
              </TableCell>
              <TableCell className="text-left space-x-2">
                <UpdateTaskModal task={task} onTaskUpdated={fetchTasks} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(task._id)}>
                  Xóa
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(task._id)}
                  disabled={task.status === "completed"}>
                  Hoàn Thành
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
