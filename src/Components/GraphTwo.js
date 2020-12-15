import React from 'react'
import { Bar } from 'react-chartjs-2'

const GraphTwo = ({ countryName, confirmed, recovered, deaths }) => {

    const data = {
        labels: ["Cases", "Recovered", "Deaths"],
        // , "Recovered", "Deaths"
        // ["jan","feb","mar","apr","may","june","jul","aug","sept","oct","nov","dec"]
        datasets: [
            {
              label: "People",
              data: [ confirmed, recovered, deaths ],
              borderColor: [
                "rgba(0,0,255,0.6)",
                "rgba(0,255,0,0.6)",
                "rgba(255,0,0,0.6)"
              ],
              backgroundColor: [
                "rgba(0,0,255,0.6)",
                "rgba(0,255,0,0.6)",
                "rgba(255,0,0,0.6)"
              ]
            }
          ]
        //   datasets: [
        //       {
        //           label: "Recoverd",
        //           data: [6],
        //           borderColor: "rgba(0,255,0,0.6)",
        //           backgroundColor: "rgba(0,255,0,0.6)"

        //       }
        //   ],
      };
      const option = {
        legend: { display: false },
        title: {
          display: true,
        },
      //   scales: {
      //     yAxes: [
      //       {
      //         ticks: {
      //           min: 0,
      //           max: 10,
      //           stepSize: 1
      //         }
      //       }
      //     ]
      //   }
      };

    return (
        <div>
            <h2 style={{ textAlign: "center", marginBottom: "-15px" }}> {countryName} Total Data </h2>
            <Bar className="bar_chart" data={data} options={option} />
        </div>
    )
}

export default GraphTwo;
