import {
    CREATE_PARTICLES,
    TICKER_STARTED,
    START_PARTICLES,
    STOP_PARTICLES,
    UPDATE_MOUSE_POS,
    TIME_TICK
} from './types';

// create n particles at x, y coordinates

export function createParticles(N, x, y) {
    console.log(N, x ,y)
    console.log("create partilces from action")
    dispatch => {
        dispatch({
            type: CREATE_PARTICLES,
            x: x,
            y: y,
            N: N
         });
    }

}

export function tickTime() {
    return {
        type: TIME_TICK
    };
}

export function tickerStarted() {
    return {
        type: TICKER_STARTED
    }
}

export function startParticles() {
    console.log('action starting particles')
    dispatch =>{
        dispatch({
            type: START_PARTICLES
        })
    }

}

export function stopParticles() {
    return {
        type: STOP_PARTICLES
    }
}

export function updateMousePos(x, y) {
    return {
        type: UPDATE_MOUSE_POS,
        x: x,
        y: y
    }
}