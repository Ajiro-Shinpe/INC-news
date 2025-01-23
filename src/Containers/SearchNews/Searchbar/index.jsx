import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CustomDatePicker from "../../../Components/CustomDatePicker";
import React, { useEffect, useState } from "react";
import { categories, sources } from "../../../constant/newsApiConstant";
import { getNewsAPIArticles } from "../../../stores/NewsApi/actions";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.scss"; // Import SCSS Module

function Searchbar({ page }) {
  const pageSize = 12;
  const dispatch = useDispatch();

  const onSubmit = () => {
    searchArticles();
  };

  const searchArticles = () => {
    let url = `source=${encodeURIComponent(
      values?.source
    )}&keyword=${encodeURIComponent(
      values?.keyword
    )}&category=${encodeURIComponent(
      values?.category ?? ""
    )}&pageSize=${pageSize}&page=${page}`;
    if (values?.dateFrom && values?.dateTo) {
      let date1 = new Date(values.dateFrom);
      let dateFrom = `${date1.getFullYear()}-${
        date1.getMonth() + 1
      }-${date1.getDate()}`;

      let date2 = new Date(values.dateTo);
      let dateTo = `${date2.getFullYear()}-${
        date2.getMonth() + 1
      }-${date2.getDate()}`;
      url += `&fromDate=${dateFrom}&toDate=${dateTo}`;
    }
    dispatch(getNewsAPIArticles(url));
  };

  const { values, setValues, touched, errors, handleSubmit } = useValidator({
    initialValues: {
      keyword: "",
      source: "",
      dateFrom: "",
      dateTo: "",
      category: "",
    },
    validationSchema: Yup.object().shape({
      keyword: Yup.string().required("Please write keyword"),
      source: Yup.string().required("Select Source."),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (page && values?.source && values?.keyword) {
      searchArticles();
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={`${styles.box} primary-bg`}>
        <div className={styles["grid-item"]}>
          <h2>Search article</h2>
        </div>
        <form noValidate>
          <div className="grid-container">
            <div className={styles["grid-item"]}>
            <label htmlFor="query">Search query</label>
              <input
              id="query"
                type="text"
                placeholder="Enter query for search"
                className={styles["text-field"]}
                required
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
              {touched.keyword && errors.keyword && (
                <span className={styles["helper-text"]}>{errors.keyword}</span>
              )}
            </div>

            <div className={styles["grid-item"]}>
            <label htmlFor="source-select">Source</label>
              <select
                id="source-select"
                className={styles["select-field"]}
                required
                value={values.source}
                onChange={(e) =>
                  setValues({ ...values, source: e.target.value })
                }
              >
                <option value="">Select Source</option>
                {sources.map((source, index) => (
                  <option key={index} value={source.key}>
                    {source.value}
                  </option>
                ))}
              </select>
              {touched.source && errors.source && (
                <span className={styles["helper-text"]}>{errors.source}</span>
              )}
            </div>
            <div className={styles["grid-item"]}>
              <h4>Below are Optionals</h4>
              </div>
            <div className={styles["grid-item"]}>
              <label htmlFor="date-from">Date from</label>
              <input
                type="date"
                id="date-from"
                placeholder="date from"
                className={styles["date-picker"]}
                value={values.dateFrom}
                onChange={(e) =>
                  setValues({ ...values, dateFrom: e.target.value })
                }
              />
            </div>
            <div className={styles["grid-item"]}>
            <label htmlFor="date-to">Date to</label>
              <input
                type="date"
                id="date-to"
                className={styles["date-picker"]}
                value={values.dateTo}
                onChange={(e) =>
                  setValues({ ...values, dateTo: e.target.value })
                }
              />
            </div>

            <div className={styles["grid-item"]}>
            <label htmlFor="category-select">Category</label>
                <select
                  id="category-select"
                  className={styles['select-field']}
                  value={values.category}
                  onChange={(e) => setValues({ ...values, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))
                  ) : (
                    <option value="">No categories available</option>
                  )}
                </select>
              </div>

            <div className={styles["grid-item"]}>
              <button
                type="submit"
                className={styles["search-button"]}
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Searchbar;
