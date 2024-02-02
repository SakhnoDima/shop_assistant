import {NextResponse} from "next/server";

require('dotenv').config();

const API_KEY = process.env.SECRET_KEY;


export async function POST(request, response) {
    console.log(process.env)
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

        //const json = await data.json();

        return NextResponse.json(process.env.SECRET_KEY);


}

// fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + API_KEY
//     },
//     body: JSON.stringify({
//         "model": "gpt-4",
//         "messages": [{"role": "user", "content": 'Кто такой Сильвестр с талоном?'}]
//     })
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Full Response:', data);
//         if (data.choices && data.choices.length > 0) {
//             console.log( data.choices[0].message.content);
//         } else {
//             console.error('Error: Empty or undefined choices array');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
//
//
//
// const requestData = {
//     model: 'dall-e-3',
//     prompt: 'white tiger',
//     num_images: 1,
//     size: '1024x1024',
// };
//
// fetch('https://api.openai.com/v1/images/generations', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + API_KEY,
//     },
//     body: JSON.stringify(requestData),
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Generated Images:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
//
//
