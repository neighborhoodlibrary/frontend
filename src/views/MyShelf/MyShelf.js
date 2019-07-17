import React, { Component } from 'react';
import MainShelf from '../../components/Shelf/MainShelf';
import styled from 'styled-components';

const MainContainer = styled.div`

`

export default class MyShelf extends Component {
    render() {
        return (
                <MainContainer>
                    <MainShelf />
                </MainContainer>
        )
    }
}
