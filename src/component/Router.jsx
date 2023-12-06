import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Pages/Dashboard";
import Dashboard1 from "./Pages/Dashboard1";
import SingleInformation from "./Pages/SingleInformation";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/dashboard",
       element:<PrivateRouter><Dashboard/></PrivateRouter> 
        //element:<Dashboard/>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/reg",
        element:<Register/>
      },
      
    ],
  },
]);
export default router;