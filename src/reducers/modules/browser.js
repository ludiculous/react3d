import {RESIZE_WINDOW} from '../../actions/types';

const Inital_State = {
    stageWidth: 0,
    stageHeight: 0,
    offSet: 0
}

export default (state = Inital_State, action) => {
    switch (action.type) {

        case RESIZE_WINDOW:
            console.log(action.payload)
            return {...state,
                stageWidth: action.payload.stageWidth,
                stageHeight: action.payload.stageHeight
            };

        default:
            return state;
    }
}

