import React from "react";
import styles from "./EmployeeListTemplate.module.scss";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const EmployeeListTemplate = () => {
  const employees = useSelector((state) => state.employees.employees);
  const gridRef = useRef();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(employees);
  const [searchText, setSearchText] = useState("");

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    {
      field: "firstName",
      headerName: "First Name",
      sortable: true,

      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      sortable: true,

      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      sortable: true,

      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      sortable: true,

      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      sortable: true,

      flex: 1,
    },
    {
      field: "street",
      headerName: "Street",
      sortable: true,

      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      sortable: true,

      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      sortable: true,

      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      sortable: true,

      flex: 1,
    },
  ]);

  const defaultColDef = {
    resizable: true,
    minWidth: 100,
  };

  const onSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    gridRef.current.api.setQuickFilter(value);
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.navigation}>
        <Link to="/" className={styles.navigation__link}>
          Home
        </Link>
        <Link to="/create-employee" className={styles.navigation__link}>
          Create Employee
        </Link>
      </div>
      <h1 className={styles.title}>Current Employees</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchText}
          onChange={onSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className="ag-theme-quartz">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          quickFilterText={searchText}
        />
      </div>
    </div>
  );
};

export default EmployeeListTemplate;
