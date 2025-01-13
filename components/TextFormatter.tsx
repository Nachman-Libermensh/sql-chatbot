interface TextFormatterProps {
  content: string;
}

export const TextFormatter = ({ content }: TextFormatterProps) => {
  const formatSection = (text: string) => {
    // Remove MD markers but keep structure
    const lines = text.split("\n");
    const formatted = lines.map((line, i) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={i} className="text-xl font-bold mb-3 mt-4 first:mt-0">
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-lg font-semibold mb-2 mt-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("* ")) {
        return (
          <li key={i} className="mr-6 mb-1">
            {line.replace("* ", "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      return (
        <p key={i} className="mb-2 leading-relaxed">
          {line}
        </p>
      );
    });

    return formatted;
  };

  return <div className="text-formatter">{formatSection(content)}</div>;
};
