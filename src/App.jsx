import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import MonthPicker from './MonthPicker';
import {sendGetRequest, sendPostRequest} from './AJAX.jsx'



function App() {
  const [shown, setVisibility] = useState(false);	//Shown : Variable if shown, setVisibility() : Show if needed
  //let dis = "show";
	function showText() {
	  console.log("Button Clicked")
		if(shown == true)//showing upper
		{
			setVisibility(false);
			console.log("Shown in true")
		}
    else{
			setVisibility(true);
      //dis = "none"
		}
  }
	useEffect(gettingRequest);
  //if(shown){
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
					<input type="submit" id="greenButton" onClick={showText} value={ shown? "See Less" : "See More"}/>
				</div>	
					
			</div>
				<div id='imageContents'>			
					<img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-						drought/c01_53834006/original.jpg"/>
					Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
				</div>
			</div>
			<div id="lowerPart" style={{ display: shown ? "inline" : "none" }}>
				<div id="chartSpace">
					Chart Comes here
				</div>
				<p id="lowerText">
				Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
				</p>
			</div> 
    </main>
		);
}
function gettingRequest(month,date){
	(async function () {
	      console.log("Doing AJAX request")
	      let content = await sendPostRequest("query/getCDECData",[month,date]);
				console.log(content)
	    }) ();
}
export default App;