import React from "react";
import TaskForm from "../components/TaskForm";
import Header from "./Header";
import "./TaskCreate.css"

const TaskCreate = () => {
  return (
    <div className="task-create-container">
      <Header />
      <div className="container">
        <TaskForm mode="create" />
      </div>
    </div>
  );
};

export default TaskCreate;
