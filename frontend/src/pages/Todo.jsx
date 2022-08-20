import { useEffect } from 'react'

export default function Todo(props) {

    // const getDataInTodoComponent = async () => {
    //     await props.getdata(props.token);
    // }

    useEffect(() => {
        console.log("Todo Component useEffect render starts");
        console.log(typeof (props.token));
        console.log(props.token);
        console.log(typeof (props.refreshToken));
        console.log(props.refreshToken);
        console.log("Todo Component useEffect render ends");
        // getDataInTodoComponent();
    }, [])

    return (
        <div>
            hi
            {/* <button onClick={getDataInTodoComponent}>
                getdata
            </button> */}
        </div>
    )
}
