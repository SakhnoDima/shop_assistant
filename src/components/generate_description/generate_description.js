import s from "./generate_description.module.scss"
import {useEffect, useState} from "react";

export const GenerateDescription = ({keyWords, img_url, name, category}) => {
    const [description, setDescription] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isShowBtn, setShowBtn] = useState(true)

    const generateTextToImg = () => {
        return 'Please create an SEO description for this product, considering its name: ' + name + ', category: ' + category + ', photo, and the following key phrases: ' + keyWords + '. Please include features, benefits, and any other important information for maximum optimization for search engines. 40-70 words'
    }

    const text = generateTextToImg()
    const getDescription = () => {
        setShowBtn(false)
        setLoading(true)
        fetch("/api/generate_post_description", {
            body: JSON.stringify({
                img_url: img_url,
                text: text,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            setDescription(data.choices[0].message.content)
            setLoading(false)
        })
    }
    return <>
        <div>
            {isShowBtn
                ? <div className={s.btn_for_generate_description} onClick={getDescription}>
                    generate description
                </div>
                : ''
            }

            <div className={s.description_block}>
                {isLoading
                    ? 'Loading...'
                    : <div>{description}</div>
                }
            </div>
        </div>

    </>

}

