import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectToken } from "../../Redax/Auth/selectors/Selectors";

const PrivateRoute = ({ component, redirectTo }) => {
    const token = useSelector(selectToken);
    
    return token ? component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
