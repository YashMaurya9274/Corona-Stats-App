import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core'

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange, dark }) => {

    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }

        fetchAPI();
    }, [setFetchedCountries])

    const theme = createMuiTheme({
        palette : {
            type : dark ? "dark" : "light",
        },
    })

    return (
        <FormControl className={styles.formControl}>
            <ThemeProvider theme={theme}>
                <Paper style = {{margin: "2%", width : "30vh"}}>
                    <NativeSelect default="" onChange={e => handleCountryChange(e.target.value)} >
                            <option value="">Global</option>
                            {fetchedCountries.map((country, i) => <option key={i} value={country} >{country}</option>)}
                    </NativeSelect>
                </Paper>
            </ThemeProvider>
        </FormControl>
    )
}

export default CountryPicker;