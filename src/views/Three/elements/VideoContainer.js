import React, { Component} from 'react';

class VideoContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <video width="320" height="240" autoplay>
                <source src="movie.mp4" type="video/mp4">
                <source src="movie.ogg" type="video/ogg">
            <video/>
        );
    }
}

export default VideoContainer;
