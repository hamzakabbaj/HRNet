import React from "react";
import styles from "./CreateEmployeeTemplate.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedState } from "@/features/States/statesSlice";
import DatePicker from "@/components/elements/DatePicker";
import SelectMenu from "@/components/elements/SelectMenu";

const CreateEmployeeTemplate = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states.states);
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("");

  const departmentOptions = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

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
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={setDateOfBirth}
          />
        </div>
        <div className={styles.container__form__input}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
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
            <div className={styles.container__form__input}>
              <SelectMenu
                label="State"
                options={states.map((state) => state.name)}
                value={selectedState}
                onChange={setSelectedState}
              />
            </div>
            <div className={styles.container__form__input}>
              <label htmlFor="zip-code">Zip Code</label>
              <input type="text" id="zip-code" name="zip-code" />
            </div>
          </fieldset>
        </div>
        <div className={styles.container__form__input}>
          <SelectMenu
            label="Department"
            options={departmentOptions}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEmployeeTemplate;
