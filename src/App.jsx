import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import MonthPicker from './MonthPicker';
import { sendPostRequest } from './AJAX.jsx'

import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';


let tempM; 
let tempY;

function App() {
  const [shown, setVisibility] = useState(false);	//Shown : Variable if shown, setVisibility() : Show if needed
  const [date, setDate] = useState({year:2022, month:5});
  //let dis = "show";
	async function showLower() {
	  console.log("Button Clicked")
		if(shown == true)//Currently Visible
		{
			setVisibility(false);	//Make it invisible
			console.log("Shown in true")
		}
    else{	//Currently Invisible
			setVisibility(true);	//Make it visible
			console.log("Doing AJAX request");
      // tempM = date.month;
      // tempY = date.year;
      // let t = {year:tempY, month:tempM};
      // let waterData = await sendPostRequest("query/getCDECData", date);
      //display the data with chart		
		}
  }
  /*async function showLower() {
	  console.log("Button Clicked")
		if(shown == true)//Currently Visible
		{
      console.log()
			setVisibility(false);	//Make it invisible
			console.log("Shown in true")
		}
    else{	//Currently Invisible
			setVisibility(true);	//Make it visible
			// gettingRequest(month,date);	//Retrieve month-date from table
			
		}
  }*/
	// useEffect(gettingRequest)

  function newYear(y){
    setDate({year:y, month:(date.month)});
  }
  function newMonth(m){
    setDate({year:(date.year), month:m});
  }

	return( //Change to shows upper and lower part
		<main>
			<div id="alwaysShown">
				<div id='colContent'>
      	<p id='upper text'>
	      California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>. The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and	attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
  			</p>
				<p>
					California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
  			</p>
				<div id="buttonDiv">
					<input type="submit" id="greenButton" onClick={showLower} value={ shown? "See Less" : "See More"}/>
				</div>	
					
			</div>
				<div id='imageContents'>			
					<img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-						drought/c01_53834006/original.jpg"/>
					Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
				</div>
			</div>
			<div id="lowerPart" style={{ display: shown ? "block" : "none" }}>
				<div id="chartSpace">
					Chart Comes here
          IDK about this : canvas id="myChart" width="400" height="400" canvas
					<SchoolDisplay/>
				</div>
				<p id="lowerText">
				Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
				</p>
        <MonthPicker date={date} yearFun={newYear} monthFun={newMonth} />
			</div> 
    </main>
		);
}

function SchoolDisplay() {

  console.log("in SchoolDisplay");

  // static var will contain the list of schools
  const [schools, setSchools] = useState(false);

  // call the custom fetch hook, passing it the callback functions that it can use
	let month = 5;
	let year = 2023;
	sendPostRequest("query/getCDECData", {"month": month,"year":year});
  

  function thenFun (result) {
    setSchools(result);
    // render the list once we have it
  }

  function catchFun (error) {
    console.log(error);
  }

  // will re-render once state variable schools changes
  if (schools) {
  return (
    <main>
      <SchoolChart schools={schools}> </SchoolChart>
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
    let n = props.schools.length;
    console.log(props.schools);

    // objects containing row values
    let stickerObj = {label: "Total Volume",data: [], backgroundColor: ["cyan"]}
    let midIncObj = {label: "Current Volume", data: [], backgroundColor: ["green"]}
    let labels = [];
    for (let i=0; i<n; i++) {
      stickerObj.data.push(props.schools[i].sticker);
      midIncObj.data.push(props.schools[i].midIncome);
      labels.push(nicknames.get(i));
    }
  let userData = {};
  userData.labels = labels;
  userData.datasets = [stickerObj, midIncObj];

console.log(userData);
let options = {
  plugins: {
    title: {
      display: false,
      text: 'Sticker vs. Middle Income Family Prices',
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
  }
};
      return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
					Chart Container
        </div>
      )
  }
}

// A component that fetches its own data


export default App;