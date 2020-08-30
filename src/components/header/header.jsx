import React from 'react';
import './header.css';

const Header = (props) => {
    const { totalScore, currentSection } = props;
    const arrTitles = ["Домашние птицы", "Лесные птицы", " Морские птицы", "Певчие птицы", "Хищные птицы", "Воробьиные"];

    let className = "page-link ";
    const listOfSections = [];
    for (let i = 0; i < arrTitles.length; i += 1) {
        if (i === currentSection) {
            const title = <li key={arrTitles[i] + "key1"} className={`${className}active`}>{arrTitles[i]}</li>
            listOfSections.push(title);
        }
        else {
            const title = <li key={arrTitles[i] + "key2"} className={className}>{arrTitles[i]}</li>
            listOfSections.push(title);
        }
    }
    return (
        <section className="header">
            <div className="top-panel d-flex">
                <img className="logo-box" src="https://appstudio.org/wp-content/uploads/2011/05/songbird.png" alt="logo" width="100" height="100" />
                <span className="score">Score: {totalScore}</span>
            </div>
            <ul className="pagination">
                {listOfSections}
            </ul>
        </section>
    )
}

export default Header;