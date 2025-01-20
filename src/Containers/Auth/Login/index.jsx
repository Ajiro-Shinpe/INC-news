import { Helmet, HelmetProvider } from "react-helmet-async";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormHelperText, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Loader from "../../../Components/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../stores/Auth/actions";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from './login.module.scss'

function Login() {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const {
        loginError,
        isLoggingIn,
        isAuthenticated,
        user
    } = useSelector(state => state?.AuthReducer);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        setError('');
        dispatch(login(formData));
    }

    const {
        values,
        setValues,
        errors,
        handleSubmit,
        touched
    } = useValidator({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid Email!").required('Email is required'),
            password: Yup.string().required('Password is required.'),
        }),
        onSubmit,
    });

    useEffect(() => {
        if (loginError && typeof loginError === 'object' && !Array.isArray(loginError)) {
            setError(Object.values(loginError).join(", "));
        } else if (typeof loginError === 'string') {
            setError(loginError);
        }
    }, [loginError]);

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated && user) {
            navigate('/news-search');
        }
    }, [isAuthenticated, user]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Login</title>
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
              src={"/assets/image1.png"}
            />
          </Box> 
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <Container
                maxWidth="sm"
                sx={{
                    py: '60px'
                }}
            >
                <Box pt={3} pb={2} px={4} className={style.form1}>
             

                    <form noValidate onSubmit={handleSubmit}>
                        <Typography variant="h4" component="h1" align="center" mb={2}>
                            Login
                        </Typography>
                        {error &&
                            <Typography color="error" align="center">{error}</Typography>
                        }
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="Email address"
                                    id="emailAddress"
                                    autoComplete="email"
                                    value={values?.email}
                                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    // Remove any unsupported props like focusVisibleClassName
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
                                    value={values?.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                                />
                                {touched?.password && errors?.password && (
                                    <FormHelperText error>{errors?.password}</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                {isLoggingIn ? (
                                    <Button disabled fullWidth size='large' color="primary" variant="outlined">
                                        <Loader/>
                                    </Button>
                                ) : (
                                    <Button type="submit" fullWidth size='large' color="primary" variant="outlined">
                                        Login
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                        <div className="hr_line" mt={3}/>
                        <Grid container mt={3}>
                            <Link to="/register" className="green_text">
                               <Typography> Not  an account. Click to  Signup ?</Typography>
                            </Link>
                        </Grid>
                    </form>
                </Box>
            </Container>
            </Grid>  
        </Grid> 
        </HelmetProvider>
    );
}

export default Login;
