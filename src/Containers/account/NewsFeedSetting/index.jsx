import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { categories, authors, sources } from '../../../constant/newsApiConstant';
import { userPreference, userPreferenceSave } from "../../../stores/Auth/actions";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
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
        handleChange
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
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <h5 className={styles.cardTitle}>News Feed Setting</h5>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={styles.formGroup}>
                                <label htmlFor="source">Source</label>
                                <select
                                    id="source"
                                    name="source"
                                    value={values.source}
                                    onChange={handleChange}
                                    className={styles.selectField}
                                >
                                    {sources.map((source) => (
                                        <option key={source.key} value={source.key}>
                                            {source.value}
                                        </option>
                                    ))}
                                </select>
                                {touched.source && errors.source && <span className={styles.errorText}>{errors.source}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    className={styles.selectField}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {touched.category && errors.category && <span className={styles.errorText}>{errors.category}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="author">Authors</label>
                                <select
                                    id="author"
                                    name="author"
                                    value={values.author}
                                    onChange={handleChange}
                                    className={styles.selectField}
                                >
                                    {authors.map((author) => (
                                        <option key={author} value={author}>
                                            {author}
                                        </option>
                                    ))}
                                </select>
                                {touched.author && errors.author && <span className={styles.errorText}>{errors.author}</span>}
                            </div>

                            {isPreferenceUpdating ? (
                                <button type="button" disabled className={styles.loadingButton}>Saving...</button>
                            ) : (
                                <button type="submit" className={styles.saveButton}>Save Preference</button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}

export default NewsFeedSetting;
