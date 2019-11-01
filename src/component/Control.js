import React from 'react'
import './control.scss'
import {player} from '../player'

const Control = (props) => {

    const {isPlaying} = props

    const handlePrev = () => {
        isPlaying && player.prev()
    }

    const handlePlay = () => {
        console.log('你点击了play按钮')
        !player.isEmpty && !isPlaying ? player.play() : player.pause()
        // !player.isEmpty && !isPlaying ? console.log('开始') : console.log('暂停') 
    }

    const handleNext = () => {
        isPlaying && player.next()
    }

    return (
        <div className={`control ${isPlaying ? 'control__playing' : ''}`}>
            <div className="control_btn control_btn__side" onClick={handlePrev}>
                <i className="fa fa-backward"/>
            </div>
            <div className="control_btn" onClick={handlePlay}>
                <span className="play-btn"/>
            </div>
            <div className="control_btn control_btn__side" onClick={handleNext}>
                <i className="fa fa-forward"/>
            </div>
        </div>
    )
}

export default Control