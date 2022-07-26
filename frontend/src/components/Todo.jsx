import React from 'react'
import Layout from './Layout'

export default function Todo(props) {
    return (
        <Layout>
            <table>
                {
                    props.todos.map((todo) => (
                        <tr key={todo.todo}>
                            <td>{todo.todo}</td>
                            <td style={{ "padding": "0.5rem 3rem" }}>tick</td>
                            <td>delete</td>
                        </tr>
                    ))
                }
            </table>
        </Layout>
    )
}
