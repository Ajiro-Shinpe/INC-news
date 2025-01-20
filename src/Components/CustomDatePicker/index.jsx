import {TextField} from "@mui/material";
import React from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function CustomDatePicker({value, dateLabel, onChange}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={dateLabel}
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} error={false} fullWidth/>}
            inputFormat="DD-MM-YYYY"

        />
        </LocalizationProvider>
    )
}

export default CustomDatePicker;