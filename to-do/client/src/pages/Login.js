import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import axios from '../services/api'
import { setLogin } from "../redux/UserSlice";
import "./Login.css"

const initialRegisterValues = {
  name: "",
  email: "",
  password: "",
  picture: null,
};

const initialLoginValues = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string().required("Required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [page, setPage] = useState("login");
  const isLogin = page === "login";
  const isRegister = page === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values, onSubmitProps) => {
    axios.post('/auth/login', values).then((res) => {
      
      onSubmitProps.resetForm();
      dispatch(setLogin(res.data.user));
      navigate('/home');
    });
  };

  const handleRegister = (values, onSubmitProps) => {
    let formData = new FormData();
    for (const property of Object.keys(values)) {
      formData.append(property, values[property]);
    }
    axios.post('/auth/register', formData).then(() => {
      onSubmitProps.resetForm();
      setPage('login');
    });
  };

  const handleForm = (values, onSubmitProps) => {
    if (isLogin) handleLogin(values, onSubmitProps);
    if (isRegister) handleRegister(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleForm}
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        setFieldValue,
        values,
        handleChange,
        resetForm,
        errors,
      }) => (
        <div className="login-container">
          <h2>Welcome to To Do App</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {isRegister && (
                <>
                  <label>Enter name</label>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.name && errors.name ? 'error' : ''}
                  />
                  <Dropzone
                    multiple={false}
                    acceptedFiles=".jpg , .png"
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="dropzone"
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add picture</p>
                        ) : (
                          <p>
                            {values.picture.name} <EditOutlinedIcon />
                          </p>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </>
              )}
              <label>Enter email</label>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? 'error' : ''}
              />
              <label>Enter password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? 'error' : ''}
              />
              <button type="submit" className="submit-button">
                {isLogin ? "Login" : "Register"}
              </button>
              <p
                onClick={() => {
                  setPage(isLogin ? "register" : "login");
                  resetForm();
                }}
                className="toggle-page"
              >
                {isLogin ? (
                  <>Not a user, go to register</>
                ) : (
                  <>Already a user, go to login</>
                )}
              </p>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;

