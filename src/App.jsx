
import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import MonthPicker from './MonthPicker';
//import BarChart from './BarChart.jsx';
import { sendPostRequest } from './AJAX.jsx'

import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

let tempData;
let tempJ = {year:2020, month:11};
function App() {
  let tempM; 
  let tempY;
  const [shown, setVisibility] = useState(false);	//Shown : Variable if shown, 
  const [date, setDate] = useState(tempJ); //this line
  const [dataValues, setDataValues] = useState([]);
  useEffect(() => {datareq();}, [date]);

  async function datareq(){
    tempData = await sendPostRequest("query/getCDECData", {"month":date.month, "year":date.year});
    setDataValues(tempData);
  }
  
  function newYear(y){
    console.log("Year updated: ",y);
    tempM = date.month;
    tempJ = {year:y, month:tempM};
    setDate(tempJ);
    datareq();
  }
  function newMonth(m){
    console.log("Month updated: ",m);
    tempY = date.year;
    tempJ = {year:tempY, month:m};
    setDate(tempJ);
    datareq();
  }

	async function showLower() {
		if(shown == true)//Currently Visible
		{
			setVisibility(false);	//Make it invisible
		}
    else{	//Currently Invisible
      datareq();
      setVisibility(true);	//Make it visible
			console.log(tempData)
		}
  }

  
	return( //Change to shows upper and lower part
		<main>
			<div id="title">
				<p id='titleText'>
				Water storage in California reservoirs
				</p>
			</div>
			<div id="entire">
				<div id="alwaysShown">
					<div id='colContent'>
  		    	<p id='upper text'>
	    			  California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>. The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and	attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
  					</p>
						<p>
							<br></br>California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
  					</p>
						<div id="buttonDiv">
							<input type="submit" id="greenButton" onClick={showLower} value={ shown? "See Less" : "See More"}/>
						</div>	
					</div>
					<div id='imageContents'>			
						<img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-						drought/c01_53834006/original.jpg"/>
						<div id = "imageCaptions">
						Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
						</div>
					</div>
				</div>
				<div id="lowerPart" style={{ display: shown ? "flex" : "none" }}>
					<div id="chartSpace">
						<SchoolDisplay dates = {date} shown = {shown} dataValues = {dataValues}/>
					</div>
					<div id="lowerTextSection">
						<p id="lowerText">
							Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
						</p>
						<div id = "monthData">
							<p id="changeMonth"> Change month:</p>
							<MonthPicker date={date} yearFun={newYear} monthFun={newMonth} />
						</div>
					</div> 
				</div>
			</div>
    </main>
		);
}

function SchoolDisplay(props) {

	const [dateChosen, setDate ] = useState({'month':props.month,"year":props.year})
	
	
  // static var will contain the list of schools
  const [schools, setSchools] = useState(false);
	
	useEffect(() => {
  setSchools(true)
	}, [dateChosen]);
	
	
	
  // will re-render once state variable schools changes
  if (schools) {
  return (
    <main>
      <SchoolChart schools={schools} dataValues = {props.dataValues}> </SchoolChart>
    </main>
  )
  } else {
    return (<p>
      loading...
    </p>);
  }

}


function SchoolChart(props) {
  const nicknames = new Map();
  nicknames.set(0, 'Shasta');
  nicknames.set(1, 'Oroville');
  nicknames.set(2, 'Trinity Lake');
	nicknames.set(3, 'New Melones');
	nicknames.set(4, 'San Luis');
	nicknames.set(5, 'Don Pedro');
	nicknames.set(6, 'Berryessa');
  
  if (props.schools) {
    let n = props.dataValues.length;
// HA,ORO,CLE,NML,SNL,DNP,BER
		let volume = [4552000,3537577,2447650,2400000,2041000,2030000,1602000]

    // objects containing row values
    let stickerObj = {label: "Current Volume",data: [], backgroundColor: ["rgb(66,145,152)"]}
    let midIncObj = {label: "Total Volume", data: [], backgroundColor: ["rgb(120,199,227)"]}
    let labels = [];
    for (let i=0; i<n; i++) {
      stickerObj.data.push(props.dataValues[i].value/1000000);
			let value=0;
			if(props.dataValues[i].value > volume[i])
				value = props.dataValues[i].value;
			else{
				value = volume[i] - props.dataValues[i].value;
			}
      midIncObj.data.push(value/1000000);
			// midIncObj.data.push(volume[i] - props.dataValues[i].value);
      labels.push(nicknames.get(i));
    }
  let userData = {};
  userData.labels = labels;
  userData.datasets = [stickerObj, midIncObj];

let options = {
  plugins: {
    title: {
      display: false,
      text: 'Volume of Water Present',
    },
    tooltip: {
      enabled: true
    },
    legend: {
      display: false
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      },
			stacked:true
    },
    y: {
			stacked:true,
      grid: {
        display: false
      }
    }
  },
	
};
      return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      )
  }
}

// A component that fetches its own data


export default App;