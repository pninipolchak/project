import { useSelector } from "react-redux";
import AdminNavBar from "./features/user/AdminNavBar";
import GuestNavBar from "./features/user/GuestNavBar";
import UserNavBar from "./features/user/UserNavBar";

const NavBar = () => {
    let currentUser = useSelector(state => state.user.currentUser);

    return (<div>
        {!currentUser && <GuestNavBar />}
        {currentUser && currentUser.role == 'ADMIN' && <AdminNavBar name={currentUser.userName} />}
        {currentUser && currentUser.role == 'USER' && <UserNavBar name={currentUser.userName} />}
    </div>);
}

export default NavBar;