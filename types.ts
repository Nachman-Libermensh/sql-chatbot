export type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};
