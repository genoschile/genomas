import { useState } from "react";
interface Task {
  id: string;
  title: string;
  status: string;
}
export function Drag() {
  /* task active */
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const [dragOverTask, setDragOverTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Tag 1", status: "todo" },
    { id: "2", title: "Tag 2", status: "todo" },
    { id: "3", title: "Tag 3", status: "todo" },
  ]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.dataTransfer.setData("text/plain", taskId);
    setDraggedTask(taskId);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.preventDefault();
    if (taskId !== draggedTask) {
      setDragOverTask(taskId);
    }
  };

  const handleDragLeave = () => {
    setDragOverTask(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");

    setTasks((prevTasks) => {
      const movedTask = prevTasks.find((task) => task.id === taskId);
      if (!movedTask) return prevTasks;

      let newTasks = prevTasks.filter((task) => task.id !== taskId);
      const targetIndex = dragOverTask
        ? newTasks.findIndex((task) => task.id === dragOverTask)
        : -1;
      movedTask.status = status;

      if (targetIndex !== -1) {
        newTasks.splice(targetIndex, 0, movedTask);
      } else {
        newTasks.push(movedTask);
      }

      return newTasks;
    });

    setDragOverTask(null);
    setDraggedTask(null);
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={(e) => handleDragOver(e, task.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, status)}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: dragOverTask === task.id ? "#FFD700" : "red",
            borderRadius: "1rem",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            transform: dragOverTask === task.id ? "translateY(10px)" : "none",
            cursor: "grab",
          }}
        >
          {task.title}
        </div>
      ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 350px 400px",
          gap: "8px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "white" }}>Todo</h2>
        <h2 style={{ textAlign: "center", color: "white" }}>In Progress</h2>
        <h2 style={{ textAlign: "center", color: "white" }}>Done</h2>

        {["todo", "in-progress", "done"].map((status) => (
          <div
            key={status}
            id={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              border: "2px dashed",
              padding: "2px",
              gap: "4px",
              borderRadius: "4px",
            }}
          >
            {renderTasks(status)}
          </div>
        ))}
      </div>

      <small>El id de drag es: {draggedTask}</small>
    </div>
  );
}
