import React from "react";
import styles from "./DatePicker.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

const getLastDayOfMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDay();
};

const getNumberOfWeeksInMonth = (month, year) => {
  // Get Number of sundays in the month
  // Get Number of saturdays in the month
  // min of the two + 1
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstSunday = 7 - firstDay.getDay();
  const lastSaturday = lastDay.getDate() - lastDay.getDay();

  const numberOfSundays = Math.floor((lastSaturday - firstSunday) / 7) + 1;
  const numberOfSaturdays = Math.floor((lastSaturday - firstSunday) / 7) + 1;

  return Math.min(numberOfSundays, numberOfSaturdays) + 1;
};

const getVisibleCalendarDays = (month, year, selectedDate) => {
  const daysInMonth = getDaysInMonth(month, year);
  const daysInPreviousMonth = getDaysInMonth((month - 1) % 12, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  const lastDayOfMonth = getLastDayOfMonth(month, year);
  const numberOfWeeksInMonth = getNumberOfWeeksInMonth(month, year);

  const previousMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => daysInPreviousMonth - firstDayOfMonth + i + 1
  );

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const nextMonthDays = Array.from(
    { length: 6 - lastDayOfMonth },
    (_, i) => i + 1
  );

  const previousMonthDates = previousMonthDays.map((day) => {
    return {
      date: new Date(year, (month - 1) % 12, day + 1)
        .toISOString()
        .split("T")[0],
      day: day,
      isCurrentMonth: false,
      isToday:
        new Date(year, (month - 1) % 12, day + 1)
          .toISOString()
          .split("T")[0] === new Date().toISOString().split("T")[0],
      isSelected:
        selectedDate ===
        new Date(year, (month - 1) % 12, day + 1).toISOString().split("T")[0],
    };
  });

  const currentMonthDates = currentMonthDays.map((day) => {
    return {
      date: new Date(year, month, day + 1).toISOString().split("T")[0],
      day: day,
      isCurrentMonth: true,
      isToday:
        new Date(year, month, day + 1).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0],
      isSelected:
        selectedDate ===
        new Date(year, month, day + 1).toISOString().split("T")[0],
    };
  });

  const nextMonthDates = nextMonthDays.map((day) => {
    return {
      date: new Date(year, month + 1, day + 1).toISOString().split("T")[0],
      day: day,
      isCurrentMonth: false,
      isToday:
        new Date(year, month + 1, day + 1).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0],
      isSelected:
        selectedDate ===
        new Date(year, month + 1, day + 1).toISOString().split("T")[0],
    };
  });

  const allDates = [
    ...previousMonthDates,
    ...currentMonthDates,
    ...nextMonthDates,
  ];

  console.log(allDates);

  return { allDates, numberOfWeeksInMonth };
};

const DatePicker = () => {
  const [visibleCalendarMonth, setVisibleCalendarMonth] = useState(
    new Date().getMonth()
  );
  const [visibleCalendarYear, setVisibleCalendarYear] = useState(
    new Date().getFullYear()
  );

  const [visibleCalendarDays, setVisibleCalendarDays] = useState(
    getVisibleCalendarDays(visibleCalendarMonth, visibleCalendarYear)
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setVisibleCalendarDays(
      getVisibleCalendarDays(
        visibleCalendarMonth,
        visibleCalendarYear,
        selectedDate
      )
    );
  }, [visibleCalendarMonth, visibleCalendarYear, selectedDate]);

  const goToCurrentMonth = () => {
    setVisibleCalendarMonth(new Date().getMonth());
    setVisibleCalendarYear(new Date().getFullYear());
  };

  const goToNextMonth = () => {
    if (visibleCalendarMonth + 1 > 11) {
      setVisibleCalendarMonth(0);
      setVisibleCalendarYear(visibleCalendarYear + 1);
    } else {
      setVisibleCalendarMonth(visibleCalendarMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (visibleCalendarMonth - 1 < 0) {
      setVisibleCalendarMonth(11);
      setVisibleCalendarYear(visibleCalendarYear - 1);
    } else {
      setVisibleCalendarMonth(visibleCalendarMonth - 1);
    }
  };

  const isCurrentMonth = (i) => {
    return visibleCalendarDays.allDates[i].isCurrentMonth;
  };

  const isSelected = (i) => {
    return visibleCalendarDays.allDates[i].isSelected;
  };

  const calendarDay = (i) => {
    return visibleCalendarDays.allDates[i].day;
  };

  const isToday = (i) => {
    return visibleCalendarDays.allDates[i].isToday;
  };

  const handleDateClick = (i) => {
    setSelectedDate(visibleCalendarDays.allDates[i].date);
    if (!isCurrentMonth(i)) {
      const date = new Date(visibleCalendarDays.allDates[i].date);
      setVisibleCalendarMonth(date.getMonth());
      setVisibleCalendarYear(date.getFullYear());
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={selectedDate}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      />
      {isCalendarOpen && (
        <div className={styles.container__picker}>
          <div className={styles.container__picker__header}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={goToPreviousMonth} />
            <FontAwesomeIcon icon={faHome} onClick={goToCurrentMonth} />
            <div className={styles.container__picker__header__selects}></div>
            <select
              value={visibleCalendarMonth}
              onChange={(e) => setVisibleCalendarMonth(e.target.value)}
            >
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
            <select
              value={visibleCalendarYear}
              onChange={(e) => setVisibleCalendarYear(e.target.value)}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - 75 + i}>
                  {new Date().getFullYear() - 75 + i}
                </option>
              ))}
            </select>
            <FontAwesomeIcon icon={faArrowRight} onClick={goToNextMonth} />
          </div>

          <div className={styles.container__picker__calendar}>
            <table>
              <thead>
                <tr className={styles.container__picker__calendar__header}>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  { length: visibleCalendarDays.numberOfWeeksInMonth },
                  (_, i) => (
                    <tr
                      key={i}
                      className={styles.container__picker__calendar__row}
                    >
                      {Array.from({ length: 7 }, (_, j) => (
                        <td
                          key={j}
                          onClick={() => handleDateClick(i * 7 + j)}
                          className={`
                            ${styles.container__picker__calendar__row__day}
                            ${
                              isSelected(i * 7 + j)
                                ? styles.container__picker__calendar__row__day__selected
                                : ""
                            }
                            ${
                              isCurrentMonth(i * 7 + j)
                                ? styles.container__picker__calendar__row__day__currentMonth
                                : ""
                            }
                            ${
                              isToday(i * 7 + j)
                                ? styles.container__picker__calendar__row__day__today
                                : ""
                            }`}
                        >
                          {calendarDay(i * 7 + j)}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
