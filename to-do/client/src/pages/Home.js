import { useState, useEffect } from "react";
import axios from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/TaskSlice";
import Header from "./Header";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import "./Home.css"

const Home = () => {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("");
  const types = ["All","Overdue", "Pending", "Completed"];

  useEffect(() => {
    axios.get(`/task?type=${typeFilter}`).then((res) => {
      dispatch(setTasks(res.data.tasks));
    });
  }, [dispatch, typeFilter]);
  const { tasks } = useSelector((state) => state.task);

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const clearFilters = () => {
    setTypeFilter('');
  };

  return (
    <div className="home-container">
      <Header />
      <div className="container">
        <div className="filter-section">
          <select value={typeFilter} onChange={handleTypeChange}>
            {types.map((type, idx) => (
              <option key={`${idx}-${type}`} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="button-section">
            <Link to="/task/create">
              <button className="create-button">Create</button>
            </Link>
          </div>
        </div>
        <div className="clear-filters-section">
          <button className="filter-button" onClick={clearFilters}>Clear filters</button>
        </div>
        <div className="tasks-section">
          {tasks.map((task, idx) => (
            <Link
              key={`${idx}-${task.id}`}
              style={{ textDecoration: "none" }}
              to={`/task/${task._id}`}
            >
              <Task task={task} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
