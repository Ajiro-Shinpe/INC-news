import React from "react";
import {Box, Grid, InputAdornment, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CustomDatePicker from "../CustomDatePicker";

function SearchBar(props) {
    const {values, setValues, handleSubmit} = props

    return (
        <Container sx={{my: 2}}>
            <Box sx={{flexGrow: 1}}>
                <Grid item sm={12} sx={{pb: 1}}>
                    <Typography component="h2" variant="h5">
                        Search article from {props.source}
                    </Typography>
                </Grid>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                placeholder="Enter a keyword for search article"
                                value={values.keyword}
                                onChange={(e) => setValues({...values, keyword: e.target.value})}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomDatePicker
                                values={values}
                                value={values.dateFrom}
                                onChange={(newValue) => {
                                    setValues({...values, dateFrom: newValue});
                                }}
                                setValues={setValues}
                                dateLabel="Date from"

                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomDatePicker
                                values={values}
                                value={values.dateTo}
                                onChange={(newValue) => {
                                    setValues({...values, dateTo: newValue});
                                }}
                                setValues={setValues}
                                dateLabel="Date to"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button type="submit" variant="contained" size="large" color="warning" sx={{py: 2}}
                                    fullWidth>Search</Button>
                        </Grid>


                    </Grid>
                </form>

            </Box>
        </Container>
    )
}

export default SearchBar;