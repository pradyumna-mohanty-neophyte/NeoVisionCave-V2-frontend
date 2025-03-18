// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import Badge from '@mui/material/Badge';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import dayjs from 'dayjs';

// function ServerDay(props) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
//   const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

//   return (
//     <Badge
//       key={props.day.toString()}
//       overlap="circular"
//       sx={isSelected ? { margin: '2px', borderRadius: '50%' } : undefined}
//       badgeContent={isSelected ? '' : undefined}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       variant={'dot'}
//       color={isSelected ? 'primary' : undefined}
//     >
//       <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
//     </Badge>
//   );
// }

// function DateRangePickerComp({ setSelectedDateRange }) {
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [events, setEvents] = useState([]);
//   const [highlightedDays, setHighlightedDays] = useState([]);

//   useEffect(() => {
//     async function getEventsData() {
//       const storeDetails = JSON.parse(localStorage.getItem('analysisStoreDetails'));
//       try {
//         const body = {
//           store_id: [`${storeDetails.store}`]
//         };
//         const Edata = { data: [] };
//         const daysOnly = Edata.data.map((item) => dayjs(item));
//         setEvents(daysOnly);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getEventsData();
//   }, []);

//   useEffect(() => {
//     setHighlightedDays([]);
//     const daysToHighlight = events.map((event) => {
//       const today = dayjs();
//       if (event.month() === today.month()) {
//         return event.date();
//       }
//       return null;
//     }).filter(day => day !== null);
//     setHighlightedDays(daysToHighlight);
//   }, [events]);

//   const handleMonthChange = (date) => {
//     const daysToHighlight = events.map((event) => {
//       if (event.month() === date.month()) {
//         return event.date();
//       }
//       return null;
//     }).filter(day => day !== null);

//     setHighlightedDays(daysToHighlight);
//   };

//   const handleChange = (newDateRange) => {
//     setDateRange(newDateRange);
//   };

//   function formatDate(date) {
//     return date ? date.format('YYYY-MM-DD') : null;
//   }

//   useEffect(() => {
//     setSelectedDateRange(dateRange.map(date => formatDate(date)));
//   }, [dateRange, setSelectedDateRange]);

//   return (
//     <div className="mt-5 md:mt-0">
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateRangePicker
//           startText="Check-in"
//           endText="Check-out"
//           value={dateRange}
//           onChange={handleChange}
//           onMonthChange={handleMonthChange}
//           renderDay={(day, _value, DayComponentProps) => (
//             <ServerDay {...DayComponentProps} day={day} highlightedDays={highlightedDays} />
//           )}
//           minDate={dayjs('2023-12-26')}
//           maxDate={dayjs()}
//         />
//       </LocalizationProvider>
//     </div>
//   );
// }

// export default DateRangePickerComp;

import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { enUS } from "date-fns/locale"; // import the locale
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function DateRangePickerComp({ setSelectedDateRange }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const incrementDate = (date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    };
    const formattedRange = {
      startDate: incrementDate(range[0].startDate).toISOString().split("T")[0],
      endDate: incrementDate(range[0].endDate).toISOString().split("T")[0],
    };
    setSelectedDateRange(formattedRange);
    console.log("Selected Date Range:", formattedRange);
  }, [range, setSelectedDateRange]);

  return (
    <div className="mt-5 md:mt-0">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        minDate={new Date(2023, 11, 26)}
        maxDate={new Date()}
        locale={enUS} // set the locale
      />
    </div>
  );
}

export default DateRangePickerComp;
