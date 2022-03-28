import { Fragment } from 'react';

// Doesn't support the same keyword in different colours.

interface IHeadline {
    content: string
    keywords?: { [key: string]: string }
}

const getWordWithSpace = (word: string): string => `${word} `;

const Headline = ({ content, keywords }: IHeadline) => {
    const words = content.split(' ');

    return(
        <Fragment>
            <h1>
                {words.map((word, i) => 
                    keywords && word in keywords ?
                    <span key={i} style={{color: `${keywords[word]}`}}>{getWordWithSpace(word)}</span> :
                    getWordWithSpace(word) 
                )}
            </h1>
        </Fragment>
    )
};

export default Headline;