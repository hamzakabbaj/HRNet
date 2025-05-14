import React from "react";
import styles from "./CreateEmployeeTemplate.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedState } from "@/features/States/statesSlice";
const CreateEmployeeTemplate = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states.states);
  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        <h1>HRnet</h1>
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
      </div>

      <form action="" className={styles.container__form}>
        <div className={styles.container__form__input}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>
        <div className={styles.container__form__input}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
        <div className={styles.container__form__input}>
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input type="text" id="date-of-birth" name="date-of-birth" />
        </div>
        <div className={styles.container__form__input}>
          <label htmlFor="start-date">Start Date</label>
          <input type="text" id="start-date" name="start-date" />
        </div>
        <div className={styles.container__form__address}>
          <fieldset>
            <legend>Address</legend>

            <div className={styles.container__form__input}>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" name="street" />
            </div>
            <div className={styles.container__form__input}>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </div>
            <div className={styles.container__form__selectbox}>
              <label htmlFor="state">State</label>
              <select id="state" name="state">
                {states.map((state) => (
                  <option key={state.abbreviation} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.container__form__input}>
              <label htmlFor="zip-code">Zip Code</label>
              <input type="text" id="zip-code" name="zip-code" />
            </div>
          </fieldset>
        </div>
        <div className={styles.container__form__input}>
          <label htmlFor="department">Department</label>
          <select id="department" name="department">
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEmployeeTemplate;
