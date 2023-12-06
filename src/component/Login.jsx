import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Provider/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { error }, reset } = useForm();
    const { login, user } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/dashboard';

    // Check if the user is already authenticated
    if (user) {
        // Redirect to the dashboard if the user is logged in
        navigate('/dashboard', { replace: true });
        return null; // Render nothing, as the user is already redirected
    }

    const onSubmit = (data) => {
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                navigate("/dashboard", { replace: true });
            });
    }

    return (
        <Container>
            <Row>
                <Col sm={7} className='mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" {...register("email")} required autoFocus />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control " placeholder="Password" {...register("password")} required />
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <p className='mt-3 text-center'>If you don't have an account, please <Link to='/reg'>Register</Link></p>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
