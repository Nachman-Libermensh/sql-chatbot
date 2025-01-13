"use client";

import { ChatMessage } from "@/types";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2, SendHorizontal, User2 } from "lucide-react";
import axios from "axios";

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <Card className="w-full max-w-3xl border-none shadow-xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <CardContent className="p-0">
          <div className="border-b p-6 bg-gradient-to-b from-white to-slate-50">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
              SQL Assistant
            </h1>
            <p className="text-slate-500 text-center mt-2 text-lg">
              צ&rsquo;אט חכם לעזרה ב-SQL
            </p>
          </div>

          <ScrollArea className="h-[65vh] px-4 md:px-6 py-4">
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-center gap-2 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                      message.role === "assistant"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5" />
                    ) : (
                      <User2 className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-5 py-3 max-w-[80%] transition-shadow self-start ${
                      message.role === "assistant"
                        ? "bg-slate-100 text-slate-600 shadow-sm hover:shadow"
                        : "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    <p
                      dir="auto"
                      className="text-[15px] leading-relaxed font-[450]"
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4 md:p-6 bg-gradient-to-b from-slate-50 to-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center gap-3"
            >
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="הקלד את השאלה שלך כאן..."
                disabled={isLoading}
                dir="rtl"
                className="flex-1 h-12 px-4 bg-white/80 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5 rotate-180" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
