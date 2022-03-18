import React from "react";
import CopyIcon from "./Copy";

const Dhpid = (props) => {
    return (
        <strong> DHP ID <CopyIcon data={props.publicKey} /></strong>
    )
}


export default Dhpid;