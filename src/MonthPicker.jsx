import React, {useState, useEffect} from 'react';
// an third-party component from NPM
import MonthYearPicker from 'react-month-year-picker';

let mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function MonthPicker(props) {
  console.log("recieved");
  let date = props.date;

  const [visible,updateVisible] = useState(false);

  function showFun () {
    updateVisible(true);
  }

  function pickedYear (year) {
    updateVisible(false);
    props.yearFun(year);
  }

  function pickedMonth (month) {
    updateVisible(false);
    props.monthFun(month);
  }

	function fetchData(){
		useEffect(()=>{
			
		},[]);
	}
  if (visible) {
  return (
      <div id="monthDiv">
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> );
  } 
  else {
    return (
      <button onClick={showFun}>{mm[date.month-1]+" / "+date.year}</button>
    )
  }
}

export default MonthPicker;