import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useData } from "./DataContext";
import { toast } from 'react-toastify';

import './App.css';

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
        } catch (error) {
            toast.warning(error.message);
        }
    
        toast(`Thank you ${data.firstName}! Your details are sent!`);

        history.push("/")
    }
    return ( 
        <div className="container">
            <section className="module">
                <h5 className="tab">Step 1: Your details</h5>
                <h5 className="tab">Step 2: More comments</h5>
                <h5 className="tab">Step 3: Final comments</h5>
                <div className="container d-flex flex-column align-items-sm-center">
                    <h5 className="m-4" >My Details</h5>
                    <p className="my-data p-2">First Name:{finalData.firstName}</p>
                    <p className="my-data p-2">Surname: {finalData.surname}</p>
                    <p className="my-data p-2">Email: {finalData.email}</p>
                    <p className="my-data p-2">Telephone: {finalData.phone}</p>
                    <p className="my-data p-2">Gender: {finalData.gender}</p>
                    <p className="my-data p-2">Date of Birth: {finalData.birthday + '-' + finalData.birthmonth + '-' + finalData.birthyear}</p>
                    <p className="my-data p-2">Comments: {finalData.comments}</p>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </section>
        </div>
     );
}
