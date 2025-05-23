import React from "react";
import styles from "./CreateEmployeeTemplate.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "@/features/Employees/employeesSlice";
// import DatePicker from "@/components/elements/DatePicker";
import SelectMenu from "@/components/elements/SelectMenu";
import Modal from "@/components/elements/Modal";
import DatePicker from "oc-react-date-picker";

const CreateEmployeeTemplate = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states.states);

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

  // Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [modalMessage, setModalMessage] = React.useState("");

  const departmentOptions = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setDepartment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setModalMessage(
      `Employee ${firstName} ${lastName} has been created successfully`
    );
    setIsModalOpen(true);
    clearForm();
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.container__form__input}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.container__form__input}>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            className="oc-react-date-picker"
          />
        </div>
        <div className={styles.container__form__input}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            className="oc-react-date-picker"
          />
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
                value={city}
              />
            </div>
            <div className={styles.container__form__input}>
              <SelectMenu
                label="State"
                options={states.map((state) => state.name)}
                value={state}
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
                value={zipCode}
              />
            </div>
          </fieldset>
        </div>
        <div className={styles.container__form__input}>
          <SelectMenu
            label="Department"
            options={departmentOptions}
            value={department}
            onChange={setDepartment}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2>Employee Created</h2>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default CreateEmployeeTemplate;
