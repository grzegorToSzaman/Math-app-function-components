import React, {useEffect, useRef} from 'react';
import Zoom from 'react-reveal/Zoom';

function WelcomeWindow(props) {
    const keyDown = e => {
        e.key === 'Enter' && props.close()
    };
    const input = useRef(null);
    useEffect( () => {
        input.current.focus();
        document.addEventListener('keydown', keyDown);
        return () => {
            document.removeEventListener('keydown', keyDown);
        }
    });
    return (
        <div className='welcome'>
            <Zoom top delay={0}><h1>HELLO!</h1></Zoom>
            <Zoom delay={200} top><h2>Are You ready for some math?</h2></Zoom>
            <Zoom top delay={300}><h4>Your name:</h4></Zoom>
            <Zoom delay={450} top><input onChange={event => props.userName(event.target.value)} ref={input} defaultValue='GallAnonim'/></Zoom>
            <Zoom delay={600} top><button onClick={props.close}>YES!</button></Zoom>
        </div>
    )
}

export default WelcomeWindow