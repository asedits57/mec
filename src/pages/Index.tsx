import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import TranslateCard from "@/components/TranslateCard";
import GrammarCard from "@/components/GrammarCard";
import SentenceCard from "@/components/SentenceCard";
import SpellingCard from "@/components/SpellingCard";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(270 80% 55% / 0.4), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(280 85% 60% / 0.4), transparent 70%)",
          }}
        />
      </div>

      <AnimatedBackground />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-violet-bright" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold glow-text">
              Language Intelligence
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            AI-powered tools to master English — translate, check grammar, improve sentences, and fix spelling.
          </p>
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TranslateCard />
          <GrammarCard />
          <SentenceCard />
          <SpellingCard />
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-muted-foreground text-xs mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Powered by Language Intelligence AI
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
