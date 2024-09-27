import { Button } from "@/components/ui/button";

function TaskItem({ task, onToggleStatus, onDelete }) {
  // Handle task status update
  const handleUpdate = () => {
    // Toggle between "pending" and "completed"
    const newStatus = task.status === "pending" ? "completed" : "pending";
    onToggleStatus(task.id, task.task, newStatus); // Pass correct task description and new status
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <span className={task.status === "completed" ? "line-through" : ""}>
        {task.task}
      </span>
      <div className="space-x-2">
        <Button onClick={handleUpdate}>
          {task.status === "pending" ? "Mark as done" : "Mark as pending"}
        </Button>
        <Button variant="destructive" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default TaskItem;
