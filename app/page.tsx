"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types";
import { MessageBubble } from "@/components/MessageBubble";
import { ChatInput } from "@/components/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "שלום! אני העוזר שלך ל-SQL. אשמח לעזור בכתיבת שאילתות, תכנון בסיסי נתונים, אופטימיזציה ופתרון בעיות. במה אוכל לסייע?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputText,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        messages: [
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: userMessage.role, content: userMessage.content },
        ],
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: response.data.content,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("שגיאה:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "מצטער, אירעה שגיאה בעיבוד הבקשה. אנא נסה שנית.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.parentElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, scrollToBottom]);
  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-b from-slate-50 to-white">
      <Card className="w-full max-w-4xl border-none shadow-xl bg-white/90 backdrop-blur">
        <CardContent className="p-0">
          <div className="border-b p-6 bg-gradient-to-b from-white to-slate-50">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
              SQL Assistant
            </h1>
            <p className="text-slate-500 text-center mt-2 text-lg">
              צ׳אט חכם לעזרה ב-SQL
            </p>
          </div>

          <ScrollArea className="h-[65vh] px-4 md:px-6 py-4">
            <div className="space-y-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-slate-500 mr-12"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">מעבד את התשובה...</span>
                </motion.div>
              )}
            </div>
            <div ref={scrollRef} /> {/* Add scroll anchor */}
          </ScrollArea>

          <ChatInput
            inputText={inputText}
            isLoading={isLoading}
            onInputChange={setInputText}
            onSend={handleSendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
