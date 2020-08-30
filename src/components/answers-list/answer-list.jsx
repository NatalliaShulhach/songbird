import React from 'react';
import { ShuffleObjCollection } from '../shuffleCollection';
import {
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup
} from '@material-ui/core';
import './answer-list.css';

const result = ShuffleObjCollection();

const AnswerList = (props) => {

  const {
  
    gameTurn,
    setName,
    nameBird,
    currentAnswer,
    fillDescriptionBlock,
    checkUserAnswer
  } = props;

  const handleChange = (event) => {
    setName(event.target.value);
    currentAnswer(true);
    fillDescriptionBlock(event.target.value);
    checkUserAnswer(event.target.value);
  };

  const answerOptions = 6;
  const answerBlock = [];
  for (let i = 0; i < answerOptions; i += 1) {
    let answerOption = <FormControlLabel
     
      value={result[gameTurn][i].name}
      control={<Radio size="small" />}
      label={result[gameTurn][i].name}
      className="option"
      key={result[0][i].name}
    />
    answerBlock.push(answerOption);
  }

  return (
    <div className="answerNode">
      <FormControl component="fieldset"
      aria-label="answer"
          name="answer-list"
          value={nameBird}
          onChange={handleChange}>
        <RadioGroup
          
        >
          {answerBlock}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default AnswerList;