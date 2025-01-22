import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../stores/Auth/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import styles from "./Register.module.scss";

function Register() {
  const dispatch = useDispatch();
  const { registerError, isRegistering, isRegistered, isAuthenticated, user } =
    useSelector((state) => state?.AuthReducer);

  const [error, setError] = useState("");

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

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/news-search");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (typeof registerError === "object" && registerError !== null) {
      setError(Object.values(registerError).join(", "));
    }
  }, [registerError]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className={styles.registerContainer}>
          <div className={styles.registerForm}>
            <h1>Register</h1>
            {isRegistered && <p className={styles.success}>You are registered, Please login!</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className={styles.formgroup}>
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                />
                {touched.name && errors.name && <small className="error">{errors.name}</small>}
              </div>

              <div className={styles.formgroup}>
                <label htmlFor="email">Email Address</label>
                <br />
                <input
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
                {touched.email && errors.email && <small className="error">{errors.email}</small>}
              </div>

              <div className={styles.formgroup}>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                {touched.password && errors.password && <small className="error">{errors.password}</small>}
              </div>

              <div className={styles.formgroup}>
                <label htmlFor="password_confirm">Confirm Password</label>
                <br />
                <input
                  type="password"
                  id="password_confirm"
                  value={values.password_confirm}
                  onChange={(e) =>
                    setValues({ ...values, password_confirm: e.target.value })
                  }
                />
                {touched.password_confirm && errors.password_confirm && (
                  <small className="error">{errors.password_confirm}</small>
                )}
              </div>

              <button type="submit" className={styles.submitBtn}>
                {isRegistering ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="SignUp">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
      </div>
    </HelmetProvider>
  );
}

export default Register;
