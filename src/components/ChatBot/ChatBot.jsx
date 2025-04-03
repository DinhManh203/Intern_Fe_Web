import React, { useState, useRef, useEffect } from 'react';
import {
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    SmartToyOutlined,
} from '@mui/icons-material';
import ChatForm from '../ChatBot/ChatForm';
import ChatMessage from './ChatMessage';

const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const chatBodyRef = useRef(null);

    const toggleChat = () => setIsOpen(prev => !prev);

    const generateBotResponse = async (history) => {
        const updateHistory = (text) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
        };

        history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history }),
        };

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();

            if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

            if (!data.candidates || !data.candidates[0]?.content?.parts) {
                throw new Error("Invalid API response structure");
            }

            const apiResponseText = data.candidates[0].content.parts[0].text
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .trim();

            updateHistory(apiResponseText);
            console.log(apiResponseText);

        } catch (error) {
            console.error("Error fetching bot response:", error);
            updateHistory("⚠️ Bot is currently unavailable. Please try again later.");
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [chatHistory]);

    return (
        <div className='fixed bottom-0 right-0 m-4 w-80'>
            <div className={`bg-white shadow-lg rounded-lg overflow-hidden float-end transition-all duration-300 ${isOpen ? "h-[62vh] w-[30vw]" : "h-[50px]"}`}>
                {/* Chatbot header */}
                <div className='flex items-center justify-between p-3 bg-gray-200 cursor-pointer' onClick={toggleChat}>
                    <div className='flex items-center'>
                        <SmartToyOutlined className='text-gray-500' />
                        <h2 className='ml-2 text-lg font-semibold text-gray-700'>Chatbot Advise</h2>
                    </div>
                    <button className='text-gray-600'>
                        {isOpen ? <KeyboardArrowDownOutlined /> : <KeyboardArrowUpOutlined />}
                    </button>
                </div>

                {/* Chatbot Body */}
                {isOpen && (
                    <div ref={chatBodyRef} className='p-4 h-[45vh] overflow-y-auto bg-white'>
                        <div className='flex items-center mb-4'>
                            <SmartToyOutlined className='text-gray-500' />
                            <p className='ml-2 text-gray-800 bg-gray-100 p-2 rounded-md'>Hey there! 👋</p>
                        </div>

                        {/* Render the chat history dynamically */}
                        {chatHistory.map((chat, index) => (
                            <ChatMessage key={index} chat={chat} />
                        ))}
                    </div>
                )}

                {/* Chat input */}
                {isOpen && (
                    <div className='flex items-center p-4 bg-gray-200'>
                        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBot;
