import React, {useEffect, useState} from "react";

function ProgressBar({score, checkAnswer}) {

    const [width, setWidth] = useState(100);

    useEffect(() => {
        setWidth(100);
    }, [score]);

    useEffect( () => {
        const intervalID = setInterval( () => {
            if (width > 0) {
                setWidth(width - 1);
            } else {
                clearInterval(intervalID);
                checkAnswer();
            }
        }, 30);
        return () => {
            clearInterval(intervalID)
        }
    });

    const spanStyle = {
        width: width + '%',
        borderRadius: '15px'
    };

    return (
        <div className='bar'>
            <span id="progress-bar" style={spanStyle}/>
        </div>
    )
}

export default ProgressBar;