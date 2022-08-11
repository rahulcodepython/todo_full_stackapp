import React from 'react'

const layoutStyle = {
    "position": "absolute",
    "top": "30%",
    "left": "30%",
    "border": "1px solid black",
    "padding": "3rem",
}

export default function Layout(props) {
    return (
        <div style={layoutStyle}>
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
