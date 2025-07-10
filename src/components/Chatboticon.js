import React, { useEffect, useRef, useState } from 'react';
import { RiChatVoiceAiLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import '../styles/chatbot.css';
import Chatform from './Chatform';
import ChatMessage from './ChatMessage';
import RestaurantInfo from './RestaurantInfo';

function Chatboticon() {
  const [chatHistry, setChatHistry] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponce = async (history) => {
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const userMessage = history[history.length - 1]?.text;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: RestaurantInfo }],
            },
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

      setChatHistry(prev => {
        const filtered = prev.filter(msg => msg.text !== "...");
        return [...filtered, { role: "model", text: botReply }];
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatHistry(prev => {
        const filtered = prev.filter(msg => msg.text !== "...");
        return [...filtered, { role: "model", text: "Something went wrong. Please try again." }];
      });
    }
  };


  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistry]);

  return (
    <div className='chatbot-container'>
      {/* Toggle Button */}
      <button id='chatbot-toggle' onClick={() => setIsOpen(!isOpen)}>
        <span className='material-symbols-rounded'>
          {isOpen ? <IoMdClose /> : <RiChatVoiceAiLine />}
        </span>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className='chatbot-popup animated-popup'>
          <div className='chat-header'>
            <div className='header-info'>
              <RiChatVoiceAiLine />
              <h2>Chatbot</h2>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <IoIosArrowDown />
            </button>
          </div>

          <div ref={chatBodyRef} className='chat-body'>
            <div className='message bot-message'>
              <RiChatVoiceAiLine />
              <p className='message-text'>Hi! Welcome to <strong>SHIV AURICA</strong>.<br />
                Ask me anything about our menu, hours, or location!</p>
            </div>
            {chatHistry.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className='chat-footer'>
            <Chatform
              chatHistry={chatHistry}
              setChatHistry={setChatHistry}
              generateBotResponce={generateBotResponce}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatboticon;
