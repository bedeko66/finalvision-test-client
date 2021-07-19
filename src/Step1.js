import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from "./DataContext";
import Joi from "joi-browser";
import { toast } from 'react-toastify';


export const Step1 = () => {

    const { setValues, data } = useData();

    const { register, handleSubmit, errors } = useForm({
        defaultValues: { firstName: data.firstName, surname: data.surname, email: data.email },
        mode: "onBlur",
    });
    const history = useHistory();

    const schema = {
        firstName: Joi.string().alphanum().min(1).max(50).required().label("First Name"),
        surname: Joi.string().alphanum().min(2).max(50).required().label("Surname"),
        email: Joi.string().email().required().label("Email"),
    }

    const validate = (usrData) => {
        const options = { abortEarly: false };
        let ifNo = {
            isNumber:function(str) {
                var pattern = /[^a-zA-Z]/g;
                return pattern.test(str);
            }
        }
        if (ifNo.isNumber(usrData.firstName)){
            toast.error('Only text allowed')
            return 
        }
       
        const result = Joi.validate(usrData, schema, options);
        if (!result.error) return null;
        
        let v_errors = {};
        for (let item of result.error.details) {
            v_errors[item.path[0]] = item.message;
        }
        return v_errors;
    }

    const onSubmit = (data) => {
        let usrData = data

        
        let errors = validate(usrData);
        if (errors) {
            Object.values(errors).forEach(err => {
                toast.error(err)
                return
            })
        } else {  
            setValues(data)
            history.push("/step2")
        }
    }

    return (
        <div className="container m-2">
            <h5>Step 1: Your details</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstName">First Name</label>
                <input 
                    id="firstName"
                    name="firstName"
                    type="text"
                    {...register('firstName')} 
                    />
                <label htmlFor="surname">Surname</label>
                <input 
                    {...register('surname')}
                    id="surname"
                    name="surname" 
                    type="text" 
                />
                <label htmlFor="email">Email</label>
                <input 
                    {...register('email')}
                    id="email"
                    name="email" 
                    type="email" 
                />
                <button type="submit">Next</button>
            </form>
            <h5>Step 2: More comments</h5>
            <h5>Step 3: Final comments</h5>
        </div>
    )
}