import React from 'react'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

export default function AddTodo(props) {

    const navigate = useNavigate();

    const addTodo = async (value)=> {
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${props.token}`,
                'Content-Type': 'application/json'
            },
            body: `{"todo":"${value.todo}","done":"${value.done}"}`
        };
        
        await fetch('http://127.0.0.1:8000/api/addtodo', options)

        props.getdata(props.token);
    }

    const {values, handleChange, handleSubmit} = useFormik({
        initialValues: {
            todo: '',
            done: false
        },
        onSubmit: (value) => {
            addTodo(value);
            navigate("/");
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="todo" id="todo" value={values.todo} onChange={handleChange} />
                <input type="checkbox" name="done" id="done" value={values.done} onChange={handleChange} />
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}
