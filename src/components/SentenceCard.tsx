import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SentenceCard = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleImprove = () => {
    if (input.trim()) {
      setOutput(`✨ Improved: "${input.trim()}" → A more polished and natural version of your sentence would appear here with inline suggestions highlighted.`);
    }
  };

  return (
    <motion.div
      className="glass-card p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-violet-bright" />
        </div>
        <h2 className="font-display text-xl font-semibold glow-text">Sentence Improvement</h2>
      </div>

      <textarea
        className="glass-input min-h-[100px]"
        placeholder="Enter a sentence to improve..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="violet-button w-full" onClick={handleImprove}>
        Improve
      </button>

      {output && (
        <motion.div
          className="output-area text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          {output}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SentenceCard;
