import { Helmet, HelmetProvider } from "react-helmet-async";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'; 
import PowerSettingsNewIconOutlined from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logout } from "../../../stores/Auth/actions";
import styles from './Profile.module.scss'; 

function Profile() {
    const { user } = useSelector(state => state?.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const callLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (

        <HelmetProvider>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <div className={styles['profile-container']}> 
          <div className={styles['profile-card']}>
            <div className={styles['card-content']}>
              <h2 className={styles['profile-title']}>
                Account Information
                <h5 className={styles['profile-subtitle']}>
                  Welcome {user?.name}
                </h5>
              </h2>
              <ul className={styles['profile-list']}>
                <li>
                  <Link to="/news-search" className={styles['list-item']}>
                    <HomeIconOutlined className={styles['list-icon']} />
                    <span>Search News</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account/newsfeed" className={styles['list-item']}>
                    <SettingsSuggestOutlinedIcon className={styles['list-icon']} />
                    <span>News Feed Setting</span>
                  </Link>
                </li>
                <li>
                  <button onClick={callLogout} className={styles['list-item']}>
                    <PowerSettingsNewIconOutlined className={styles['list-icon']} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </HelmetProvider>
    );
}

export default Profile;
