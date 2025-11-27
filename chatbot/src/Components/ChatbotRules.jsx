import { useState } from "react";
import "../styles/Chatbot-style.css";

const ChatbotRules = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your Daily Task Assistant. How was your day?" }
  ]);
  const [input, setInput] = useState("");

  // Rule-based response system
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Greetings
    if (input.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return "Hello! Ready to tackle your tasks today? What would you like to work on?";
    }

    // Add task
    if (input.match(/add|create|new task/)) {
      return "Great! What task would you like to add to your list?";
    }

    // List tasks
    if (input.match(/list|show|what are|my tasks|all tasks/)) {
      return "I can help you organize your tasks! Try telling me about specific tasks you want to add or complete.";
    }

    // Complete task
    if (input.match(/done|complete|finished|finish/)) {
      return "Awesome! Which task did you complete? Feel free to tell me more about it.";
    }

    // Priority tasks
    if (input.match(/priority|important|urgent/)) {
      return "Prioritizing tasks is smart! What's your most important task right now?";
    }

    // Time-related
    if (input.match(/today|tomorrow|this week|deadline/)) {
      return "Time management is key! What do you need to get done and by when?";
    }

    // Progress check
    if (input.match(/progress|how am i doing|status/)) {
      return "Let's review! Tell me what you've accomplished so far today.";
    }

    // Motivation
    if (input.match(/tired|stressed|overwhelmed|help/)) {
      return "Take it one step at a time! Breaking tasks into smaller pieces can make them more manageable. What's one small thing you can do right now?";
    }

    // Break time
    if (input.match(/break|rest|pause/)) {
      return "Taking breaks is important! A short rest can boost your productivity. What will you do after your break?";
    }

    // Planning
    if (input.match(/plan|schedule|organize/)) {
      return "Good thinking! Planning ahead helps. What would you like to plan for?";
    }

    // Thank you
    if (input.match(/thank|thanks|appreciate/)) {
      return "You're welcome! Keep up the great work on your tasks!";
    }

    // Bye
    if (input.match(/bye|goodbye|see you|exit/)) {
      return "Goodbye! Keep being productive. Come back anytime you need help with your tasks!";
    }

    // Default response
    return "I'm here to help with your daily tasks! You can tell me about tasks you need to do, ask for help organizing, or let me know what you've completed.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getBotResponse(input) };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Daily Task Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotRules;
