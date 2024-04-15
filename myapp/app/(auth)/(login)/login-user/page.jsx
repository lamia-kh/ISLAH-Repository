"use client";
import Image from "react-bootstrap";
import "@/public/css/all.css/style.css";
import Link from "next/link";
import { useState } from "react";
import { resolve } from "styled-jsx/css";

export default function login() {
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      ...userData,
      rememberMe: userData.rememberMe,
    });
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        const data = await res.json();
        alert("تم تسجيل الدخول");
        setIsSubmitted(true); // Set submission status to true upon success
        setSubmitError(""); // Clear any previous errors
      } else if (res.status === 401) {
        // Handle specific error for phone number already in use
        const errorMessage = await res.text();
        setSubmitError(errorMessage);
      } else if (res.status === 400) {
        // Handle specific error for phone number already in use
        const errorMessage = await res.text();
        setSubmitError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      setSubmitError(error.message || "An error occurred. Please try again."); // Set the error message
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#fff" }}
        >
          <div className="featured-image mb-3">
            <img
              src="assets/imgs/logoo.png_transparent_Plan de travail 1.png"
              className="img-fluid"
              style={{ width: "250px" }}
            />
          </div>
          <p
            className="text-success fs-2"
            style={{
              fontFamily:
                "'font-family: IBM Plex Sans Arabic;', Courier, monospace",
              fontWeight: 600,
            }}
          >
            إصلاح
          </p>
          <small
            className="text-dark text-wrap text-center"
            style={{
              width: "17rem",
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            إنضم إلينا
          </small>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4 d-flex flex-row-reverse">
                <h2>مرحبًا مرة أخرى</h2>
              </div>

              <div className="input-group mb-3">
                <input
                  type="phoneNumber"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-light fs-6 text-end"
                  placeholder="رقم الهاتف"
                  required
                />
              </div>

              <div className="input-group mb-1">
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-light fs-6 text-end"
                  placeholder="كلمة المرور"
                  required
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={userData.rememberMe}
                    onChange={() =>
                      setUserData({
                        ...userData,
                        rememberMe: !userData.rememberMe,
                      })
                    }
                  />
                  <label
                    htmlFor="rememberMe"
                    className="form-check-label text-secondary"
                  >
                    <small>تذكرني</small>
                  </label>
                </div>
                <div className="forgot">
                  <small>
                    <Link className="link-success" href="/login/Reset_password">
                      هل نسيت كلمة المرور؟
                    </Link>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  className="btn btn-lg btn-success w-100 fs-6"
                  type="submit"
                >
                  تسجيل الدخول
                </button>
                {isSubmitted ? (
                  <div className="alert alert-success" role="alert">
                    تم تسجيل الدخول
                    <Link href="/">الرئيسية</Link>.
                  </div>
                ) : submitError ? (
                  <div className="alert alert-danger" role="alert">
                    {submitError}
                  </div>
                ) : null}
              </div>

              <div className="row">
                <small>ليس لديك حساب؟ </small>
                <Link className="link-success" href="/sign">
                  register
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
