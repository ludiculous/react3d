import { RESIZE_WINDOW } from './types';

export const windowResize = (stageWidth, stageHeight) => {

    console.log(stageWidth, stageHeight, "resizing from actions");
    return {
        type: RESIZE_WINDOW,
        payload: {
            stageWidth,
            stageHeight
        }
    }
};
