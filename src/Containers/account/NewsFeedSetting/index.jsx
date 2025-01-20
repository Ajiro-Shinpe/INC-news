import { Helmet, HelmetProvider } from "react-helmet-async";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Card, CardContent, FormControl, FormHelperText, Grid, InputLabel, Select } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { categories, authors, sources } from '../../../constant/newsApiConstant';
import { useDispatch, useSelector } from "react-redux";
import { userPreference, userPreferenceSave } from "../../../stores/Auth/actions";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader";
import styles from "./NewsFeedSetting.module.scss"; // Ensure correct file name

function NewsFeedSetting() {
    const {
        isPreferenceUpdating,
        userPreferenceData,
        userPreferenceError,
        user,
    } = useSelector(state => state?.AuthReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(userPreference());
        }
    }, [user]);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('source', values.source);
        formData.append('category', values.category);
        formData.append('author', values.author);
        setError('');
        dispatch(userPreferenceSave(formData));
    };

    const {
        values,
        setValues,
        errors,
        handleSubmit,
        touched,
        handleChange // Ensure handleChange is correctly defined
    } = useValidator({
        initialValues: {
            source: "",
            category: "",
            author: "",
        },
        validationSchema: Yup.object({
            source: Yup.string().required('Source is required'),
            category: Yup.string().required('Category is required'),
            author: Yup.string().required('Author is required'),
        }),
        onSubmit,
    });

    useEffect(() => {
        if (userPreferenceData) {
            setValues({
                source: userPreferenceData.source || "",
                category: userPreferenceData.category || "",
                author: userPreferenceData.author || "",
            });
        }
    }, [userPreferenceData]);

    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof userPreferenceError === 'object' && userPreferenceError != undefined) {
            setError(Object.values(userPreferenceError).join(", "));
        }
    }, [userPreferenceError]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Preference</title>
            </Helmet>
            <div className={styles.container} style={{ paddingTop: "60px" }}>
                <Card className={styles.card}>
                    <CardContent>
                        <Typography variant="h5" className={styles.cardTitle}>
                            News Feed Setting
                        </Typography>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={styles.formGroup}>
                                <InputLabel htmlFor="source">Source</InputLabel>
                                <Select
                                    id="source"
                                    name="source"
                                    value={values.source}
                                    onChange={handleChange}
                                    error={touched.source && Boolean(errors.source)}
                                    className={styles.selectField}
                                >
                                    {sources.map((source) => (
                                        <MenuItem key={source.key} value={source.key}>
                                            {source.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.source && errors.source && <FormHelperText error>{errors.source}</FormHelperText>}
                            </div>

                            <div className={styles.formGroup}>
                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select
                                    id="category"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    error={touched.category && Boolean(errors.category)}
                                    className={styles.selectField}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                            </div>

                            <div className={styles.formGroup}>
                                <InputLabel htmlFor="author">Authors</InputLabel>
                                <Select
                                    id="author"
                                    name="author"
                                    value={values.author}
                                    onChange={handleChange}
                                    error={touched.author && Boolean(errors.author)}
                                    className={styles.selectField}
                                >
                                    {authors.map((author) => (
                                        <MenuItem key={author} value={author}>
                                            {author}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.author && errors.author && <FormHelperText error>{errors.author}</FormHelperText>}
                            </div>

                            {isPreferenceUpdating ? (
                                 <Button type="button" disabled className={styles.loadingButton}>Saving...</Button>
                            ) : (
                                <Button type="submit" className={styles.saveButton}>Save Preference</Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </HelmetProvider>
    );
}

export default NewsFeedSetting;
