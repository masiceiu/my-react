

import { Navigate, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation()
    if(loading){
        return <div className="d-flex justify-content-center ">
        <div className="spinner-border" role="status">
        </div>
      </div>
    }
    if(user?.email){
        return children;
    }
    return <Navigate to ='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRouter;