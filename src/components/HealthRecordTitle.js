import React from "react";
import FoldeIcon from "./Folder";

const RecordTitle = props => {
    return (
        <label className="form-label holder-record-title"> {props.children || <FoldeIcon />}  {props.title}</label>
    )
}

export default RecordTitle;