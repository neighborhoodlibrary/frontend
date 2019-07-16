import React, { Component } from 'react';

import MainShelf from '../../components/Shelf/MainShelf';
import Borrowed from '../../components/Shelf/Borrowed';
import Loaned from '../../components/Shelf/Loaned';
import Library from '../../components/Shelf/Library';

export default class MyShelf extends Component {
    render() {
        return (
            {/* <Router>
                <div>
                    <Route exact path='/shelf' component={MainShelf} />
                    <Route exact path='/shelf/borrowed' component={Borrowed} />
                    <Route exact path='/shelf/loaned' component={Loaned} />
                    <Route exact path='/shelf/library' component={Library} />
                </div>
            </Router> */}
        )
    }
}
