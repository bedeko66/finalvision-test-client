import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from "./DataContext";
import Joi from "joi-browser";
import { toast } from 'react-toastify';

import './App.css';

export const Step1 = () => {

    const { setValues, data } = useData();

    const { register, handleSubmit, errors } = useForm({
        defaultValues: { firstName: data.firstName, surname: data.surname, email: data.email },
        mode: "onBlur",
    });

    useEffect(() => { 
       
        // const base = {}
        setValues({
            firstName:"",
            surname:"" ,
            email:"",
            phone: "",
            gender: "",
            birthdate: "" ,
            birthyear: "" ,
            birthmonth: "" ,
            birthday: "" ,
            comments:""
        })
        // eslint-disable-next-line
    },[]);

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
            <section className="module p-2">
            <h5 className="tab">Step 1: Your details</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex">
                <div className="form-group col-xs-4 col-md-4 mb-4">
                <label htmlFor="firstName">First Name</label>
                <input 
                    autocomplete="off"
                    id="firstName"
                    name="firstName"
                    type="text"
                    {...register('firstName')} 
                    />
                </div>
                <div className="form-group col-xs-4 col-md-4">
                <label htmlFor="surname">Surname</label>
                <input 
                    autocomplete="off"
                    {...register('surname')}
                    id="surname"
                    name="surname" 
                    type="text" 
                />
                </div>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                <label htmlFor="email">Email Address:</label>
                <input 
                    autocomplete="off"
                    {...register('email')}
                    id="email"
                    name="email" 
                    type="email" 
                />
                </div>
                <div className="clearfix m-2">
                    <button type="submit" className="btn btn-primary float-end">Next</button>
                </div>
            </form>
            <h5 className="tab">Step 2: More comments</h5>
            <h5 className="tab">Step 3: Final comments</h5>
            </section>
        </div>
    )
}