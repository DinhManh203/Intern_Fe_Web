import React from 'react';
import {
    SmartToyOutlined,
} from '@mui/icons-material';

const ChatMessage = ({ chat }) => {
    return (
        <div
            className={`flex items-start mb-4 ${chat.role === "model" ? "justify-start" : "justify-end"
                }`}
        >
            {chat.role === "model" && (
                <SmartToyOutlined className="text-gray-500 mr-2 mt-1" />
            )}
            <p
                className={`px-3 py-2 rounded-lg max-w-xs ${chat.role === "model"
                        ? "bg-gray-100 text-black"
                        : "bg-gray-500 text-white"
                    }`}
            >
                {chat.text}
            </p>
        </div>

    )
}

export default ChatMessage