import React, { useContext,useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import DashboardChild from "./DashboardChild";


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const photo = user?.photoURL;
  const [active, setActive] = useState(false); 
  return (
    <Container fluid>
      <Row style={{ height: "70px" }} className="d-flex align-items-center bg-light ">
        <Col sm={12} className="mx-auto">
           <div>
            <div style={{ flexDirection: 'row-reverse' }} className="d-flex me-5 ">
             <button class="btn btn-link" onClick={() => setActive(!active)}> 
             <i className="fa-solid fa-ellipsis-vertical"></i>
             </button>

              {active && ( // Conditionally render the logout button based on the 'active' state
                <Button variant="light">
                  {user?.email ? (
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/' onClick={() => logout()}>Logout</Link>
                  ) : (
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/login'>Login</Link>
                  )}
                </Button>
              )}

              {user && <div className='size_of_img' >
                <img src={photo} title={user?.displayName} id="t-4" style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
              </div>}
            </div>
          </div> 


         
        </Col>
      </Row>

      <DashboardChild />
    </Container>
  );
};

export default Dashboard;

