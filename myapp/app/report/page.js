"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../hook/useAuth";

function Report() {
  const { isLoggedIn } = useAuth(); // Ensuring useAuth provides isLoggedIn correctly

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 p-5">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        {isLoggedIn() ? (
          <>
            <div
              className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column right-box"
              style={{ background: "#fff" }}
            >
              <p
                className="text-success fs-2"
                style={{
                  fontFamily: '"IBM Plex Sans Arabic", Courier, monospace',
                  fontWeight: 600,
                }}
              >
                إبلاغ
              </p>
            </div>
            <div className="col-md-6 left-box py-2">
              <div
                className="row align-items-center"
                style={{ direction: "rtl" }}
              >
                <div className="header-text mb-4">
                  <h2>بلغ و شارك في إيجاد الحلول</h2>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-control form-control-lg bg-light fs-6"
                    id="problemType"
                    name="problemType"
                    required
                  >
                    <option value>الجهات المعنية</option>
                    <option value="option1">سونالغاز</option>
                    <option value="option2">الجزائرية للمياه</option>
                    <option value="option3">الديوان الوطني للتطهير</option>
                    <option value="option1">إتصالات الجزائر</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="url"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="الموقع"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="أضف صورة"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <textarea
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="الوصف"
                    rows={3}
                    defaultValue={""}
                  />
                </div>
                <div className="input-group mb-3">
                  <button className="btn btn-lg btn-success w-100 fs-6">
                    تأكيد{" "}
                  </button>
                </div>
                <div className="row">
                  <small>
                    ليس لديك حساب؟{" "}
                    <a className="link-success" href="#">
                      سجل
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10 col-md-10 ">
                <div className="border rounded-5 p-3 p-lg-5 bg-white text-center shadow">
                  <h2>يجب تسجيل الدخول للإبلاغ عن المشكل</h2>
                  <div className="featured-image mb-3">
                    <img
                      src="assets/imgs/pagevide.svg"
                      className="img-fluid"
                      alt="Description"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                  <div>
                    <small>
                      {" "}
                      ليس لديك حساب ,{" "}
                      <Link className="link-success" href="/login-user">
                        {" "}
                        سجل من هنا
                      </Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
