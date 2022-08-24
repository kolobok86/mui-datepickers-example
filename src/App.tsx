import React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import logo from './logo.svg';
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
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
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

          <Stack spacing={4}>
            <Typography variant="h4">
              DateRangePicker (платненький)
            </Typography>

            <Stack spacing={2}>
              <Typography variant="h5">
                Базовый вариант (с двумя текстовыми полями, так работает лучше всего)
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
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
                        <Box sx={{ mx: 2 }}> с </Box>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> по </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    );
                  }}
                />
              </Stack>

              <Typography variant="h5">
                Начало и конец периода в одном поле (костыльно с точки зрения API компонентов, но работает)
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
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
              </Stack>
            </Stack>

            <Typography variant="h4">
              DatePicker (бесплатный, MIT лицензия)
            </Typography>

            <Stack spacing={2}>

              <Typography variant="h5">
                Два отдельных DatePicker-а — для начала и конца периода
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Box>с</Box>
                <DatePicker
                  openTo="day"
                  views={['year', 'month', 'day']}
                  label="Начало"
                  value={value[0]}
                  onChange={(newValue) => {
                    setValue([newValue, value[1]]);
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
                <Box>по</Box>
                <DatePicker
                  openTo="day"
                  views={['year', 'month', 'day']}
                  label="Окончание"
                  value={value[1]}
                  minDate={value[0] || undefined}
                  onChange={(newValue) => {
                    setValue([value[0], newValue]);
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </Stack>
            </Stack>
          </Stack>
        </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;
