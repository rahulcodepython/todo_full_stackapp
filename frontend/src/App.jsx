import { useEffect } from 'react'
import Todo from './components/Todo'

export default function App() {

    const fetch_todo = async () => {
        const url_get_todos = "http://127.0.0.1:8000/api";
        const data = await fetch(url_get_todos);
        const parsed_data = await data.json();

        return parsed_data
    }

    useEffect(() => {
        try {
            fetch_todo();
        } catch (e) {
            console.log(e);
        }
    }, []);

    const todos = [
        { todo: 'Go to market', done: true },
        { todo: 'Read Book', done: false },
        { todo: 'Make a progem', done: false }
    ]

    return (
        <div>
            <Todo todos={todos} />
        </div>
    )
}
