import React, {useState, useEffect} from 'react';
// an third-party component from NPM
import MonthYearPicker from 'react-month-year-picker';

let mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function MonthPicker(props) {
  let date = props.date;
  let y = date.year;
  let m = date.month;

  const [visible,updateVisible] = useState(false);

  function showFun () {
    updateVisible(true);
  }

  function pickedYear (year) {
    //updateVisible(false);
    props.yearFun(year);
  }

  function pickedMonth (month) {
    //updateVisible(false);
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
        <input id='monthSelectButton' onClick={showFun} value={mm[m-1]+" "+y} disabled/>
      </div> );
  } 
  else {
    return (
      <input id='monthSelectButton' onClick={showFun} value={mm[m-1]+" "+y}/>
    )
  }
}

export default MonthPicker;