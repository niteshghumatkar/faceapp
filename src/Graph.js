import React, { useState } from 'react';
import Chart from "react-apexcharts";


function Graph(){
    const [no,setno]=useState(0);
    const [series,setseries]= useState([{
        name: "Desktops",
        data: [10]
    }])

    const [options,setoptions] = useState({
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570,600,630,660,690,720,750,780],
        },
        yaxis:{
            min:0,
            max:1
        }
      });

    const getData = () =>{
        setInterval(executeFunc,2000);

    }
    const executeFunc = () =>{
        setseries(
            [
                ...series,
                series[0].data=[...series[0].data,Math.random().toFixed(2)]
            ]
        )

    }    
      

    return(
        <div class="basis-1/2 border-2">
            
            <Chart options={options} series={series} type="line" height={350} />
            <button onClick={getData}>Start</button>
        </div>
    );
}

export default Graph;