import { useState } from "react";
import { motion } from "framer-motion";
import { Type } from "lucide-react";

const DEMO_ERRORS = [
  { word: "recieve", suggestion: "receive" },
  { word: "occured", suggestion: "occurred" },
  { word: "seperate", suggestion: "separate" },
];

const SpellingCard = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<typeof DEMO_ERRORS>([]);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (input.trim()) {
      setChecked(true);
      const found = DEMO_ERRORS.filter((e) =>
        input.toLowerCase().includes(e.word)
      );
      setResults(found.length > 0 ? found : []);
    }
  };

  return (
    <motion.div
      className="glass-card p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Type className="w-5 h-5 text-violet-bright" />
        </div>
        <h2 className="font-display text-xl font-semibold glow-text">Spelling Check</h2>
      </div>

      <textarea
        className="glass-input min-h-[100px]"
        placeholder='Try typing "recieve", "occured", or "seperate"...'
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(false);
        }}
      />

      <button className="violet-button w-full" onClick={handleCheck}>
        Check Spelling
      </button>

      {checked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2"
        >
          {results.length > 0 ? (
            results.map((r, i) => (
              <div key={i} className="output-area flex items-center gap-3 text-xs">
                <span className="highlight-error px-1">{r.word}</span>
                <span className="text-muted-foreground">→</span>
                <span className="highlight-suggestion px-1 text-accent">{r.suggestion}</span>
              </div>
            ))
          ) : (
            <div className="output-area text-xs text-center">
              ✅ No spelling errors found!
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpellingCard;
