import React from 'react';
import {Cards, Chart, CountryPicker} from './Components'

import {fetchData} from './api'

import styles from './App.module.css';
// import coronaImage from './images/image.jpg'

class App extends React.Component{
  // Initialising state in a classbased component
  state = {
    data:{}
  }
  async componentDidMount(){
    const fetchedData = await fetchData()
    // console.log(data)
    this.setState({data:fetchedData})
  }
  render(){
    const {data} = this.state
    return(
        <div className={styles.container}>
          <Cards data={data}/>
          <CountryPicker/>
          <Chart/>
        </div>
    )
  }
}

export default App;
