import React from "react";
import styles from "./MainTemplate.module.scss";
import { Outlet } from "react-router-dom";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
const MainTemplate = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainTemplate;
