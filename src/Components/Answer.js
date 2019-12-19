import React, {useEffect, useRef} from "react";

function Answer(props) {
    const input = useRef(null);
    useEffect( () => {
        input.current.focus();
    });
    const handleEnter = e => {
        e.key === 'Enter' && props.enter();
    };
    return (
        <div style={{textAlign: 'center'}}>
            <input
                type="number"
                autoComplete='off'
                className='answer'
                name='answer'
                value={props.zeroInput}
                onChange={event => props.answer(event.target.value)}
                ref={input}
                onKeyDown={handleEnter}
            />
        </div>
    )
}

export default Answer;