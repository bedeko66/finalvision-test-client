import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useData } from "./DataContext";
import { toast } from 'react-toastify';


export const FormDataCheck = () => {
    const history = useHistory();
    const { setValues, data } = useData();
    const [finalData, setFinalData] = useState({})

    useEffect(() => { 
        setFinalData(data)
        // eslint-disable-next-line
    },[]);

    const handleSubmit = async (usrData) => {
        //send to db
        try {
            
            const payload = {
                firstname: data.firstName,
                surname: data.surname,
                email :data.email,
                phone: data.phone,
                gender: data.gender,
                birthdate:  data.birthday + '-' + data.birthmonth + '-' + data.birthyear,
                comments: data.comments
            }
            
            console.log(payload);
            const res = await axios.post('http://localhost:5000/user-form/save', { payload })
            console.log(res)
        } catch (error) {
            toast.warning(error.message);
        }
    
        toast(`Thank you ${data.firstName}! Your details are sent!`);
        history.push("/")
    }
    return ( 
        <div className="container">
            <h5>Step 1: Your details</h5>
            <h5>Step 2: More comments</h5>
            <h5>Step 3: Final comments</h5>
            <div>
                <h5>My Details</h5>
                <p>First Name:{finalData.firstName}</p>
                <p>Surname: {finalData.surname}</p>
                <p>Email: {finalData.email}</p>
                <p>Telephone: {finalData.phone}</p>
                <p>Gender: {finalData.gender}</p>
                <p>Date of Birth: {finalData.birthday + '-' + finalData.birthmonth + '-' + finalData.birthyear}</p>
                <p>Comments: {finalData.comments}</p>
                <button type="button" onClick={handleSubmit} className="btn">Submit</button>
            </div>
        </div>
     );
}
