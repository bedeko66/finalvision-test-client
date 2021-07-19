import React,  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from "./DataContext";

import Joi from "joi-browser";
import { toast } from 'react-toastify';

export const Step2 = () => {

const history = useHistory();

const { setValues, data } = useData();

const { register, handleSubmit, errors } = useForm({
    defaultValues: { 
        phone: data.phone,
        gender: data.gender,
        birthday: data.birthday,
        birthmonth: data.birthmonth,
        birthyear: data.birthyear
     },
    mode: "onBlur",
});

const schema = {
    phone: Joi.number().min(10).required().label("Phone"),
    gender: Joi.string().alphanum().label("Gender"),
    birthday: Joi.number().min(1).max(31).label("Day of birth"),
    birthmonth: Joi.number().min(1).max(12).label("Month of birth"),
    birthyear: Joi.number().min(1900).max(2021).label("Year of birth"),
}
const validate = (usrData) => {
    const options = { abortEarly: false };
   
    const result = Joi.validate(usrData, schema, options);
    if (!result.error) return null;
    
    let v_errors = {};
    for (let item of result.error.details) {
        v_errors[item.path[0]] = item.message;
    }
    return v_errors;
}

const onSubmit = (usrData) => {

    let errors = validate(usrData);
    if (errors) {
        Object.values(errors).forEach(err => {
            toast.error(err)
            return
        })
    } else {  
        setValues(usrData)

        // setValues(birthdate)
        // console.log(usrData);
        // console.log(data);
        history.push("/step3")
    }
}

    return (
        <div className="container m-2 d-flex flex-column align-center">
            <h5>Step 1: Your details</h5>
            <h5>Step 2: More comments</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="phone">Telephone number</label>
                <input 
                    {...register('phone')}
                    name="phone" 
                    type="text" 
                />
                <label htmlFor="gender">Gender</label>
                <input 
                    {...register('gender')} 
                    name="gender" 
                    type="text" 
                />
                <label >Date of Birth</label>
                <input {...register('birthday')} name="birthday" min="1" max="31" type="number" placeholder="birthday" />
                <input {...register('birthmonth')} name="birthmonth" min="1" max="12" type="number" placeholder="birthmonth" />
                <input {...register('birthyear')} name="birthyear" min="1920" max="2021" type="number" placeholder="birthyear" />
                <button type="submit">Next</button>
            </form>
            <h5>Step 3: Final comments</h5>
        </div>
    )
}