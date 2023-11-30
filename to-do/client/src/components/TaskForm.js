import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";
import './TaskForm.css';

const initialEditSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  date: Yup.string().required("required"),
  type: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});

const initialCreateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  date: Yup.string().required("required"),
  type: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

let initialValues = {
  name: "",
  type: "Personal",
  date: dayjs().format('YYYY-MM-DD'),
  description: "",
};

const TaskForm = ({ mode = "edit", task }) => {
  const navigate = useNavigate();
  const types = ["Personal", "Official", "Hobby", "Other"];

  const handleFormSubmit = (values, onSubmitProps) => {
    if (mode === "edit") {
      axiosInstance.put(`/task/${values._id}`, values).then((res) => {
        navigate("/home");
      });
    } else {
      axiosInstance.post(`/task/create`, values).then((res) => {
        navigate("/home");
      });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={mode === "create" ? initialValues : task}
      validationSchema={mode === "create" ? initialCreateSchema : initialEditSchema}
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        resetForm,
        values,
        handleChange,
        errors,
      }) => (
        <div className="task-form-container">
          <h2>{mode === "edit" ? 'Edit Task' : 'Create a Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Task name</label>
              <input
                type="text"
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && <span>{errors.name}</span>}
            </div>

            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                value={mode ==="edit" ? dayjs(values.date || null).format('YYYY-MM-DD') : values.date}
                min={mode === "edit" ? null : dayjs().format('YYYY-MM-DD')}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                name="date"
              />
              {touched.date && errors.date && <span>{errors.date}</span>}
            </div>

            <div className="form-field">
              <label>Description</label>
              <textarea
                type="text"
                value={values.description}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="description"
                onBlur={handleBlur}
              />
              {touched.description && errors.description && <span>{errors.description}</span>}
            </div>

            <div className="form-field">
              <label>Task type</label>
              <select
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                name="type"
              >
                {types.map((type, idx) => (
                  <option value={type} key={`${idx}-${type}`}>
                    {type}
                  </option>
                ))}
              </select>
              {touched.type && errors.type && <span>{errors.type}</span>}
            </div>

            {mode === "edit" && (
              <div className="form-field">
                <label>Status</label>
                <select
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="status"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            <div className="button-container">
              <button type="submit">
                {mode === "edit" ? 'Edit Task' : 'Create Task'}
              </button>
              <button type="button" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default TaskForm;


