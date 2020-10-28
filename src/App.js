import React, {useState, useEffect} from 'react'
import {
  FormControl,
  Card,
  CardContent,
  TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'

import {sortData, prettyPrintStat} from './utils'

import 'leaflet/dist/leaflet.css'

import './App.css'
const App =()=>{
  const [countries, setCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng:-40.4796
  })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data) =>{
      setCountryInfo(data)
    })
  }, [])

  useEffect(()=>{
    const getCountriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=>{
        // console.log(data)
        const countries = data.map((country) =>(
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ))

        const sortedData = sortData(data)
        setTableData(sortedData)
        setMapCountries(data)
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange = async (newValue) => {
    if(!newValue) {
      return;
    }
    const countryCode = newValue.value;
    // console.log(countryCode)
    const URL = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(URL)
    .then(response=> response.json())
    .then(data=>{
      setCountryInfo(data)

      setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapZoom(4)
    })
  }
  // console.log(countryInfo)

  return(
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1 className="app__title">COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Autocomplete
            style={{ width: 300 }}
            options={countries}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => {
              onCountryChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                variant="outlined"
              />
            )}
          />
        </FormControl>
        </div>

        {/* InfoBoxes*3 */}
        <div className="app__stats" >
          <InfoBox 
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}/>
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}/>
        </div>


        {/* Map */}
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide {casesType}</h3>
          {/* Graph */}
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>
    </div>  
  )
}

export default App