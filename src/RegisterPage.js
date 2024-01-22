import React, { useState } from 'react'
import './RegisterPage.css'
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = (props) => {
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        name: { required: false },
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let user_records = new Array();
        user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
        let errors = initialStateErrors
        var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputs.name == "") {
            errors.name.required = true;
        }
        if (inputs.email == "") {
            errors.email.required = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
        }
        setErrors(errors);

        if (user_records.some((e) => {
            return e.email == inputs.email
        })) {
            alert("You have already sign in, Move to login page");
            return navigate("/LoginPage")
        }
        else if ((inputs.name !== "") && (emailFormat.test(inputs.email)) && (inputs.password !== "")) {
            user_records.push({
                "name": inputs.name,
                "email": inputs.email,
                "password": inputs.password
            })
            localStorage.setItem("users", JSON.stringify(user_records))

            return navigate("/LoginPage")
        }
    }

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <section className="register-block">
                <div className="container">
                    <div className="row ">
                        <div className="col register-sec">
                            <h2 className="text-center">Register Now</h2>
                            <form onSubmit={handleSubmit} className="register-form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>

                                    <input type="text" className="form-control"
                                        onChange={handleInput}
                                        name="name" id="" />
                                    {errors.name.required ?
                                        (<span className="text-danger" >
                                            Name is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>

                                    <input type="text" className="form-control"
                                        onChange={handleInput}
                                        name="email" id="" />
                                    {errors.email.required ?
                                        (<span className="text-danger" >
                                            Email is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" type="password"
                                        onChange={handleInput}
                                        name="password" id="" />
                                    {errors.password.required ?
                                        (<span className="text-danger" >
                                            Password is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-login float-right"
                                    >Register</button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group">
                                    Already have account ? Please
                                    <Link to="/LoginPage">Login</Link>
                                </div>


                            </form>


                        </div>

                    </div>


                </div >
            </section >
        </div >
    )
}

export default RegisterPage;