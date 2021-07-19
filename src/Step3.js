import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useData } from "./DataContext";
import { toast } from 'react-toastify';


export const Step3 = () => {

const { setValues, data } = useData();
// const { formData } = useData() 
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
            <h5>Step 1: Your details</h5>
            <h5>Step 2: More comments</h5>
            <h5>Step 3: Final comments</h5>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <label htmlFor="comments">Comments</label>
                <textarea 
                id="commetns"
                {...register('comments')} 
                name="comments" 
                type="text" 
                cols="30" rows="5"></textarea>
                <button type="submit">Next</button>
            </form>
        </div>
    )
}