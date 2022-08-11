import { useState, useEffect } from 'react';
import Todo from './components/Todo'

export default function App() {

    const [todos, setTodos] = useState("")
    const [user, setUser] = useState("")

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwMTUzMjk4LCJpYXQiOjE2NjAxNDYwOTgsImp0aSI6IjBiODMxM2MyNzQ4ZTQ3YTFhOTljMGFiMGYxNDZlNWE5IiwidXNlcl9pZCI6MX0.OOu8EkxPvPEJwvYjPXn-V6Ia51kAkkBi8S2mkDnR61U'
        }
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/', options).then(response => response.json())
        .then(response => {setTodos(response.todos); setUser(response.user); console.log(response);})
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Todo todos={todos} users={user}/>
        </div>
    )
}
