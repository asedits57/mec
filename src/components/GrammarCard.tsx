import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const GrammarCard = () => {
  const [input, setInput] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (input.trim()) {
      setChecked(true);
      setIssues([
        "Consider using a comma before 'and' in a compound sentence.",
        "The verb tense should be consistent throughout the paragraph.",
      ]);
    }
  };

  return (
    <motion.div
      className="glass-card p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-violet-bright" />
        </div>
        <h2 className="font-display text-xl font-semibold glow-text">Grammar Check</h2>
      </div>

      <textarea
        className="glass-input min-h-[100px]"
        placeholder="Paste your text to check grammar..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(false);
        }}
      />

      <button className="violet-button w-full" onClick={handleCheck}>
        Check Grammar
      </button>

      {checked && issues.length > 0 && (
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {issues.map((issue, i) => (
            <div
              key={i}
              className="output-area flex items-start gap-2 text-xs"
            >
              <span className="mt-0.5 w-2 h-2 rounded-full bg-accent shrink-0" />
              <span>{issue}</span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default GrammarCard;
