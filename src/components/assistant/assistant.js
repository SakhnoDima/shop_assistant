// export const config = { runtime: 'client' };
"use client";
import s from './assistant.module.scss';
import { useState } from "react";
import axios from "axios";

const Assistant = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isChatVisible, setChatVisible] = useState(true);
    const toggleChatVisibility = () => setChatVisible(!isChatVisible);

    const getAIResponse = async (userInput) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/generate_post_description", {
                text: userInput,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error('Error fetching AI response:', error);
            return 'Sorry, I am unable to respond at the moment.';
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = inputValue.trim();
        if (userMessage) {
            setMessages(currentMessages => [...currentMessages, { role: 'user', message: userMessage }]);
            setInputValue('');

            setLoading(true);

            try {
                const aiResponse = await getAIResponse(userMessage);
                setMessages(currentMessages => [
                    ...currentMessages,
                    { role: 'assistant', message: aiResponse }
                ]);
            } catch (error) {
                setMessages(currentMessages => [
                    ...currentMessages,
                    { role: 'assistant', message: 'Sorry, I am unable to respond at the moment.' }
                ]);
            } finally {
                setLoading(false);
            }
        }
    };


    const reversedMessages = [...messages].reverse();

    return (
        <div className={s['assistant-chat']}>
            <button className={s['toggle-chat']} onClick={toggleChatVisibility}>
                {isChatVisible ? '▼' : 'Chat 💬'}
            </button>

            {isChatVisible && (
                <>
                    <div className={s['chat-messages']}>
                        {reversedMessages.map((msg, index) => (
                            <div key={index} className={`${s.message} ${s[msg.role]}`}>
                                {msg.message}
                            </div>
                        ))}
                        {isLoading && <div className={`${s.message} ${s['assistant']}`}>Writing...</div>}
                    </div>
                    <form className={s['chat-input']} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <button className={s['chatAi-button']} type="submit" disabled={isLoading}>Send</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Assistant;