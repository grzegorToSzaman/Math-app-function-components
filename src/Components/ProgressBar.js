import React from "react";

function ProgressBar(props) {
    const spanStyle = {
        width: props.width + '%',
        borderRadius: '15px'
    };
    return (
        <div className='bar'>
            <span id="progress-bar" style={spanStyle}/>
        </div>
    )
}

export default ProgressBar;