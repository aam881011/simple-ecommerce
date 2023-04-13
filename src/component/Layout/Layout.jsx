import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import Navigation from "./../Navigation/Navigation";
// import { Container} from "react-bootstrap";
// import Slider from "../Slider/Slider";

export default function Layout() {
  return (
    <>
      <Navigation />
      {/* <Slider /> */}
      {/* <Container> */}
        <Outlet></Outlet>
      {/* </Container> */}
      <Footer />
    </>
  );
}
