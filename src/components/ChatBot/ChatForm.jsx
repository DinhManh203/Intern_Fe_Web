import {
    Send,
} from '@mui/icons-material';
import { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);

            generateBotResponse([
                ...chatHistory,
                { role: "user", text: userMessage }
            ]);
        }, 600);
    }

    return (
        <div className="relative w-full">
            <form action="" onSubmit={handleFormSubmit}>
            <input
                ref={inputRef}
                className="w-full px-4 py-2 pr-10 border border-gray-300 focus:border-gray-400 rounded-md outline-none"
                type="text"
                placeholder="Type here..."
                required
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700">
                <Send className="w-5 h-5" />
            </button>
            </form>
        </div>

    )
}

export default ChatForm