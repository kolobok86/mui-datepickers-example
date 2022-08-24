import React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

function App() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  console.log('value:', value);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        <LocalizationProvider
          dateAdapter={AdapterMoment}
          localeText={{ start: 'Начало', end: 'Окончание' }}
          locale={'ru'}
        >
          <DateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => {
              // console.log('renderInput params:')
              // console.log('\t startProps:', startProps)
              // console.log('\t endProps:', endProps)

              return (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              );
            }}
          />

          <DateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => {
              console.log('renderInput params:')
              console.log('\t startProps:', startProps)
              console.log('\t endProps:', endProps)

              return (
                <TextField
                  label="Период"
                  inputProps={{
                    ...startProps.inputProps,
                    // onChange: startProps.inputProps?.onChange,
                    value: `${startProps.inputProps?.value} - ${endProps.inputProps?.value}`,
                  }} 
                />
              );
            }
          }
          />
        </LocalizationProvider>

      </header>
    </div>
  );
}

export default App;
