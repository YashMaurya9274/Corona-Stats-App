import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';        //Multiple css

import styles from './Cards.module.css';

const Cards = ({data : {confirmed, recovered, deaths, lastUpdate}}) => {

    if(!confirmed){
        return 'Loading...'
    }
    return (
        <div className={styles.container}>
                <Grid container spacing={3} justify="center" >
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)} >     {/* Multiple styles Here 'xs' is for mobile devices i.e. extra small and 'md' is for medium and upper devices */}
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Infected</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2">Number of Acive Cases of Covid-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)} >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2">Number of Recoveries from Covid-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)} >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2">Number of Deaths caused by Covid-19</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
        </div>
    )
}

export default Cards;