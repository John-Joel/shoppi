import './LoginPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = (props) => {
    const navigate = useNavigate();
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let user_record = new Array();
        user_record = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
        let errors = initialStateErrors;

        if (inputs.email == "") {
            errors.email.required = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
        }
        setErrors({ ...errors });
        if (user_record.some((v) => {
            return (v.email == inputs.email) && (v.password == inputs.password)
        })) {
            alert("success")
            let current_user = user_record.filter((v) => {
                return v.email == inputs.email && v.password == inputs.password
            })[0]

            localStorage.setItem("name", current_user.name);
            localStorage.setItem("email", current_user.email);
            return navigate("/")
        }
        else {
            alert("login fails");
        }
    }
    return (
        <div>
            <section className="login-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={handleSubmit} className="login-form" action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="email" className="form-control" onChange={handleInput} name="email" id="" placeholder="email" />
                                    {errors.email.required ?
                                        (<span className="text-danger" >
                                            Email is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" type="password" onChange={handleInput} name="password" placeholder="password" id="" />
                                    {errors.password.required ?
                                        (<span className="text-danger" >
                                            Password is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-login float-right" >
                                        Login</button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group">
                                    Create new account ? Please
                                    <Link to="/RegisterPage">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default LoginPage;