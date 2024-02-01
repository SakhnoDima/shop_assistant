'use client'
import s from "./RunningStrip.module.scss"
import {useState} from "react";

const RunningStrip = () => {
    const [running, setRunning] = useState(true);


    return <>
        {running
            ? <div className={s.running_strip_container}>
                <div className={s.running_strip}>
                    <p>zxc: 1000-7?</p>
                </div>
                <div className={s.running_strip_btn} onClick={() => setRunning(false)}>
                    ×
                </div>
            </div>
            : ''
        }

    </>
}

export default RunningStrip;