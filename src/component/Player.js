import React, { useState } from 'react'
import Control from './Control'
import Disk from './Disk'
import ProgressBar from './ProgressBar'
import './player.scss'

const COVER_URL = [
    require('../assets/cover.jpg'),
    require('../assets/cover2.jpg'),
    require('../assets/cover3.jpg')
]

const Player = () => {
    const [isPlaying, setPlaying] = useState(false)
    const [coverUrl, setCoverUrl] = useState('')

    const changeCoverUrl = () => {
        while(1) {
            const index = Math.floor(Math.random() * 3)
            const newCoverUrl = COVER_URL[index]
            if(coverUrl !== newCoverUrl) {
                setCoverUrl(newCoverUrl)
                break
            }
        }
    }

    return (
        <div className="player">
            <div className="player_disk">
                <Disk
                    isPlaying={isPlaying}
                    togglePlay={setPlaying}
                    coverUrl={coverUrl}
                    changeCoverUrl={changeCoverUrl}
                />
            </div>
            <div className="player_control">
                <Control 
                isPlaying={isPlaying}
                />
            </div>
            <div className="player_progress">
                <ProgressBar 
                isPlaying={isPlaying}
                />
            </div>
        </div>
    )
}

export default Player