import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, SendHorizontal } from "lucide-react";

interface ChatInputProps {
  inputText: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput = ({
  inputText,
  isLoading,
  onInputChange,
  onSend,
}: ChatInputProps) => {
  return (
    <div className="border-t p-4 md:p-6 bg-gradient-to-b from-slate-50 to-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="relative flex items-center gap-3"
      >
        <Input
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="הקלד את השאלה שלך כאן..."
          disabled={isLoading}
          dir="auto"
          className="flex-1 h-12 px-4 bg-white/80 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
        />
        <Button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5 rotate-180" />
          )}
        </Button>
      </form>
    </div>
  );
};
