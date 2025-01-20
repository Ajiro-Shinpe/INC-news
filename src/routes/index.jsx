import WebLayout from "../Containers/WebLayout";
import {Route, Routes} from "react-router";
import Home from "../Containers/Home";
import Login from "../Containers/Auth/Login";
import Register from "../Containers/Auth/Register";
import Profile from "../Containers/account/Profile";
import Account from "../Containers/account";
import NewsFeedSetting from "../Containers/account/NewsFeedSetting";
import SearchNews from "../Containers/SearchNews";

export default function MainRouter() {
    return (
        <Routes>
            <Route element={<WebLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/news-search" element={<SearchNews/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/account" element={<Account/>}>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="newsfeed" element={<NewsFeedSetting/>}/>
                </Route>
            </Route>
        </Routes>
    )
}
