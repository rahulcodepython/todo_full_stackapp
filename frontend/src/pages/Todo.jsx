import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Layout from '../Layout/Layout';

export default function Todo(props) {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['previousLogin', 'token', 'refreshToken', 'username', 'password']);

    useEffect(() => {
        // console.log("UseEffect starts in Todo component");
        props.getdata();
        // console.log("UseEffect ends in Todo component");
    }, []);

    const removeCookieOnLogout = () => {
        removeCookie(['previousLogin', 'token', 'refreshToken', 'username', 'password']);
    }

    const updateStatus = (id, done) => {
        console.log(id, done);
    }

    const deleteTodo = (id) => {
        console.log(id);
    }

    const getDataFromServerInStringFormate = sessionStorage.getItem('allTodos');
    const parsedTheDataFromServer = JSON.parse(getDataFromServerInStringFormate);

    return (
        <Layout>
            <button onClick={() => { props.getdata; }}>
                Refresh The data
            </button>
            <table border={2} style={{ "margin": "2rem 0" }}>
                <thead>
                    <tr>
                        <td onClick={() => { navigate("/addtodo") }} style={{ 'cursor': 'pointer' }}>
                            Add Todo
                        </td>
                        <td style={{ 'cursor': 'pointer' }} onClick={removeCookieOnLogout}>
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
                        <td style={{ "textAlign": "center" }}>ID</td>
                        <td style={{ "textAlign": "center" }}>Work</td>
                        <td style={{ "padding": "0.5rem 3rem" }}>Status</td>
                        <td style={{ "padding": "0.5rem 3rem" }}>Change Status</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <thead>
                    {
                        parsedTheDataFromServer.todos.map((todo, index) =>
                            <tr key={index}>
                                <td>{todo.id_no}</td>
                                <td>{todo.todo}</td>
                                <td style={{ "padding": "0.5rem 3rem" }}>
                                    {todo.done == true ? 'tick' : 'false'}
                                </td>
                                <td>
                                    <button onClick={() => { updateStatus(todo.id_no, todo.done) }}>Change</button>
                                </td>
                                <td>
                                    <button onClick={() => { deleteTodo(todo.id_no) }}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </thead>
            </table>

            <div className="user_data" style={{ "margin": "2rem 0" }}>
                {parsedTheDataFromServer.user.username} <br />
                {parsedTheDataFromServer.user.first_name} <br />
                {parsedTheDataFromServer.user.last_name} <br />
                {parsedTheDataFromServer.user.email} <br />
            </div>
        </Layout>
    )
}
