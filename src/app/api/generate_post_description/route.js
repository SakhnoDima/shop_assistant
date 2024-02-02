import {NextResponse} from "next/server";

const API_KEY = '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'

export async function POST(request, response) {
        const data = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": 'привіт'}]
            })
        })

        const json = await data.json();

        return NextResponse.json(json);

        // .then(response => {
        //     return response.json();
        // })
        // .then(data => {
        //     console.log(data.choices[0].message.content);
        //     // return data.choices[0].message.content
        // })
}
