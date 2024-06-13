import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const  PrivateRoute = ({ children }) => {

    let currentUser = useSelector(state => state.user.currentUser);
    if (currentUser) {
        const isAuthenticated = currentUser.role == 'ADMIN' ? true : false;
        
        if (isAuthenticated) {
            return children
        }
    }
    
      
    return <Navigate to="/loveFlower" />
}
export default PrivateRoute;