import React from 'react'
import { CountUp } from 'use-count-up'


const CountriesList = ({ cName, cCases }) => {
    return (
        <div>
            <tr>
                <td style={{ color: "#696969", fontWeight: "bold" }}> {cName} </td>
                <td style={{ color: "#585858" }}> <strong> <CountUp isCounting 
                                                                    end={cCases} 
                                                                    duration={0.5}
                                                                    thousandsSeparator=","
                                                            /> 
                                                  </strong> 
                                                    </td>
            </tr>
        </div>
    )
}

export default CountriesList
