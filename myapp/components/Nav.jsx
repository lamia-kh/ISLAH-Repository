"use client";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/all.css/style.css";
import { Button } from "react-bootstrap";
import useAuth from "../components/useAuth";
import { useEffect, useState } from "react";

function Nav() {
  const isAuthenticated = useAuth();

  return (
    <nav className="navbar navbar-expand-sm  fixed-top">
      <div className="container-fluid d-flex flex-row-reverse">
        <Link className="nav-link" href="/">
          <Image
            src="/imgs/logoo.png_transparent_Plan de travail 1.png"
            alt="Logo"
            width={60}
            height={80}
          />
          <span>إصلاح</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainmenu"
          aria-controls="mainmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="  collapse navbar-collapse ms-auto" id="mainmenu">
          <ul className=" navbar-nav me-auto ">
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                <Button variant="outline-success">ggg</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <Button variant="outline-success">ttt</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <Button variant="outline-success">sdsdsdg</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <Button variant="outline-success">kkkkk</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <Button variant="outline-success">kkkkk</Button>
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link href="/profile" className="nav-link">
                    <Button variant="outline-success">Profile</Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/logout" className="nav-link">
                    <Button variant="outline-success">Logout</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
