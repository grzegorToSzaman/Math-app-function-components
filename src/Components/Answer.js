import React, {useEffect, useRef} from "react";

function Answer(props) {

    const handleEnter = e => {
        e.key === 'Enter' && props.enter();
    };

    return (
        <div className='answer'>
            <input
                type="number"
                autoComplete='off'
                // className='answer'
                name='answer'
                value={props.zeroInput}
                onChange={event => props.answer(event.target.value)}
                autoFocus={true}
                onKeyDown={handleEnter}
            />
        </div>
    )
}

export default Answer;