import React, { useEffect, useState } from 'react';
import './App.css';

// importing all components 
import Header from './Components/Header';
import CountriesList from './Components/CountriesList.js';
import { FormControl, Select, MenuItem } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Graph from './Components/Graph';
import GraphTwo from './Components/GraphTwo';
import Footer from './Components/Footer';
import { CountUp } from 'use-count-up';
import { sortData } from './util';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Line } from 'react-chartjs-2';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(26),
//       height: theme.spacing(20),
//       textAlign: 'center',
//     },
//   },
// }));

function App() {

  // const classes = useStyles();

  // .toDateString();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1)

  // for dropdowm
  let [dropDownList, setDropDownList] = useState([]);

  // for dropdown changing data
  let [dropDownChange, setDropDownChange] = useState([]);

  // for onchange event
  let [dropDown, setDropDown] = useState("Worldwide");

  // for show data above graph 2
  let [showCountry, setShowCountry] = useState("Worlwide");

  // for lazy loading
  let [loading, setLoading] = useState(false);

  // for states data
  // let [stats, setStats] = useState([]);

  // for country list data
  let [countryList, setCountryList] = useState([]);


  // for change state and data in the state
  const updateData = async (event) => {
    const listning = event.target.value;
    setLoading(true)
    const url = listning === "Worldwide" ? 
                `https://disease.sh/v3/covid-19/all` : 
                `https://disease.sh/v3/covid-19/countries/${listning}`;
    
    const response = await fetch(url);
    const data = await response.json();
    setDropDownChange(data);
    setDropDown(listning);
    setShowCountry(data.country);
    setLoading(false)
    // consoles
    // console.log("data ternery" +data);
    // console.log(` listning ${listning}`);
    // .........................
  }

  // for states data
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      const data = await response.json();
      // console.log(data);
      setDropDownChange(data);
      setShowCountry("Worldwide");
      setLoading(false)
    }
    getData();      
  }, [])

  // for country listing
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      // console.log(data);
      let sortedData = sortData(data);
      setCountryList(sortedData);
      setDropDownList(data);
      setLoading(false)
    } 
    getData();    
  }, [])

  // for suspense (lazy loading)
  const lazyLoading = <CircularProgress style={{ color: "rgba(0,0,0,0.6)", zoom: "0.6" }} />;

  return (
    <div className="page_container">
      <div className="headers_container">
        <Header />
        {/* drop down for listing and change state by country */}
        <div className="drop_down">
          <FormControl>
            <Select style={{ width: "200px", height: "40px" }} variant='outlined' value={dropDown} onChange={updateData}>
              <MenuItem value="Worldwide"> Worldwide </MenuItem>
              {dropDownList.map((preData) => {
                return <MenuItem value={preData.countryInfo.iso2}> {preData.country} </MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="states_container">
        <div className="fcolumn">
          {loading ? 
          <div className="states">
            <div className="card_root">
              <div className="stats_cards" style={{ borderBottom: "14px solid rgba(0, 0, 255, 0.6)",
                                                  borderTop: "2px solid rgba(0, 0, 255, 0.6)" }} >
                <div className="card" >
                  <Typography style={{ letterSpacing: '2px',
                                      fontSize: '22px',
                                      fontFamily: "'Nunito Sans', sans-serif",
                                      fontWeight: '800', 
                                    }} 
                              variant={'h6'}>
                      Cases 
                  </Typography>

                  <Typography variant={'h6'} 
                              style={{ fontFamily: "'Work Sans', sans-serif",
                                      fontSize: "22px",
                                      fontWeight: 'bolder',
                                      marginBottom: '2px' 
                                    }} 
                  >   
                    {lazyLoading}
                  </Typography>

                  <Typography> ({yesterday.toDateString()}) </Typography>

                  <h4 style={{ fontFamily: "'Work Sans', sans-serif",
                              fontWeight: "lighter",
                              fontSize: "20px",
                            }}>
                    {lazyLoading}
                    <strong style={{ fontFamily: "'Nunito Sans', sans-serif"  }}> Total </strong> 
                  </h4>
                </div>
              </div>
            </div>
            <div className="card_root">
              <div className="stats_cards" style={{ borderBottom: "14px solid rgba(0, 255, 0, 0.6)",
                                                  borderTop: "2px solid rgba(0, 255, 0, 0.6)" }}>
                <div className="card" >
                  <Typography style={{ letterSpacing: '2px',
                                      fontSize: '22px',
                                      fontFamily: "'Nunito Sans', sans-serif",
                                      fontWeight: '800', 
                                    }} 
                              variant={'h6'}>
                      Recovered 
                  </Typography>

                  <Typography variant={'h6'} 
                              style={{ fontFamily: "'Work Sans', sans-serif",
                                      fontSize: "22px",
                                      fontWeight: 'bolder',
                                      marginBottom: '2px' 
                                    }} 
                  >   
                    {lazyLoading}
                  </Typography>

                  <Typography> ({yesterday.toDateString()}) </Typography>

                  <h4 style={{ fontFamily: "'Work Sans', sans-serif",
                              fontWeight: "lighter",
                              fontSize: "20px",
                            }}> 
                      {lazyLoading}  
                    <strong style={{ fontFamily: "'Nunito Sans', sans-serif"  }}> Total </strong> 
                  </h4>
                </div>
              </div>
            </div>
            <div className="card_root">
              <div className="stats_cards" style={{ borderBottom: "14px solid rgba(255, 0, 0, 0.6)", 
                                                  borderTop: "2px solid rgba(255, 0, 0, 0.6)" 
                                                }}>
                <div className="card">
                  <Typography style={{ letterSpacing: '2px',
                                      fontSize: '22px',
                                      fontFamily: "'Nunito Sans', sans-serif",
                                      fontWeight: '800', 
                                    }} 
                              variant={'h6'}>
                      Deaths 
                  </Typography>

                  <Typography variant={'h6'} 
                              style={{ fontFamily: "'Work Sans', sans-serif",
                                      fontSize: "22px",
                                      fontWeight: 'bolder',
                                      marginBottom: '2px' 
                                    }} 
                  >    
                    {lazyLoading} 
                  </Typography>

                  <Typography> ({yesterday.toDateString()}) </Typography>

                  <h4 style={{ fontFamily: "'Work Sans', sans-serif",
                              fontWeight: "lighter",
                              fontSize: "20px",
                            }}> 
                      {lazyLoading}  
                    <strong style={{ fontFamily: "'Nunito Sans', sans-serif"  }}> Total </strong> 
                  </h4>
                </div>
              </div>
            </div>
          </div> :
          <div className="states">
            <div className="card_root">
              <div className="stats_cards" style={{ borderBottom: "14px solid rgba(0, 0, 255, 0.6)",
                                                  borderTop: "2px solid rgba(0, 0, 255, 0.6)" }} >
                <div className="card" >
                  <Typography style={{ letterSpacing: '2px',
                                      fontSize: '22px',
                                      fontFamily: "'Nunito Sans', sans-serif",
                                      fontWeight: '800', 
                                    }} 
                              variant={'h6'}>
                      Cases 
                  </Typography>

                  <Typography variant={'h6'} 
                              style={{ fontFamily: "'Work Sans', sans-serif",
                                      fontSize: "22px",
                                      fontWeight: 'bolder',
                                      marginBottom: '2px' 
                                    }} 
                  >   
                    <CountUp isCounting end={dropDownChange.todayCases} duration={4} thousandsSeparator="," />
                  </Typography>

                  <Typography> ({yesterday.toDateString()}) </Typography>

                  <h4 style={{ fontFamily: "'Work Sans', sans-serif",
                              fontWeight: "lighter",
                              fontSize: "20px",
                            }}>
                      <CountUp isCounting end={dropDownChange.cases} duration={3} thousandsSeparator="," />
                    <strong style={{ fontFamily: "'Nunito Sans', sans-serif"  }}> Total </strong> 
                  </h4>
                </div>
              </div>
            </div>
            <div className="card_root">
              <div className="stats_cards" style={{ borderBottom: "14px solid rgba(0, 255, 0, 0.6)",
                                                  borderTop: "2px solid rgba(0, 255, 0, 0.6)" }}>
                <div className="card" >
                  <Typography style={{ letterSpacing: '2px',
                                      fontSize: '22px',
                                      fontFamily: "'Nunito Sans', sans-serif",
                                      fontWeight: '800', 
                                    }} 
                              variant={'h6'}>
                      Recovered 
                  </Typography>

                  <Typography variant={'h6'} 
                              style={{ fontFamily: "'Work Sans', sans-serif",
                                      fontSize: "22px",
                                      fontWeight: 'bolder',
                                      marginBottom: '2px' 
                                    }} 
                  >   
                    <CountUp isCounting end={dropDownChange.todayRecovered} duration={4} thousandsSeparator="," />
                  </Typography>

                  <Typography> ({yesterday.toDateString()}) </Typography>

                  <h4 style={{ fontFamily: "'Work Sans', sans-serif",
                              fontWeight: "lighter",
                              fontSize: "20px",
                            }}> 
                    <CountUp isCounting end={dropDownChange.recovered} duration={3} thousandsSeparator="," />  
                    <strong style={{ fontFamily: "'Nunito Sans', sans-serif"  }}> Total </strong> 
                  </h4>
                </div>
              </div>
            </div>
            <div className="card_root">
              <div className="stats_cards" style={{ borderBottom: "14px solid rgba(255, 0, 0, 0.6)", 
                                                  borderTop: "2px solid rgba(255, 0, 0, 0.6)" 
                                                }}>
                <div className="card">
                  <Typography style={{ letterSpacing: '2px',
                                      fontSize: '22px',
                                      fontFamily: "'Nunito Sans', sans-serif",
                                      fontWeight: '800', 
                                    }} 
                              variant={'h6'}>
                      Deaths 
                  </Typography>

                  <Typography variant={'h6'} 
                              style={{ fontFamily: "'Work Sans', sans-serif",
                                      fontSize: "22px",
                                      fontWeight: 'bolder',
                                      marginBottom: '2px' 
                                    }} 
                  >    
                    <CountUp isCounting end={dropDownChange.todayDeaths} duration={4} thousandsSeparator="," /> 
                  </Typography>

                  <Typography> ({yesterday.toDateString()}) </Typography>

                  <h4 style={{ fontFamily: "'Work Sans', sans-serif",
                              fontWeight: "lighter",
                              fontSize: "20px",
                            }}> 
                    <CountUp isCounting end={dropDownChange.deaths} duration={3} thousandsSeparator="," />  
                    <strong style={{ fontFamily: "'Nunito Sans', sans-serif"  }}> Total </strong> 
                  </h4>
                </div>
              </div>
            </div>
          </div> }
            <div className="graph_two">
              <GraphTwo confirmed={dropDownChange.cases} 
                        recovered={dropDownChange.recovered} 
                        deaths={dropDownChange.deaths} 
                        countryName={showCountry}
                        />
            </div>
        </div>
        <div className="right_side_list">
          <div className="list">
            <h2 className="list_heading"> All Countries List </h2>
            <div className="tr_list">
              {countryList.map((preVal) => {
                return <CountriesList 
                          key={preVal.countryInfo._id}
                            cName={preVal.country} 
                            cCases={preVal.cases}
                        />
              })}
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="graph">
            <Graph />
      </div>
      <Footer />
    </div>
  );
}

export default App;
