import {
    CREATE_PARTICLES,
    TICKER_STARTED,
    START_PARTICLES,
    STOP_PARTICLES,
    UPDATE_MOUSE_POS,
    TIME_TICK
} from '../../actions/types';
import { randomNormal, range, randomUniform } from 'd3';

const Gravity = 0.3,
      randNormal = randomNormal(0.3, 2),
      randNormal2 = randomNormal(0.5, 1.8);

const Inital_State = {
    particles: [],
    particleIndex: 0,
    particlesPerTick: 1000,
    charges: [],
    svgWidth: 800,
    svgHeight: 600,
    tickerStarted: false,
    generateParticles: false,
    mousePos: [null, null],
    lastFrameTime: null
};

const _generateCharges = (N, width, height) => (
    range(N).map(_ => ({
        x: randomUniform(.2*width, .8*width)(),
        y: randomUniform(.2*height, .8*height)(),
        strength: randomUniform(1000, 10000)()
    }))
);

export default (state = Inital_State, action) => {
    switch(action) {
        case 'TICKER_STARTED':
            return Object.assign({}, state, {
                tickerStarted: true
            });
        case 'START_PARTICLES':
            console.log('starting particles from reducer')
            return Object.assign({}, state, {
                generateParticles: true
            });
        case 'STOP_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: false
            });
        case 'UPDATE_MOUSE_POS':
            return Object.assign({}, state, {
                mousePos: [action.x, action.y]
            });
        case 'CREATE_PARTICLES':
            console.log( newParticles, "from reducer")
            let newParticles = state.particles.slice(0);
            let i;
            for (i = 0; i < action.N; i++) {
                let particle = {id: state.particleIndex+i,
                                x: action.x,
                                y: action.y};

                particle.vector = [particle.id%2 ? -randNormal() : randNormal(),
                                   -randNormal2()*3.3];

                newParticles.unshift(particle);
            }

            return Object.assign({}, state, {
                particles: newParticles,
                particleIndex: state.particleIndex+i+1
            });
        case 'TIME_TICK':
            let {svgWidth, svgHeight} = state,
                movedParticles = state.particles
                                      .filter((p) =>
                                          !(p.y > svgHeight || p.x < 0 || p.x > svgWidth))
                                      .map((p) => {
                                          let [vx, vy] = p.vector;
                                          p.x += vx;
                                          p.y += vy;
                                          p.vector[1] += Gravity;
                                          return p;
                                      });

            return Object.assign({}, state, {
                particles: movedParticles
            });
        default:
        return state;
    }
}