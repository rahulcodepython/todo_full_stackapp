import React from 'react'

export default function Layout(props) {
    return (
        <div style={{ "position": "absolute", "top": "30%", "left": "30%", "border": "1px solid white", "padding": "3rem" }}>
            <div className="input_field" style={{ "display": "flex" }}>
                <input type="text" name="query" id="" />
                <div className="icon" style={{ "marginLeft": "1rem" }}>search</div>
            </div>
            <div className="todos" style={{ "marginTop": "1rem" }}>
                {props.children}
            </div>
        </div>
    )
}
