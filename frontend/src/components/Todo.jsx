import React from 'react'
import Layout from './Layout'

export default function Todo(props) {

    const changeDoneStatus = ()=> {
        console.log("function");
    }

    return (
        <Layout>
            <table border={2}>
                <thead>
                    <tr>
                        <td style={{"textAlign": "center"}}>ID</td>
                        <td style={{"textAlign": "center"}}>Work</td>
                        <td style={{ "padding": "0.5rem 3rem" }}>Status</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <thead>
                    {
                        Object.entries(props.todos).map((todo, index) => 
                        <tr key={index}>
                            <td>{todo[1].id_no}</td>
                            <td>{todo[1].todo}</td>
                            <td style={{ "padding": "0.5rem 3rem"}} onClick={() => {
                                todo[1].done == true ? todo[1].done = false : todo[1].done = true
                                }}>
                                    {todo[1].done == true ? 'tick' : 'false'}
                            </td>
                            <td>delete</td>
                        </tr>
                        )
                    }
                </thead>
            </table>

            <div className="user_data">
                {props.users.username} <br />
                {props.users.first_name} <br />
                {props.users.last_name} <br />
                {props.users.email} <br />
            </div>
        </Layout>
    )
}
