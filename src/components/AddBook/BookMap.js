import React from 'react';
import AddBookCard from './AddBookCard';
import styled from 'styled-components';

const BookMapDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default function BookMap(props) {
    if(props.resultsarr){
        return(
            <BookMapDiv>
                <React.Fragment>
                    {props.resultsarr.map(book => (
                        <AddBookCard book={book} />
                    ))}
                </React.Fragment>
            </BookMapDiv>
        )
    } else {
        return <div>0 RESULTS</div>
    }

}
