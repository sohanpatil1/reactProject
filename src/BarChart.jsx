import React, {useState, useEffect} from 'react';
import { Bar } from "react-chartjs-2";

function BarChart(props) {
  let data = props.data;
  const nicknames = new Map();
  nicknames.set(0, 'Shasta');
  nicknames.set(1, 'Oroville');
  nicknames.set(2, 'Trinity Lake');
	nicknames.set(3, 'New Melones');
	nicknames.set(4, 'San Luis');
	nicknames.set(5, 'Don Pedro');
	nicknames.set(6, 'Berryessa');

  // objects containing row values
  const totalVol = [4552000,3537577,2447650,2400000,2041000,2030000,1602000];
  let currentVol = [];
  let labels = [];
  for (let i=0; i<7; i++) {
    labels.push(nicknames.get(i));
    currentVol.push(data[i].value);
  }
  let backObj = {label: "Total Volume",data: totalVol, backgroundColor: ["cyan"]}
  let frontObj = {label: "Current Volume", data: currentVol, backgroundColor: ["green"]}
  let userData = {};
  userData.labels = labels;
  userData.datasets = [backObj, frontObj];

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
  return <Bar data={userData} options={options} />;

};
export default BarChart;