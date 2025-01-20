// src/hoc/withAuth.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const withAuth = (Component) => {
    return (props) => {
        const {
            isAuthenticated
        } = useSelector(state => state?.AuthReducer);

        const navigate = useNavigate();

            useEffect(() => {
                if (!isAuthenticated) {
                    navigate('/login');
                }
            }, [isAuthenticated, navigate]);

        return isAuthenticated ? <Component {...props} /> : null;
    };
};

export default withAuth;
