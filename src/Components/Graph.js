import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';


const Graph = () => {
  let [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://covid19.mathdro.id/api/daily");
      const data = await response.json();
      setGraphData(data)
      // console.log(data);
      
    }
    getData();
    }, [])

    const date = graphData.map((preVal) => preVal.reportDate)

    const deathData = graphData.map((preVal) => preVal.deaths.total)

    const recoveredData = graphData.map((preVal) => preVal.totalConfirmed)

//   for graph
  const data = {
    labels: date,
    datasets: [
        {
          label: "Deaths",
          data: deathData,
          borderColor: "rgba(255,0,0,0.6)",
          backgroundColor: "rgba(255,0,0,0.6)"
        },
        // {
        //   label: "Recovered",
        //   data: ,
        //   borderColor: "rgba(0,255,0,0.6)",
        //   backgroundColor: "rgba(0,255,0,0.6)"
        // },
        {
          label: "Active",
          data: recoveredData,
          borderColor: "rgba(0,0,255,0.6)",
          backgroundColor: "rgba(0,0,255,0.6)"
        }
      ]
  };
  const option = {
    title: {
      display: true,
      // text: "Global Data"
    },
    // scales: {
      // yAxes: [
      //   {
      //     gridLines: {
      //       display: false
      //     }
      //     }
      // ],
    //   xAxes: [
    //     {
    //       gridLines: {
    //         display: false
    //       }
    //     }
    //   ]
    // }
  };

    return (
        <div>
          <h2 style={{ textAlign: "center",
                       marginBottom: "-30px",
                       marginTop: "-12px" 
                    }}>
                    Global Data Chart
          </h2>

          <Line data = {data} options={option} />
        </div>
    )
}

export default Graph
