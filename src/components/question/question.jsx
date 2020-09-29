import React, { useState, useEffect } from 'react';
// import { DATA } from '../dataCollection';
import { ShuffleObjCollection } from '../shuffleCollection';
import { randomNumber } from '../randomizer';
import AnswerList from '../answers-list/answer-list';
import DiscribeBird from '../discribe-bird/discribe-bird';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../header/header';
import correctAnswerAudio from "../sounds/correct_answer.mp3";
import incorrectAnswerAudio from "../sounds/wrong_answer.mp3";
import './question.css';
// import './question-mobile.css';

export default function QuestionNode() {
    const [currentTurn, setCurrentTurn] = useState(0);
    const [currentSelectedOption, setCurrentSelectedOption] = useState(null);
    const [answerOptionSelected, setAnswerOptionSelected] = useState(false);

    const [resultSignal, setResultSignal] = useState("");
    const [userAnswerSuccess, setUserAnswerSuccess] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [gameStarted, setGameStarted] = useState(false);

    const [randomIndex, setRandomIndex] = useState(null);
    const [collectionObjQuestions, setCollectionObjQuestions] = useState(null);

    const [score, setScore] = useState(0);
    const [winRate, setWinRate] = useState(5);

    const [nameBirdInQuestionNode, setNameBirdInQuestionNode] = useState("********");
    const [audioInQuestionNode, setAudioInQuestionNode] = useState("");
    const [imageInQuestionNode, setImageInQuestionNode] = useState("https://19mvmv3yn2qc2bdb912o1t2n-wpengine.netdna-ssl.com/science/files/2014/03/tnc_95047754_preview_cropped-820x461.jpg")

    const [imageInDescriptionNode, setImageInDescriptionNode] = useState("https://19mvmv3yn2qc2bdb912o1t2n-wpengine.netdna-ssl.com/science/files/2014/03/tnc_95047754_preview_cropped-820x461.jpg");
    const [audioInDescriptionNode, setAudioInDescriptionNode] = useState("");
    const [nameInDescriptionNode, setNameInDescriptionNode] = useState("******");
    const [latNameInDescriptionNode, setLatNAmeInDescriptionNode] = useState("**** ********");
    const [descriptionTextInDescriptionNode, setDescriptionTextInDescriptionNode] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");


    useEffect(() => {
        const number = randomNumber();
        setRandomIndex(number);
        const collectionQustions = ShuffleObjCollection();
        setCollectionObjQuestions(collectionQustions);
        setAudioInQuestionNode(collectionQustions[currentTurn][number].audio);
        setGameStarted(true);
    }, [currentTurn]);

    const playResultAudio = (value) => {
        if (!userAnswerSuccess && collectionObjQuestions[currentTurn][randomIndex].name === value) {
            setUserAnswerSuccess(true);
            setAnswerOptionSelected(true);
            setScore(score + winRate);
            setNameBirdInQuestionNode(value);
            setResultSignal(correctAnswerAudio);
            setAudioInQuestionNode("");
            setDisabled(false);
            return;
        }
        if (!userAnswerSuccess && value !== collectionObjQuestions[currentTurn][randomIndex].name) {
            setResultSignal(incorrectAnswerAudio);
            setUserAnswerSuccess(false);
            setAnswerOptionSelected(true);
            if (winRate !== 0) { setWinRate(winRate - 1); }
            setScore(score);
            return;
        }
        if (answerOptionSelected && userAnswerSuccess === true) {
            setResultSignal("");
            return;
        };
    }

    const ResultAudio = () => {
        const resultAudio = <ReactAudioPlayer src={resultSignal} className="audio-player" autoPlay />
        return resultAudio;
    }

    function setDefaultValues() {
        if (currentTurn + 1 === 6) {
            setGameStarted(false);
            return;
        }
        const number = randomNumber();
        setRandomIndex(number);
        setAudioInQuestionNode("")
        setCurrentSelectedOption(null);
        setCurrentTurn(currentTurn + 1);
        setNameBirdInQuestionNode("********");
        setImageInDescriptionNode("https://19mvmv3yn2qc2bdb912o1t2n-wpengine.netdna-ssl.com/science/files/2014/03/tnc_95047754_preview_cropped-820x461.jpg");
        setImageInQuestionNode("https://19mvmv3yn2qc2bdb912o1t2n-wpengine.netdna-ssl.com/science/files/2014/03/tnc_95047754_preview_cropped-820x461.jpg");
        setNameInDescriptionNode("*****");
        setAnswerOptionSelected(false);
        setResultSignal("");
        setAudioInQuestionNode(collectionObjQuestions[currentTurn + 1][randomIndex].audio);
        setUserAnswerSuccess(false);
        setWinRate(5);
        setScore(score);
        setDisabled(true);
    }

    function searchObjSelectedBird(nameBird) {
        for (let i = 0; i < collectionObjQuestions.length; i += 1) {
            let categorie = collectionObjQuestions[i];
            for (let j = 0; j < categorie.length; j += 1) {
                if (categorie[j].name === nameBird) {
                    if (collectionObjQuestions[currentTurn][randomIndex].name === nameBird) {
                        setImageInQuestionNode(categorie[j].image);
                    }
                    setNameInDescriptionNode(categorie[j].name);
                    setAudioInDescriptionNode(categorie[j].audio);
                    setLatNAmeInDescriptionNode(categorie[j].species);
                    setImageInDescriptionNode(categorie[j].image);
                    setDescriptionTextInDescriptionNode(categorie[j].description);
                    return;
                }
            }
        }
    }

    const ModalWindow = () => {
        let textMessage = null;
        if (score === 30) {
            textMessage = (
                <div className="birdQuestion">
                    <h1>Поздравляем!</h1>
                    <p><h4>Вы прошли викторину и набрали максимальное количество баллов!</h4></p>
                </div>
            )
        }
        if (score < 30) {
            textMessage = (
                <div className="modalWindow">
                    <h1>Поздравляем!</h1>
                    <h4>Вы прошли викторину и набрали {score} баллов из 30!</h4>
                </div>
            )
        }
        return textMessage;
    }

    return (
        <div>
            {gameStarted && <Header totalScore={score} currentSection={currentTurn} />}
            {gameStarted && <div className="birdQuestion">
                <div className="imageWrapper">
                    <img src={imageInQuestionNode} alt="birds" className="randomBirdImage" />
                </div>
                <div className="wrapperPlayer">
                    <span className="birdsName">{nameBirdInQuestionNode}</span>
                    <ReactAudioPlayer src={audioInQuestionNode} controls className="audioPlayer" />
                </div>
            </div>
            }

            {gameStarted && <div className="gameNode">
                <AnswerList
                    gameTurn={currentTurn}
                    setName={setCurrentSelectedOption}
                    currentAnswer={setAnswerOptionSelected}
                    fillDescriptionBlock={searchObjSelectedBird}
                    checkUserAnswer={playResultAudio}
                    nameBird={currentSelectedOption}
                />
                <DiscribeBird
                    pressedOption={answerOptionSelected}
                    name={nameInDescriptionNode}
                    latName={latNameInDescriptionNode}
                    image={imageInDescriptionNode}
                    audio={audioInDescriptionNode}
                    descriptionText={descriptionTextInDescriptionNode}
                />
            </div>
            }

            <ResultAudio />


            {gameStarted && <button type="button" className="btn btn-next-level" disabled={disabled} onClick={() => {
                setDefaultValues();
            }}
            >
                Следующий уровень</button>
            }
            {!gameStarted && <ModalWindow />}
        </div>
    )
}
