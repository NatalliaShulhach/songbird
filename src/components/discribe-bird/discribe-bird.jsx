import React from 'react';
// import { DATA } from '../dataCollection';
import ReactAudioPlayer from 'react-audio-player';
import './discribe-bird.css';


const DiscribeBird = (props) => {
    const { name, audio, latName, image, descriptionText, pressedOption } = props;

    const content = [];
    let cont = null;
    if (pressedOption === true) {
        cont = <div key="discriptionNode" className="discriptionNode">
            <div className="dataBird">
                <img src={image} alt="birds" className="birdImage" />
                <div className="dataBd">
                    <p className="discribeBirdsName">{name}</p>
                    <p className="discribeBirdsName">{latName}</p>
                    <ReactAudioPlayer src={audio} controls className="audioPl" />
                </div>
            </div>
            <div className="textBlock">
                {descriptionText}
            </div>
        </div>
    }
    if (pressedOption === false) {
        cont = <div key="rule" className="discriptionNode"> Послушайте плеер и выберите птицу из списка</div>
    }

    content.push(cont);

    return content;
}

export default DiscribeBird;

// currentPressedOption