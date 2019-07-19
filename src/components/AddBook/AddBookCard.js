import React from 'react';
import styled from 'styled-components';

const AddBookCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border: rgba(0,0,0,.5) solid black;
    border-radius: 2px;
    margin: 15px;
    max-width: 375px;
    -webkit-box-shadow: 0px 0px 14px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 14px -3px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 14px -3px rgba(0,0,0,0.75);
    font-family: 'Merriweather', serif;

    h2{
        line-height: fit-content;
        font-size: 1.15em;
    }

    .authorhold {
        display: flex;

        h3 {
            padding: 5px;
            font-size: 1em;
        }
    }

    &:hover {
        background-color: rgba(0,0,0,.02);
    }
`;

export default function AddBookCard(props) {

    return (
        <AddBookCardDiv>
            <h2>
                {props.book.title}
            </h2> 
            <div class="authorhold">
                
            </div>
            <div class="imghold">
                <img src={props.book.thumbnail} alt="Thumbnail"/>
            </div>
        </AddBookCardDiv>
    )
}
