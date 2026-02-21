import { motion } from "framer-motion";
import { Home, CheckSquare, Trophy, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import HeroSection from "@/components/task/HeroSection";
import LearningSection from "@/components/task/LearningSection";
import TaskLevels from "@/components/task/TaskLevels";
import DailyChallenge from "@/components/task/DailyChallenge";
import StatsPanel from "@/components/task/StatsPanel";

const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Task", icon: CheckSquare, path: "/task" },
    { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { label: "Profile", icon: User, path: "/profile" },
];

const TaskDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen animated-bg relative pb-24">
            <HeroSection />
            <DailyChallenge />
            <LearningSection />
            <TaskLevels />
            <StatsPanel />
            <footer className="glass-strong border-t border-border/50 py-8 mt-8">
                <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                    © 2026 FluentAI — AI-Powered English Learning Platform
                </div>
            </footer>

            {/* Bottom Navigation Bar */}
            <motion.nav
                className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3"
                style={{
                    background: "rgba(15, 10, 30, 0.75)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderTop: "1px solid rgba(139, 92, 246, 0.2)",
                    boxShadow: "0 -4px 30px rgba(139, 92, 246, 0.1)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                {navItems.map(({ label, icon: Icon, path }) => {
                    const active = location.pathname === path;
                    return (
                        <button
                            key={label}
                            onClick={() => navigate(path)}
                            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 group"
                            style={{
                                background: active ? "rgba(139, 92, 246, 0.18)" : "transparent",
                                border: active ? "1px solid rgba(139, 92, 246, 0.35)" : "1px solid transparent",
                            }}
                        >
                            <Icon
                                className="w-5 h-5 transition-all duration-200"
                                style={{
                                    color: active ? "hsl(270, 80%, 75%)" : "rgba(160, 140, 200, 0.6)",
                                    filter: active ? "drop-shadow(0 0 6px hsl(270 80% 65%))" : "none",
                                }}
                            />
                            <span
                                className="text-[10px] font-medium leading-none transition-all duration-200"
                                style={{
                                    color: active ? "hsl(270, 80%, 80%)" : "rgba(160, 140, 200, 0.5)",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {label}
                            </span>
                        </button>
                    );
                })}
            </motion.nav>
        </div>
    );
};

export default TaskDashboard;
