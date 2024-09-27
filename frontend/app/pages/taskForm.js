import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define your Zod schema for validation
const taskSchema = z.object({
  task: z.string().min(1, "Task cannot be empty"),
});

export default function TaskForm({ onAddTask }) {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
    },
  });

  // Update the form submission handler to pass only the task value
  const onSubmit = (data) => {
    // Only pass the 'task' field to the backend, not the entire object
    const taskValue = data.task;
    onAddTask(taskValue);
  };

  // Add the return statement to make sure the form is rendered
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input
                  className="border px-4 py-2 rounded w-full"
                  placeholder="Enter your task"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the task you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
