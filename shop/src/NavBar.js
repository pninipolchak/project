import { useSelector } from "react-redux";
import AdminNavBar from "./features/user/AdminNavBar";
import GuestNavBar from "./features/user/GuestNavBar";
import UserNavBar from "./features/user/UserNavBar";
import { Outlet } from "react-router-dom";

const NavBar = () => {
    let currentUser = useSelector(state => state.user.currentUser);

    return (<>
        <nav>
        {!currentUser && <GuestNavBar />}
        {currentUser && currentUser.role == 'ADMIN' && <AdminNavBar name={currentUser.userName} />}
        {currentUser && currentUser.role != 'ADMIN' && <UserNavBar name={currentUser.userName} />}
        </nav>
        <Outlet/>
    </>);
}

export default NavBar;