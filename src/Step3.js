import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from "./DataContext";

import './App.css';

export const Step3 = () => {

const { setValues, data } = useData();
const history = useHistory();

const { register, handleSubmit, errors } = useForm({
    defaultValues: { 
        comments: data.comments,
     },
    mode: "onBlur",
});


const onSubmit = async (usrData) => {  
    setValues(usrData)
    history.push("/step4")
}

    return (
        <div className="container m-2">
            <section className="module">
                <h5 className="tab">Step 1: Your details</h5>
                <h5 className="tab">Step 2: More comments</h5>
                <h5 className="tab">Step 3: Final comments</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group col-xs-4 col-md-4">
                        <label htmlFor="comments" className="m-2">Comments</label>
                        <textarea 
                        id="commetns"
                        {...register('comments')} 
                        name="comments" 
                        type="text" 
                        cols="30" rows="5"></textarea>
                    </div> 
                    <div className="clearfix m-2">
                        <button type="submit" className="btn btn-primary float-end">Next</button>
                    </div>
                </form>
            </section>
        </div>
    )
}