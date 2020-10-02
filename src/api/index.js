import axios from 'axios'

const URL = "https://covid19.mathdro.id/api"

export const fetchData = async(country) =>{
    let changeableUrl = URL
    if(country){
        changeableUrl = `${URL}/countries/${country}`
    }


    try{
        const{
            data: {
                confirmed,
                recovered, 
                deaths, 
                lastUpdate
            }
        } = await axios.get(changeableUrl)
    

        return {
            confirmed, 
            recovered,
            deaths,
            lastUpdate
        }

    }catch(err){
        console.log(err)
    }

}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${URL}/daily`)
        console.log(data)
        const modifiedData = data.map((dailyData) =>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedData
    }catch(err){
        console.log(err)
    }
}

export const fetchCountries = async () => {
    try{
        const{
            data: {countries}
        } = await axios.get(`${URL}/countries`)
        return countries.map((country) => country.name);
    }catch(err){
        console.log(err)
    }
}