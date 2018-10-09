import React from 'react';

import SVGIcon from '../../components/SVGIcon';
import bemClass from '../../utils/bem-cn';
import './water-loader.pcss';
import loaderState0 from './loader-state/0.svg';
import loaderState1 from './loader-state/1.svg';
import loaderState2 from './loader-state/2.svg';
import loaderState3 from './loader-state/3.svg';
import loaderState4 from './loader-state/4.svg';
import loaderState5 from './loader-state/5.svg';
import loaderState6 from './loader-state/6.svg';
import loaderState7 from './loader-state/7.svg';
import loaderState8 from './loader-state/8.svg';
import loaderState9 from './loader-state/9.svg';
import loaderState10 from './loader-state/10.svg';
import loaderState11 from './loader-state/11.svg';
import bubble from './bubble.svg';

const loaderStates = [
    null,
    { file: loaderState0, width: 94, height: 45 },
    { file: loaderState1, width: 113, height: 50 },
    { file: loaderState2, width: 167, height: 82 },
    { file: loaderState3, width: 180, height: 83 },
    { file: loaderState4, width: 189, height: 83 },
    { file: loaderState5, width: 200, height: 85 },
    { file: loaderState6, width: 208, height: 86 },
    { file: loaderState7, width: 217, height: 92 },
    { file: loaderState8, width: 244, height: 78 },
    { file: loaderState9, width: 283, height: 77 },
    { file: loaderState10, width: 334, height: 72 },
    { file: loaderState11, width: 363, height: 54 }
];
const PHASE_INTERVAL = 80;
const WAVE_BOTTOM = 170;

@bemClass('water-loader')
export default class WaterLoader extends React.Component {
    state = {
        isWaveAnimation: false,
        bubbleTop: 0,
        phaseIndex: 0
    };
    lastCall = null;
    intervalId = null;
    pageRef = null;
    bubbleTopMax = 0;

    componentDidMount() {
        this.intervalId = window.requestAnimationFrame(this.animate);

        const pageHeight = this.pageRef.clientHeight;
        this.bubbleTopMax = pageHeight - WAVE_BOTTOM;
    }

    componentWillUnmount() {
        this.intervalId && window.cancelAnimationFrame(this.intervalId);
    }

    animate = () => {
        const { isWaveAnimation } = this.state;

        if (isWaveAnimation) {
            // debounce
            const now = Date.now();
            const dif = now - this.lastCall;
            if (dif > PHASE_INTERVAL || this.lastCall === null) {
                this.lastCall = now;
                this.nextWave();
            }
        } else {
            this.moveBubble();
        }

        this.intervalId = window.requestAnimationFrame(this.animate);
    };

    nextWave = () => {
        const { phaseIndex } = this.state;
        let newPhaseIndex = 0;
        if (phaseIndex !== loaderStates.length) {
            newPhaseIndex = phaseIndex + 1;
        } else {
            this.setState({ isWaveAnimation: false });
        }
        this.setState({ phaseIndex: newPhaseIndex });
    };

    moveBubble = () => {
        const { bubbleTop } = this.state;
        if (bubbleTop > this.bubbleTopMax) {
            this.setState({ bubbleTop: 0, isWaveAnimation: true });
        } else {
            const minDif = 40;
            const dif = bubbleTop < minDif ? 1 : bubbleTop / minDif;
            this.setState({ bubbleTop: bubbleTop + dif });
        }
    };

    setPageRef = (pageRef) => {
        if (!pageRef) return;
        this.pageRef = pageRef;
    };

    render(bem) {
        const { phaseIndex, bubbleTop } = this.state;
        return (
            <div className={ bem() } ref={ this.setPageRef }>
                <div
                    className={ bem('bubble') }
                    style={{
                        top: bubbleTop,
                        opacity: (bubbleTop / this.bubbleTopMax) || 0
                    }}
                >
                    <SVGIcon
                        iconFile={ bubble }
                        width={ 30 }
                        height={ 30 }
                    />
                </div>
                <div className={ bem('phase-wrap') } style={{ bottom: WAVE_BOTTOM }}>
                    {
                        loaderStates.map((loaderState, index) => {
                            if (loaderState === null) return null;
                            const { file, width, height } = loaderState;
                            return (
                                <SVGIcon
                                    key={ index }
                                    className={ bem('phase', { active: index === phaseIndex }) }
                                    iconFile={ file }
                                    width={ width }
                                    height={ height }
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
