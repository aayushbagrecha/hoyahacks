import React, { useState } from 'react';

const Chatbot1 = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle chatbot visibility
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const baseUrl = process.env.REACT_APP_API_URL;

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add the user's message to the chat
    const userMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the user's message to the backend
      const response = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Add the backend's response to the chat
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Handle errors
      const errorMessage = { sender: 'bot', text: 'Error processing your request. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    // Clear user input
    setUserInput('');
  };

  const toggleChatbot = () => {
    if (!isOpen) {
      // Add an initial message when opening the chatbot
      setMessages([{ sender: 'bot', text: 'Please feel free to ask me anything...' }]);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white w-full max-w-md rounded-lg shadow-md flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Chatbot</h2>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleChatbot}
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '400px' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  } rounded-lg px-4 py-2 max-w-xs break-words`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleChatbot}
        >
          Chat with us
        </button>
      )}
    </div>
  );
};

export default Chatbot1;
