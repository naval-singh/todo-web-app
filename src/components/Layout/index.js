import React from "react";
import Header from "../Header";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div style={{marginTop: 70}}>
                {props.children}
            </div>
        </>
    )
}

export default Layout