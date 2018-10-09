import React from 'react';

import WaterLoader from '../WaterLoader';
import './app.pcss';

export default class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <WaterLoader />
            </div>
        );
    }
}
