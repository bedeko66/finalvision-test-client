import React from 'react';
import { Step1 } from '../Step1';
import { Step2 } from '../Step2';
import { Step3 } from '../Step3';

const MainForm = () => {
    return ( 
        <>
        <div className="container">
            <Step1/>
            <Step2/>
            <Step3/>
        </div>
        </>
     );
}
 
export default MainForm;