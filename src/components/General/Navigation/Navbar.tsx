import { Redirect } from "react-router-dom";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navbar as NavbarBS } from "react-bootstrap";
// REDUX
import { useAppDispatch } from "../../../app/state/hooks/userHook";
import { logout as logoutRedux } from "../../../app/state/slices/userSlice";

// ASSETS
import DeliveryTruck from "../../../assets/img/delivery2.png";
import { INavbar } from "./INavbar";
import { SCNavbar } from "./styles";
import { Link } from "../..";

import { logout } from "../../../api";

export const Navbar: React.FC<INavbar> = ({ children }: INavbar) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logout().then((response) => {
      if (response) {
        dispatch(logoutRedux());
      }
    });
    return <Redirect to="/" />;
  };

  return (
    <SCNavbar collapseOnSelect expand="lg">
      <div className="container-fluid">
        <Link className="navbar-brand" color="primary" to="/">
          <img src={DeliveryTruck} alt="logo" width="50" height="24" />
        </Link>
        <NavbarBS.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBS.Collapse id="responsive-navbar-nav">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {children}
          </ul>
          <IconButton
            size="large"
            aria-label="logout"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => handleLogout()}
          >
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </NavbarBS.Collapse>
      </div>
    </SCNavbar>
  );
};
