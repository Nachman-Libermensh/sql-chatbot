interface CodeBlockProps {
  content: string;
}

export const CodeBlock = ({ content }: CodeBlockProps) => {
  const formatSQL = (code: string) => {
    return code.replace(
      /(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|JOIN|GROUP BY|ORDER BY|HAVING|LIMIT)(\s|$)/gi,
      '<span class="text-emerald-400">$1</span>$2'
    );
  };

  return (
    <pre className="my-4 p-4 bg-slate-800 text-slate-100 rounded-lg overflow-x-auto">
      <code
        className="block text-sm font-mono leading-6"
        dangerouslySetInnerHTML={{ __html: formatSQL(content) }}
      />
    </pre>
  );
};
