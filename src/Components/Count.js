import React from 'react'
import { CountUp } from 'use-count-up'

const Count = ({ data }) => {
    return (
        <div>
            <div>
                {/* for main states display  */}
                <CountUp isCounting end={data} duration={4} thousandsSeparator="," />      
            </div>
        </div>
    );
};

export default Count
