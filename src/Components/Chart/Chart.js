import React,{useState, useEffect} from 'react'
import {fetchDailydata} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import styles from './chart.css'

const Chart = ({data: {
        confirmed, 
        recovered,
        deaths
    },
    country
}) =>{
    const [dailyData, setDailydata] = useState([])
    useEffect(()=>{
        const fetchaAPI = async()=>{
            setDailydata(await fetchDailydata())
        }   
        fetchaAPI() 
    }, [])
    const lineChart = dailyData.length ? (
        <Line 
            data={{
                labels: dailyData.map(({date})=> date),
                datasets:[
                    {
                        data:dailyData.map(({confirmed})=> confirmed),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true
                    },
                    {
                        data:dailyData.map(({deaths})=> deaths),
                        label: "Deaths",
                        borderColor: "#red",
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                        fill: true
                    }
                ]
            }}
        />
    ):null

    const barChart = confirmed ? (
        <Bar 
            data:{{
                labels: ["Infected", "Recovered", "Deaths", "Active"],
                datasets:[
                    {
                        label: "People",
                        backgroundColor:[
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                            "rgba(242, 234, 0, 0.5)",
                        ],
                        hoverBackgroundColor:[
                            "rgba(0, 7, 153)",
                            "rgba(30, 102, 49)",
                            "rgba(255, 51, 51)",
                            "rgba(204, 153, 0)",
                        ],
                        data:[
                            confirmed.value,
                            recovered.value,
                            deaths.value,
                            confirmed.value - (recovered.value + deaths.value)
                        ]
                    }
                ]
            }}
            options={{
                legend:{display: false},
                title: {display: true, text: `Current State in ${country}`}
            }}
        />
    ): null;

    return (
        <div className={styles.container}>{country ? barChart : lineChart}</div>
    );
}
    
export default Chart;
