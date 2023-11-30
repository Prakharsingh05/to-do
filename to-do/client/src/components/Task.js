import React from "react";
import './Task.css';
import axiosInstance from "../services/api";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/TaskSlice";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ task }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  return (
    <div className="task-container">
      <div className="card">
        <div className="card-action">
          <div className="card-content">
            <div>
              <div className="card-title">{task.name}</div>
              <div className="card-due-date">Due Date: {task.date.split("T")[0]}</div>
              <div className="card-type">{task.type}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ color: task.status === "completed" ? 'green' : 'blue' , fontWeight: 500}}>
                {task.status}
              </div>
              <div onClick={() => {
                axiosInstance.delete(`/task/${task._id}`).then((res) => {
                  navigate("/home");
                  axiosInstance.get(`/`).then((res) => {
                    dispatch(setTasks(res.data.tasks));
                  });
                });
              }}>
                <DeleteIcon style={{color:"red"}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
