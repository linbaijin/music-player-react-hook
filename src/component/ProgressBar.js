import React, {useState, useEffect} from 'react'
import './progressBar.scss'
import { player } from '../player'

const ProgressBar = (props) => {
    const { isPlaying } = props
    const [name, setName] = useState('')
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0.001)
    const [progress, setProgress] = useState('')

    const getFormatTime = (time) => {
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60)
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    const getFormatName = (name) => {
        return name.replace(/\.mp3|.flac|.ape$/, '')
    }

    useEffect(() => {
        const draw = () => {
            requestAnimationFrame(draw)
            const progress = player.position / player.duration
            setProgress(`${(progress*100).toFixed(2)}%`)
            setPosition(player.position)
            setDuration(player.duration)
            setName(player.current.file ? player.current.file.name : '')
        }
        draw()
    },[])

    return (
        <div className={`progress ${isPlaying ? 'progress__playing' : ''}`}>
            <h2 className="progress_title">{getFormatName(name)}</h2>
            <p className="progress_text">
                {getFormatTime(position)} / {getFormatTime(duration)}
            </p>
            <div className="progress_line">
                <span style={{width:progress}} />
            </div>
        </div>
    )
}

export default ProgressBar