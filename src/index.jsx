import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './components/header/header';
import QuestionNode from './components/question/question';
import './index.css';
// import {
//   // CardPrimaryContent,
//   // CardMedia,
//   // CardActions,
//   // CardActionButtons,
//   // CardActionIcons
// } from "@material/react-card";

const Box = (
    <div className="wrapper">
        {/* <Header score={0}/> */}
        <QuestionNode />
    </div>
);

ReactDOM.render(Box, document.getElementById('root'));