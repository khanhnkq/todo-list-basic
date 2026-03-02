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

export const AddTaskModal = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Tiêu đề là bắt buộc"),
      description: Yup.string().required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await TaskService.createTask(values);
        toast.success("Thêm task thành công!");
        resetForm();
        setOpen(false);
        if (onTaskAdded) onTaskAdded();
      } catch (error) {
        toast.error("Thêm task thất bại!");
        console.error("Add task error:", error);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Thêm Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Task Mới</DialogTitle>
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
              {formik.isSubmitting ? "Đang thêm..." : "Thêm Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
