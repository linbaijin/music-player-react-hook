import React, { useRef, useState, useEffect } from 'react'
import './disk.scss'
import { player } from '../player'


const Disk = (props) => {
    console.log(props)
    const { isPlaying, changeCoverUrl, togglePlay, coverUrl} = props
    const cover = useRef(null)
    const file = useRef(null)
    const [stopMatrix, setStopMatrix] = useState('')
    const handleChange = async () => {
        const target = file
        const files = target.current.files
        console.log(files)
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                await player.append(files[i])
            }
        }
        // target.value = ''
    }
    useEffect(() => {
        player.onReady.listen(() => {
            changeCoverUrl()
        })
        player.onChange.listen(() => {
            changeCoverUrl()
        })
        player.onPlay.listen(() => {
            togglePlay(true)
        })
        player.onPause.listen(() => {
            togglePlay(false)
        })
        
        if (!isPlaying) {
            console.log(window.getComputedStyle(cover.current).transform)
            setStopMatrix(window.getComputedStyle(cover.current).transform)
        } else {
            const matrix = stopMatrix
            setStopMatrix('')
            const match = matrix.match(/^matrix\(([^,]+),([^,]+)/)
            const [, sin, cos] = match || [0, 0, 0]
            const deg = ((Math.atan2(cos, sin) / 2 / Math.PI) * 360) % 360
            const styles = [...document.styleSheets]
            styles.forEach(style => {
                console.log(style)
                const rules = [...style.cssRules]
                rules.forEach(rule => {
                    if (rule.type === rule.KEYFRAMES_RULE && rule.name === 'rotate') {
                        console.log('hihihihihi')
                        rule.cssRules[0].style.transform = `rotate(${deg}deg)`
                        rule.cssRules[1].style.transform = `rotate(${deg + 360}deg)`
                    }
                })
            })
        }
    }, [isPlaying, changeCoverUrl, stopMatrix, togglePlay]);
    return (
        <div className={`disk ${isPlaying ? 'disk__playing' : ''}`}>
            <label
                className="disk_cover"
                ref={cover}
                htmlFor="file"
                style={{ 
                    transform: stopMatrix, 
                    backgroundImage:coverUrl ? `url(${coverUrl})` : ''
                }}
            >
            </label>
            <input
                id="file"
                ref={file}
                type="file"
                multiple
                accept="audio/*"
                onClick={(e) => { e.target.value = '' }}
                onChange={handleChange}
            />
        </div>
    )
}

export default Disk