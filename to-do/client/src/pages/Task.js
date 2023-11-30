
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../services/api";
import { setTask } from "../redux/TaskSlice";
import Header from "./Header";
import "./Task.css"
import TaskForm from "../components/TaskForm.js";

const Task = () => {
  const { id } = useParams();
  const [currentTask, setCurrentTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTask() {
      await axios.get(`/task/${id}`).then((res) => {
        setCurrentTask(res.data.task);
        dispatch(setTask(res.data.task));
      });
    }
    fetchTask();
  }, [id, dispatch]);

  if (!currentTask) {
    return null; 
  }

  return (
    <div className="task-container">
      <Header />
      <div className="container">
        <TaskForm task={currentTask} />
      </div>
    </div>
  );
};

export default Task;
