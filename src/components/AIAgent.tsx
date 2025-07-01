
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const suggestedActions = [
  "Show my account balance",
  "Pay electricity bill",
  "Analyze spending patterns",
  "Schedule recurring payment",
  "Show recent transactions",
  "Help with budget planning"
];

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        setMessages([{
          id: '1',
          text: "Hello! I'm your AI Banking Assistant. I'm here to help you manage your accounts, pay bills, and analyze your financial data. How can I assist you today?",
          sender: 'agent',
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me pull up your account information...",
        "Sure! I'll process that payment for you. Please confirm the details...",
        "Based on your spending patterns, I've identified some interesting insights...",
        "I've found your recent transactions. Would you like me to categorize them?",
        "Your current account balance is $12,459.32. Is there anything specific you'd like to know?",
        "I can set up that recurring payment for you. What's the frequency you prefer?"
      ];

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedAction = (action: string) => {
    handleSendMessage(action);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg animate-pulse"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 bg-card border-border shadow-2xl transition-all duration-300 animate-scale-in ${
      isMinimized ? "h-16 w-80" : "h-[500px] w-96"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Banking Assistant</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Actions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Quick Actions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedActions.slice(0, 3).map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedAction(action)}
                      className="text-xs h-8 justify-start"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
