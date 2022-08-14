import { useState, useEffect } from 'react';
import Todo from './components/Todo'
import Login from './components/Login' 

export default function App() {

    const [todos, setTodos] = useState("")
    const [user, setUser] = useState("")
    const [token, setToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [authUser, setAuthUser] = useState(false)


    const getData = async (token)=> {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        await fetch('http://127.0.0.1:8000/api', options).then(response => response.json())
        .then(response => {setTodos(response.todos); setUser(response.user);})
        .catch(err => console.error(err));
    }

    return (
        <div>
            {authUser == false ? <Login auth={setAuthUser} token={setToken} refresh={setRefreshToken} getdata={getData} /> : <Todo todos={todos} users={user} token={token} getdata={getData} />}
        </div>
    )
}
