import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";

const Register = () => {
  const { newUser, user } = useContext(AuthContext)
  const { register, handleSubmit, formState: { error },reset } = useForm();


  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/dashboard';
  //email, password, username, useUrl,mobile,Address
  const onSubmit = data => {

    newUser(data.email, data.password, data.username, data.useUrl, data.mobile, data.address)
    reset()
    navigate(from, { replace: true });
  }
 
  //console.log(user)
  return (
    <Container>

      <Row>
        <Col md={7} className="mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className='p-4 mt-5 '>
          <h1 className="h3 mb-3 font-weight-normal">Please Registration</h1>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
              <input placeholder="Enter Your Name" type="text" className='p-2 form-control ' {...register("username")} />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-phone"></i></span>
              <input type="text" placeholder="Enter Your Mobile Number" className='p-2 form-control ' {...register("mobile")} />

            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-image"></i></span>
              <input type="text" placeholder="Enter your PhotoURL" className='p-2 form-control ' {...register("useUrl")} />

            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-location-dot"></i></span>
              <input type="text" placeholder="Enter your Address" className='p-2 form-control ' {...register("address")} />

            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
              <label for="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="inputEmail" className="form-control" placeholder="Email address"  {...register("email")} required="" autofocus="" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
              <input type="password" placeholder='password' className='p-2 form-control ' {...register("password", { pattern: { value: /^(?=.*[A-Z]).+$/, message: 'Last name must only contain letters (A-Z).' } })} />

            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
              <input type="password" placeholder='Confirm password' className='p-2 form-control ' />

            </div>

            
            
            <div className="mx-auto text-center">

              <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Registration</button>
            </div>
            <p className='mt-3 text-center'>If you have any Account please <Link to='/login'>Login</Link></p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
