import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Login from './components/Login';
import AddTodo from './components/AddTodo';
import { useCookies } from "react-cookie";
import {
    BrowserRouter,
    Routes,
    Route,
    } from "react-router-dom";

export default function App() {

    const [todos, setTodos] = useState("")
    const [user, setUser] = useState("")
    const [token, setToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [authUser, setAuthUser] = useState(false)
    const [cookies] = useCookies(['userAuth', 'token', 'refreshToken']);

    useEffect(() => {
        if ((cookies.userAuth !== "undefined")){
            setAuthUser(JSON.parse(cookies.userAuth));
            setToken(cookies.token);
            setRefreshToken(cookies.refreshToken);
        }
    }, [cookies])

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
        <BrowserRouter>
            <Routes>
                <Route index element={authUser == false ? <Login /> : <Todo todos={todos} users={user} token={token} getdata={getData} />} />
                <Route path="addtodo" element={<AddTodo token={token} getdata={getData} />} />
            </Routes>
        </BrowserRouter>
    )
}