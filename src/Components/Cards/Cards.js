import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import CountUp from 'react-countup'
import cx from 'classnames'

import styles from './cards.css'

import {Spinner} from '../../images/virus.gif'

const Cards = ({
    data: {
        confirmed,
        recovered,
        deaths, 
        lastUpdated
    },
    country
}) =>{
    if(!confirmed){
        return Spinner
    }
    const active = confirmed["value"] - recovered["value"] - deaths["value"]
    let cardDetails = [
        {
            style: styles.infected,
            text: "Infected",
            value: confirmed.value,
            bottomText: "Number of Infected cases in COVID-19"
        },
        {
            style: styles.recovered,
            text: "Recovered",
            value: recovered.value,
            bottomText: "Number of recoveries from COVID-19"
        },
        {
            style: styles.deaths,
            text: "Deaths",
            value: deaths.value,
            bottomText: "Number of daeths caused by COVID-19"
        },
        {
            style: styles.active,
            text: "Active",
            value: active,
            bottomText: "Number of Active cases in COVID-19"
        }
    ]

    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                {cardDetails.map((detail, index)=>(
                    <Grid 
                        item
                        component={Card}
                        xs={12}
                        md={2}
                        className={cx(styles.Card, detail.style)}
                        key={index}
                        style={{margin: "0px 23.675px", padding: "12px"}}
                    >
                        <CardContent>
                            <Typography color="textPrimary" gutterBottom>
                                <b>{detail.text}</b>
                            </ Typography>
                            <Typography variant="h5">
                                <CountUp 
                                    start={0}
                                    end={detail.value}
                                    duration={2}
                                    sererator=","
                                />
                            </ Typography>  
                            <Typography color="textPrimary">
                                Last Updated at:
                            </ Typography> 
                            <Typography color="textSecondary" variant="body2">
                                {new Date(lastUpdated).toDateString()}
                            </ Typography>
                            <Typography color="textSecondary" variant="body2">
                                {new Date(lastUpdated).toLocaleDateString()}
                            </ Typography>
                            <Typography variant="body2">
                                {detail.bottomText}
                            </ Typography>
                            <Typography variant="body2">
                                {country}
                            </ Typography>
                        </ CardContent>
                    </ Grid>
                ))}
            </ Grid>    
        </ div>
    )
}

export default Cards