import React, {useState, useEffect} from 'react'
import {
  MenuItem,
  FormControl,
  Select, 
  Card,
  CardContent
} from '@material-ui/core'

import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'

import {sortData} from './utils'

import 'leaflet/dist/leaflet.css'

import './App.css'
const App =()=>{
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng:-40.4796
  })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data =>{
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

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    // console.log(countryCode)
    setCountry(countryCode)
    const URL = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(URL)
    .then(response=> response.json())
    .then(data=>{
      setCountry(countryCode)
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
        <h1>COVID19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            {/* Loop through all countries and show them in the drop down */}
            <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map((country)=>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
          </Select>
        </FormControl>
        </div>

        {/* InfoBoxes*3 */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>


        {/* Map */}
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>World Wide New Cases</h3>
          {/* Graph */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>  
  )
}

export default App