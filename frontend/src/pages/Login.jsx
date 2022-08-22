import { useFormik } from 'formik';
import { useState } from 'react';

export default function Login(props) {

    const [confirmPassword, setConfirmPassword] = useState("");

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (value) => {
            // console.log("Login function starts");
            // console.log(`The user name is ${value.username} and the password is ${value.password}`);
            // console.log("Now gettoken function will call and it passes username and password");
            await props.gettoken(value.username, value.password, false);
            // console.log("Login function ends");
        }
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
                            <td><input type="password" name="confirm_password" id="confirm_password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} /></td>
                        </tr>
                        <tr>
                            <td colSpan={3}><input type="submit" value="Submit" style={{ "width": "100%" }} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
