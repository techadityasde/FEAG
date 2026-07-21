"use client";
import React, { useState, useEffect } from "react";
import "./style.css";

interface Formdata {
  first: string;
  last: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  gender: string;
}
const RegistrationForm = () => {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Form submitted");
    console.log(Formdata);
  }
  const [showPass, setShowPass] = useState(false);
  function showPassword() {
    setShowPass(!showPass);
  }
  const [Formdata, setFormdata] = useState<Formdata>({
    first: "",
    last: "",
    email: "",
    phone: 0,
    password: "",
    confirmPassword: "",
    gender: "",
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          padding: "20px",
          width: "450px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Registration Form</h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label htmlFor="First Name">First Name:</label>
              <br />
              <input
                type="text"
                id="First Name"
                value={Formdata.first}
                onChange={(e) =>
                  setFormdata({ ...Formdata, first: e.target.value })
                }
                style={{ border: "1px solid black", borderRadius: "5px" }}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="Last Name">Last Name:</label>
              <br />
              <input
                type="text"
                id="Last Name"
                value={Formdata.last}
                onChange={(e) =>
                  setFormdata({ ...Formdata, last: e.target.value })
                }
                style={{ border: "1px solid black", borderRadius: "5px" }}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            value={Formdata.email}
            onChange={(e) =>
              setFormdata({ ...Formdata, email: e.target.value })
            }
            style={{
              border: "1px solid black",
              width: "100%",
              borderRadius: "5px",
            }}
            placeholder="Enter your email"
          />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <br />
              <input
                type="tel"
                id="phone"
                value={Formdata.phone}
                onChange={(e) =>
                  setFormdata({ ...Formdata, phone: Number(e.target.value) })
                }
                style={{ border: "1px solid black", borderRadius: "5px" }}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <br />
              <select
                id="gender"
                value={Formdata.gender}
                onChange={(e) =>
                  setFormdata({ ...Formdata, gender: e.target.value })
                }
                style={{ border: "1px solid black", borderRadius: "5px" }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type={showPass ? "text" : "password"}
            id="password"
            value={Formdata.password}
            onChange={(e) =>
              setFormdata({ ...Formdata, password: e.target.value })
            }
            style={{
              border: "1px solid black",
              width: "100%",
              borderRadius: "5px",
            }}
            placeholder="Enter your password"
          />
          <br />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => showPassword()}
              style={{ fontSize: "12px" }}
            >
              Show password
            </button>
          </div>
          <br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            value={Formdata.confirmPassword}
            onChange={(e) =>
              setFormdata({ ...Formdata, confirmPassword: e.target.value })
            }
            style={{
              border: "1px solid black",
              width: "100%",
              borderRadius: "5px",
            }}
            placeholder="Confirm your password"
          />
          {Formdata.password !== Formdata.confirmPassword && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Passwords do not match
            </p>
          )}
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              style={{
                border: "1px solid black",
                width: "100px",
                height: "30px",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
