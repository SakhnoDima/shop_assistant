'use client'
import s from "./RunningStrip.module.scss"
import {useState} from "react";


const RunningStrip = ({info}) => {
    const [running, setRunning] = useState(true);


    return <>
        {running
            ?  <div className={s.running_strip_container}>
                <div className={s.running_strip}>
                    {info}
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