import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TaskService from "@/services/TaskService";
import toast from "react-hot-toast";
import { useState } from "react";

export const UpdateTaskModal = ({ task, onTaskUpdated }) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Tiêu đề là bắt buộc"),
      description: Yup.string().required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await TaskService.updateTask(task._id, values);
        toast.success("Cập nhật task thành công!");
        resetForm();
        setOpen(false);
        if (onTaskUpdated) onTaskUpdated();
      } catch (error) {
        toast.error("Cập nhật task thất bại!");
        console.error("Update task error:", error);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Cập nhật Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              name="title"
              placeholder="Nhập tiêu đề task..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Nhập mô tả task..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Đang cập nhật..." : "Cập nhật Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
