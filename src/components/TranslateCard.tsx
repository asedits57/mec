import { useState } from "react";
import { motion } from "framer-motion";
import { Languages, Mic } from "lucide-react";

const LANGUAGES = ["English", "Spanish", "French", "German", "Arabic", "Chinese", "Japanese", "Korean", "Hindi", "Portuguese"];

const TranslateCard = () => {
  const [input, setInput] = useState("");
  const [fromLang, setFromLang] = useState("English");
  const [toLang, setToLang] = useState("Spanish");
  const [output, setOutput] = useState("");

  const handleTranslate = () => {
    if (input.trim()) {
      setOutput(`[Translation of "${input.trim()}" from ${fromLang} to ${toLang} will appear here]`);
    }
  };

  return (
    <motion.div
      className="glass-card p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Languages className="w-5 h-5 text-violet-bright" />
        </div>
        <h2 className="font-display text-xl font-semibold glow-text">Translate</h2>
      </div>

      <div className="flex gap-2 items-center">
        <select
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
          className="glass-input !rounded-xl !py-2 flex-1 appearance-none cursor-pointer"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l} className="bg-card text-foreground">{l}</option>
          ))}
        </select>
        <span className="text-muted-foreground text-sm">→</span>
        <select
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
          className="glass-input !rounded-xl !py-2 flex-1 appearance-none cursor-pointer"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l} className="bg-card text-foreground">{l}</option>
          ))}
        </select>
      </div>

      <div className="relative">
        <textarea
          className="glass-input min-h-[100px]"
          placeholder="Type text to translate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <motion.button
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-4 h-4 text-violet-bright" />
        </motion.button>
      </div>

      <button className="violet-button w-full" onClick={handleTranslate}>
        Translate
      </button>

      {output && (
        <motion.div
          className="output-area"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          {output}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TranslateCard;
