import React, { useRef } from 'react';
import { FaChevronUp } from "react-icons/fa";

function Chatform({ setChatHistry, generateBotResponce, chatHistry }) {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;

        inputRef.current.value = "";

        const updatedHistory = [...chatHistry, { role: "user", text: userMessage }];
        setChatHistry(updatedHistory); // Update chat history first

        // Optional: show a quick "thinking..." message
        setChatHistry(prev => [...prev, { role: "model", text: "..." }]);

        generateBotResponce(updatedHistory); // Pass updated history to Gemini API
    };

    return (
        <form className='chat-form' onSubmit={handleFormSubmit}>
            <input
                type='text'
                ref={inputRef}
                placeholder='Message...'
                className='message-input'
                required
            />
            <button className='material-symbols-rounded'><FaChevronUp /></button>
        </form>
    );
}

export default Chatform;
