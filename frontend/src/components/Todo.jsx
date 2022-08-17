import Layout from '../Layout/Layout'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useCookies } from "react-cookie";

export default function Todo(props) {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['userAuth', 'token', 'refreshToken']);

    useEffect(()=>{
        props.getdata(props.token);
    }, [window.onload])

    const updateStatus = async (id_no, done) => {
        const options = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${props.token}`,
                'Content-Type': 'application/json'
            },
            body: `{"done":${done == true ? 'false' : 'true'}}`
        };

        await fetch(`http://127.0.0.1:8000/api/updatetodo/${id_no}`, options)

        props.getdata(props.token);
    }

    const deleteTodo = async (id_no) => {
        await fetch(`http://127.0.0.1:8000/api/updatetodo/${id_no}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });

        props.getdata(props.token)
    }

    const removeCookieOnLogout = ()=> {
        removeCookie('userAuth');
        removeCookie('token');
        window.location.reload();
    }

    const cursorPointerStyle = {
        cursor: "pointer"
    }

    return (
        <Layout>
            <table border={2} style={{"margin": "2rem 0"}}>
                <thead>
                    <tr>
                        <td onClick={() => {navigate("/addtodo")}} style={cursorPointerStyle}>
                            Add Todo
                        </td>
                        <td style={cursorPointerStyle} onClick={removeCookieOnLogout}>
                            Logout
                        </td>
                        <td>Delete User</td>
                        <td>Update Details</td>
                        <td>Change Password</td>
                    </tr>
                </thead>
            </table>
            <table border={2}>
                <thead>
                    <tr>
                        <td style={{"textAlign": "center"}}>ID</td>
                        <td style={{"textAlign": "center"}}>Work</td>
                        <td style={{ "padding": "0.5rem 3rem" }}>Status</td>
                        <td style={{ "padding": "0.5rem 3rem" }}>Change Status</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <thead>
                    {
                        Object.entries(props.todos).map((todo, index) => 
                        <tr key={index}>
                            <td>{todo[1].id_no}</td>
                            <td>{todo[1].todo}</td>
                            <td style={{ "padding": "0.5rem 3rem"}}>
                                {todo[1].done == true ? 'tick' : 'false'}
                            </td>
                            <td>
                                <button onClick={() => {updateStatus(todo[1].id_no, todo[1].done)}}>Change</button>
                            </td>
                            <td>
                                <button onClick={() => {deleteTodo(todo[1].id_no)}}>Delete</button>
                            </td>
                        </tr>
                        )
                    }
                </thead>
            </table>

            <div className="user_data" style={{"margin": "2rem 0"}}>
                {props.users.username} <br />
                {props.users.first_name} <br />
                {props.users.last_name} <br />
                {props.users.email} <br />
            </div>
        </Layout>
    )
}
