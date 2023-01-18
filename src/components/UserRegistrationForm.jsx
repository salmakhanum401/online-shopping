import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    firstName: "",
    lastName: "",
    gender: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
};

const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



const UserRegistrationForm = () => {
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState(initialState);

    const [registerComplete, setRegistrationComplete] = useState(false);
    
    
    const checkEmail = (email) => email.match(emailRegex);

    const onUserInputChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onInputFocus = (e) => {
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const onSubmit = () => {
        user.firstName ||
            setError((prev) => ({ ...prev, firstName: "First Name is required" }));
        user.lastName ||
            setError((prev) => ({ ...prev, lastName: "Last Name is required" }));
        user.gender ||
            setError((prev) => ({ ...prev, gender: "gender is required" }));
        user.emailId ||
            setError((prev) => ({ ...prev, emailId: "emailId is required" }));
        user.password ||
            setError((prev) => ({ ...prev, password: "password is required" }));
        user.confirmPassword ||
            setError((prev) => ({
                ...prev,
                confirmPassword: "confirmPassword is required",
            }));
        user.phoneNumber ||
            setError((prev) => ({
                ...prev,
                phoneNumber: "phoneNumber is required ",
            }));

        if(user.password !== user.confirmPassword){
            setError((prev) => ({ ...prev, confirmPassword: "confirm password should be same as password" }));
        }

        if (!user.emailId) {
            setError((prev) => ({ ...prev, emailId: "Email Id is required " }));
        } else if (!checkEmail(user.emailId)) {
            setError((prev) => ({
                ...prev,
                emailId: "Please enter vaild Email Id ",
            }));
        }

        if (
            user.firstName &&
            user.lastName &&
            user.gender &&
            user.password &&
            user.confirmPassword &&
            user.phoneNumber &&
            user.emailId &&
            checkEmail(user.emailId)
        ) {
            axios.post(`${process.env.REACT_APP_API_URL}/users`, user)
            .then(data=> {
                setRegistrationComplete(true);
            })
        }
    };

    return (
        !registerComplete ? <div className="page-center-align top-70">
            <h1>User Registration</h1>
            <div>
                <label className="form-label mb-0 mt-2">
                    First Name <sup className="required">*</sup>
                </label>
                <input
                    className="form-control"
                    name="firstName"
                    value={user.firstName}
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <div className="error">{error.firstName}</div>
            </div>
            <div>
                <label className="form-label mb-0 mt-2">
                    Last Name <sup className="required">*</sup>{" "}
                </label>
                <input
                    className="form-control"
                    name="lastName"
                    value={user.lastName}
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <div className="error">{error.lastName}</div>
            </div>
            <div>
                <label className="form-label mb-0 mt-2 d-block">
                    {" "}
                    Gender <sup className="required">*</sup>{" "}
                </label>
                <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <label className="form-label mb-0 mt-2 me-2 ms-1" for="male">Male</label>
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <label className="form-label mb-0 mt-2 me-2 ms-1" for="female">Female</label>
                <input
                    type="radio"
                    name="gender"
                    value="Others"
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <label className="form-label mb-0 mt-2 me-2 ms-1" for="Other">Others</label>
                <div className="error">{error.gender}</div>
            </div>

            <div>
                <label className="form-label mb-0 mt-2">
                    Email Id <sup className="required">*</sup>
                </label>
                <input
                    className="form-control"
                    name="emailId"
                    value={user.emailId}
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <div className="error">{error.emailId}</div>
            </div>

            <div>
                <label className="form-label mb-0 mt-2">
                    Password <sup className="required">*</sup>
                </label>
                <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <div className="error">{error.password}</div>
            </div>

            <div>
                <label className="form-label mb-0 mt-2">
                    Confirm Password <sup className="required">*</sup>
                </label>
                <input
                    className="form-control"
                    name="confirmPassword"
                    type="password"
                    value={user.confirmPassword}
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <div className="error">{error.confirmPassword}</div>
            </div>

            <div>
                <label className="form-label mb-0 mt-2">
                    phoneNumber <sup className="required">*</sup>
                </label>
                <input
                    className="form-control"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={onUserInputChange}
                    onFocus={onInputFocus}
                />
                <div className="error">{error.phoneNumber}</div>
            </div>

            <div>
                <label className="form-label mb-0 mt-2"> Address : </label>
                <textarea
                    className="form-control"
                    name="address"
                    value={user.address}
                    onChange={onUserInputChange}
                />
                <div className="address">{error.address}</div>
            </div>
            <div>
                <button className="btn btn-primary  mt-2" onClick={onSubmit}>Submit</button>
            </div>
            <div>
                Already have an account?<Link to="/LoginPage"> Login Here.</Link>
            </div>
        </div> : <div className="page-center-align">
                Registration Complete. Please<Link to="/LoginPage"> Login Here.</Link>
            </div>
    );
};

export default UserRegistrationForm;
