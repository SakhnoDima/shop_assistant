import s from "./generate_description.module.scss"
import {useState} from "react";

export const GenerateDescription = () => {
    const [description, setDescription] = useState('')

    const getDescription = () => {
        fetch("/api/generate_post_description", {
            body: ({

            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res)
        })
    }


    return <>
        <div className={s.btn_for_generate_description} onClick={getDescription}>
            generate full description
        </div>

        {description
            ? description
            : ''
        }
    </>

}

