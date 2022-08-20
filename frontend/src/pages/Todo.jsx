import { useEffect } from 'react'

export default function Todo(props) {

    const getDataInTodoComponent = async () => {
        await props.getdata(props.token);
    }

    useEffect(() => {
        getDataInTodoComponent();
    }, [])

    return (
        <div>
            <button onClick={getDataInTodoComponent}>
                getdata
            </button>
        </div>
    )
}
