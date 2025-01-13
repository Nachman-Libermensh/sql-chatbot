import { Bot, User2 } from "lucide-react";
import { motion } from "framer-motion";
import { CodeBlock } from "./CodeBlock";
import { ChatMessage } from "@/types";
import { TextFormatter } from "./TextFormatter";
interface MessageBubbleProps {
  message: ChatMessage;
}
export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).trim();
        return <CodeBlock key={index} content={code} />;
      }
      return <TextFormatter key={index} content={part} />;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
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
        className={`rounded-2xl px-5 py-3 max-w-[85%] ${
          message.role === "assistant"
            ? "bg-white shadow-sm hover:shadow space-y-2"
            : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        }`}
      >
        {message.role === "assistant" ? (
          formatContent(message.content)
        ) : (
          <p
            dir="auto"
            className="text-[15px] leading-relaxed whitespace-pre-wrap"
          >
            {message.content}
          </p>
        )}
      </div>
    </motion.div>
  );
};
