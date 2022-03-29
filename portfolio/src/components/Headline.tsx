import { Fragment } from 'react';

// Doesn't support the same keyword in different colours.

interface IHeadline {
    content: string
    keywords?: { [key: string]: string }
}

const getWord = (word: string, whitespace: string): string => `${word}${whitespace}`;

const Headline = ({ content, keywords }: IHeadline) => {
    const words = content.split(' ');

    return(
        <Fragment>
            <h1>
                {words.map((word, i, { length }) => {
                    const whitespace = i + 1 === length ? '' : ' ';

                    return keywords && word in keywords ?
                    <span key={i} style={{color: `${keywords[word]}`}}>{getWord(word, whitespace)}</span> :
                    getWord(word, whitespace);
                })}
            </h1>
        </Fragment>
    )
};

export default Headline;