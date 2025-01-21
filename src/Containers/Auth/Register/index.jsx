import { Helmet, HelmetProvider } from "react-helmet-async";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Alert,
  CardMedia,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../stores/Auth/actions";
import Loader from "../../../Components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LazyLoad from "react-lazyload";
import styles from "./Register.module.scss";

function Register() {
  const dispatch = useDispatch();
  const { registerError, isRegistering, isRegistered, isAuthenticated, user } =
    useSelector((state) => state?.AuthReducer);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirm);
    setError("");
    dispatch(register(formData));
  };

  const { values, setValues, errors, handleSubmit, touched } = useValidator({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid Email!").required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&-_]{8,}$/,
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
        )
        .required("Password is required."),
      password_confirm: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&-_]{8,}$/,
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
        )
        .required("Confirm Password is required.")
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm password should match with password."
        ),
    }),
    onSubmit,
  });

  const [error, setError] = useState("");
  useEffect(() => {
    if (typeof registerError === "object" && registerError !== undefined && registerError !== null) {
      setError(Object.values(registerError).join(", "));
    }
  }, [registerError]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/news-search");
    }
  }, [isAuthenticated, user]);

  return (
<HelmetProvider>
  <Helmet>
    <title>Register</title>
  </Helmet>
  <div className={styles.registerContainer}>
    <div className={styles.registerForm}>
      <h2>Register</h2>
      {/* Display success or error messages */}
      {isRegistered && (
        <div className={styles.successmessage}>You are registered, Please login!</div>
      )}
      {error && <div className={styles.errormessage}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formgroup}>
          <label>Name</label>
          <input
  type="text"
  className={`form-control ${errors.name ? "is-invalid" : ""}`}
  value={values.name}
  onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
/>
{errors.name && touched.name && <div className="error">{errors.name}</div>}


        </div>
        <div className={styles.formgroup}>
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={values.email}
            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className={styles.formgroup}>
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={values.password}
            onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className={styles.formgroup}>
          <label>Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.password_confirm ? "is-invalid" : ""}`}
            value={values.password_confirm}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                password_confirm: e.target.value,
              }))
            }
          />
          {errors.password_confirm && (
            <div className="error">{errors.password_confirm}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isRegistering}>
          {isRegistering ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
</HelmetProvider>
  );
}

export default Register;
