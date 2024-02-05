import s from "./generate_description.module.scss"
import {useState} from "react";

export const GenerateDescription = ({keyWords, img_url}) => {
    const [description, setDescription] = useState('')

    const getDescription = () => {
        fetch("/api/generate_post_description", {
            body: JSON.stringify({
                img_url: img_url,
                keyWords: keyWords
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            setDescription(data.choices[0].message.content)
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

