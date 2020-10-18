import React from 'react'
import numeral from 'numeral'
import {Circle, Popup} from 'react-leaflet'

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000
    },
  };

export const sortData = (data) =>{
    const sortedData = [...data];

    sortedData.sort((a, b)=>{
        if(a.cases > b.cases){
            return -1
        } else{
            return 1
        }
    })
    return sortedData
}

// Draw circles
export const  showDataOnMap = (data, casesType='cases')=>(
    data.map(country =>(
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillcolor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div>
                    <div style={{backgroundImage: `URL(${country.countryInfo.flag})`}}/>
                    <div>{country.country}</div>
                    <div>Cases: {numeral(country.cases).format('0,0')}</div>
                    <div>Recovred: {numeral(country.recovered).format('0,0')}</div>
                    <div>Deaths: {numeral(country.deaths).format('0,0')}</div>
                </div>
            </Popup>
        </Circle>
    ))
)
