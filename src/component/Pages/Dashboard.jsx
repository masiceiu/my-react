import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Dashboard1 from "./Dashboard1";
import { FaSearch } from "react-icons/fa";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Dashboard4 from "./Dashboard4";


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const photo = user?.photoURL;
  //console.log(photo);
  //const [searchdata, setSearchData] = useState([]);
  //const searchRef = useRef(null);
  const [active, setActive] = useState(false); // Initialize active as false

  // const [search, setSearch] = useState('');
  // useEffect(() => {
  //   fetch(`http://localhost:5000/users?search=${search}`)
  //     .then((res) => res.json())
  //     .then((data) => setSearchData(data));
  // }, [search]);

 // const handleSearch = () => {
    // console.log(searchRef.current.value)
    // setSearch(searchRef.current.value)
 // };

  return (
    <Container fluid>
      <Row style={{ height: "70px" }} className="d-flex align-items-center bg-light ">
        <Col sm={12} className="mx-auto">
           <div>
            <div style={{ flexDirection: 'row-reverse' }} className="d-flex me-5 ">
              <i onClick={() => setActive(!active)} className="fa-solid fa-ellipsis-vertical align-items-center mt-2 ms-3"></i>

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

      <Dashboard3 />
    </Container>
  );
};

export default Dashboard;

