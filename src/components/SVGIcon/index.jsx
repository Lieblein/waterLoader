import React from 'react';
import PropTypes from 'prop-types';

import bemClass from '../../utils/bem-cn';

@bemClass('svg-icon')
export default class SVGIcon extends React.Component {
    static propTypes = {
        iconFile: PropTypes.PropTypes.shape({
            viewBox: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired
        }).isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render(bem) {
        const { iconFile, width, height } = this.props;
        return (
            <svg
                className={ bem() }
                width={ `${width}px` }
                height={ `${height}px` }
                viewBox={ iconFile.viewBox }
            >
                <use xlinkHref={ `#${iconFile.id}` } />
            </svg>
        );
    }
}
