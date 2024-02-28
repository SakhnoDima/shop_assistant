import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request, response) {
  const reqBody = await request.json();

  const body = JSON.stringify({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: reqBody.text,
          },
        ],
      },
    ],
    max_tokens: 300,
  });

  try {
    const data = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.API_KEY,
        },
      }
    );

    return NextResponse.json(data.data.choices[0].message.content);
  } catch (err) {
    console.log(err);
    return NextResponse.status(500);
  }
}
