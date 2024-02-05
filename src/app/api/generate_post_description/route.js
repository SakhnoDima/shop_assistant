import {NextResponse} from "next/server";

const API_KEY = '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'
export async function POST(request, response) {
    const body = await request.json()

    // console.log(body)

    const data = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            "model": "gpt-4-vision-preview",
            // "messages": [{"role": "user", "content": body.content}]
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": body.text
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": body.img_url[0]
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 300
        })
    })

    const json = await data.json();

    return NextResponse.json(json);
}

