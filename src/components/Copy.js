import React, { useState } from 'react';

const CheckIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px"  viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
    )
}


const CopyIcon = (props) => {
    const [copied, setcopied] = useState(false);

    const onCopy= (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(props.data);
        setcopied(true);
        setTimeout( () => {
            setcopied(false);
        }, 2000)
    }
    return (
        <span className='copy-icon' onClick={onCopy}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 512 512"> <path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"/></svg>
          { copied && <span className='copiedText'> copied! <CheckIcon /> </span> }
        </span>
    )
}

export default CopyIcon;