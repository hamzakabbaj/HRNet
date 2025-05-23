import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import styles from "./HomeTemplate.module.scss";
import logo from "@/assets/img/logo-health-wealth.png";

const HomeTemplate = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <img
          src={logo}
          alt="HRnet Logo"
          className={styles.container__header__logo}
        />
        <h1 className={styles.container__header__title}>HRnet</h1>
      </div>
      <div className={styles.container__cards}>
        <Link to="/create-employee" className={styles.container__cards__card}>
          <FontAwesomeIcon
            icon={faUserPlus}
            className={styles.container__cards__card__icon}
          />
          <h2>Create Employee</h2>
          <p>Add a new employee to the database</p>
        </Link>
        <Link to="/employee-list" className={styles.container__cards__card}>
          <FontAwesomeIcon
            icon={faUsers}
            className={styles.container__cards__card__icon}
          />
          <h2>View Employees</h2>
          <p>View and manage existing employees</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeTemplate;
