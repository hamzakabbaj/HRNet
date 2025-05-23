import React from "react";
import styles from "./CreateEmployeeTemplate.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedState } from "@/features/States/statesSlice";
import { addEmployee } from "@/features/Employees/employeesSlice";
import DatePicker from "@/components/elements/DatePicker";
import SelectMenu from "@/components/elements/SelectMenu";

const CreateEmployeeTemplate = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states.states);
  const employees = useSelector((state) => state.employees.employees);

  // Personal Information
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  // Address
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [state, setState] = React.useState("");

  // Department
  const [department, setDepartment] = React.useState("");

  const departmentOptions = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      state,
      zipCode,
      department
    );
    dispatch(
      addEmployee({
        firstName,
        lastName,
        dateOfBirth,
        startDate,
        street,
        city,
        state,
        zipCode,
        department,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        <h1>HRnet</h1>
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
      </div>

      <form
        action=""
        className={styles.container__form}
        onSubmit={handleSubmit}
      >
        <div className={styles.container__form__input}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.container__form__input}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.container__form__input}>
          <DatePicker
            label="Date of Birth"
            value=""
            onChange={setDateOfBirth}
          />
        </div>
        <div className={styles.container__form__input}>
          <DatePicker label="Start Date" value="" onChange={setStartDate} />
        </div>
        <div className={styles.container__form__address}>
          <fieldset>
            <legend>Address</legend>

            <div className={styles.container__form__input}>
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                onChange={(e) => setStreet(e.target.value)}
                value={street}
              />
            </div>
            <div className={styles.container__form__input}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={styles.container__form__input}>
              <SelectMenu
                label="State"
                options={states.map((state) => state.name)}
                value=""
                onChange={setState}
              />
            </div>
            <div className={styles.container__form__input}>
              <label htmlFor="zip-code">Zip Code</label>
              <input
                type="text"
                id="zip-code"
                name="zip-code"
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </fieldset>
        </div>
        <div className={styles.container__form__input}>
          <SelectMenu
            label="Department"
            options={departmentOptions}
            value=""
            onChange={setDepartment}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEmployeeTemplate;
