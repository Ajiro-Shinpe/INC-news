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
      <Grid container xs={12}>
        <Grid
          item
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          xs={6}
        >
       
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            my={"auto"}
          >
            <img
              width="500"
              src={"/assets/image2.jpg"}
            />
          </Box> 
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Container
            maxWidth="sm"
            sx={{
              py: "17px",
            }}
          >
            <Box pt={0} pb={0} px={4}>
              <form noValidate onSubmit={handleSubmit}>
                <Typography variant="h4" component="h1" align="center">
                  Register
                </Typography>
                <br />
                {isRegistered && (
                  <Alert severity="success">
                    You are registered, Please login!
                  </Alert>
                )}

                <br />

                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      id="name"
                      value={values?.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                    {touched?.name && errors?.name && (
                      <FormHelperText error>{errors?.name}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email address"
                      id="emailAddress"
                      autoComplete="email"
                      value={values?.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                    {touched?.email && errors?.email && (
                      <FormHelperText error>{errors?.email}</FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      id="password"
                      autoComplete="new-password"
                      value={values?.password}
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                    />
                    {touched?.password && errors?.password && (
                      <FormHelperText error>{errors?.password}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      id="confirm_password"
                      autoComplete="new-password"
                      value={values?.password_confirm}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          password_confirm: e.target.value,
                        })
                      }
                    />
                    {touched?.password_confirm && errors?.password_confirm && (
                      <FormHelperText error>
                        {errors?.password_confirm}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    {isRegistering ? (
                      <Button
                        disabled
                        fullWidth
                        size="large"
                        color="primary"
                        variant="outlined"
                      >
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        fullWidth
                        size="large"
                        color="primary"
                        variant="outlined"
                      >
                        Register
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <div className="hr_line" mt={3} />
                <Grid container mt={3} justifyContent="center">
                  <Typography variant="body1" color="inherit">
                    Already have an account?{" "}
                    <Link to="/login" className="green_text">
                      Login
                    </Link>
                  </Typography>
                </Grid>
              </form>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}

export default Register;
