import { useFormik } from 'formik';
import { useState } from 'react';

export default function Login(props) {

    const [pass, setPass] = useState("")

    const getToken = async (value)=> {
        const options = {
            method: 'POST',
            body: `{"username":"${value.username}","password":"${value.password}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await fetch('http://127.0.0.1:8000/api/token/', options)
        .then(response => response.json())
        .then(response => {
            if (response.detail == null){
                props.auth(true); 
                props.token(response.access); 
                props.refresh(response.refresh); 
                props.getdata(response.access);
            }
            else{
                props.auth(false)
                alert("The user is not valid try something new !")
            }
        })
    }

    const {values, handleChange, handleSubmit} = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (value) => {getToken((value))}
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Username:</th>
                            <th>Password:</th>
                            <th>Confirm Password:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="username" id="username" value={values.username} onChange={handleChange} /></td>
                            <td><input type="password" name="password" id="password" value={values.password} onChange={handleChange} /></td>
                            <td><input type="password" name="confirm_password" id="confirm_password" value={pass} onChange={(e) => {setPass(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <td colSpan={3}><input type="submit" value="Submit" style={{"width": "100%"}} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
