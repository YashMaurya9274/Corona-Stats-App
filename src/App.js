import React, {Component} from 'react';
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Switch, Paper } from '@material-ui/core';

import { Cards, Chart, CountryPicker } from './components';     //There is an index.js file in components that is exporting them.
import { fetchData } from './api';
import coronaImage from './images/covid-19.png';

// DEPENDENCIES INSTALLED
//npm install --save axios react-chartjs-2 react-countup classnames
// npm install --save @material-ui/core
//npm install --save chart.js

// const dark = {
//     background: "rgb(46, 45, 45)",
//     color : "rgb(202, 202, 202)"
// }

class App extends Component{

    state = {
        data : {},
        country : '',
        darkMode : JSON.parse(localStorage.getItem('dark'))
    }

    setDarkMode(e){
        this.setState({ darkMode : e })
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData })
    }

    handleCountryChange = async (country) => {
        //fetch the data
        const fetchedData = await fetchData(country);
        //set the data
        this.setState({ data : fetchedData, country : country })
    }

    componentDidUpdate() {
        localStorage.setItem("dark", JSON.stringify(this.state.darkMode))
    }

    render() {

        const { data, country, darkMode } = this.state

        const theme = createMuiTheme({
            palette : {
                type : this.state.darkMode ? "dark" : "light",
            },
        })

        const color_change = (color) => {
            if (color == true){
                document.body.style.background = "rgb(46, 45, 45)"
            }
            else{
                document.body.style.background = "white"
            }
        }

        return (
            <div className={styles.container}>
                <ThemeProvider theme={theme} >
                    <Switch checked={darkMode} onClick={color_change(darkMode)} onChange={() => this.setDarkMode(!darkMode) }></Switch>
                    <img className={styles.image} src={coronaImage} alt="COVID-19" />
                    <Cards data={data} />
                    <CountryPicker handleCountryChange={this.handleCountryChange} dark={darkMode} />
                    <Chart data={data} country={country}/>
                </ThemeProvider>
            </div>
        )
    }
}

export default App;