import React, { useContext } from "react";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Header } from "antd/lib/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../services/auth-context";

const NavBar = props => {
    let authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = (e) => {
        authContext.logout();
       // navigate('/signin')
    }

    return (
        <div className="header">
           <Link to="/"> <div className="logo" /> </Link>
           {authContext.isLoggedIn && <a className="nav-item">{authContext.user && authContext.user['dhp_id']}</a>}
            <ul className="navbar">
              {authContext.isLoggedIn &&  <li className="nav-item"><Button type="danger" onClick={onLogout} size="middle">logout </Button> </li> }
            </ul>
        </div>

    )
}

export default NavBar;