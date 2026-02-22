import { motion, AnimatePresence } from "framer-motion";
import {
    Home, CheckSquare, Trophy, User, Settings,
    Flame, Star, BookOpen, Clock, Target,
    TrendingUp, Award, Crown, CheckCircle, Edit3,
    Bell, Lock, Volume2, X, Save, LogOut,
} from "lucide-react";
import { clearUser } from "@/lib/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

/* ─── Nav ─── */
const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Task", icon: CheckSquare, path: "/task" },
    { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { label: "Profile", icon: User, path: "/profile" },
];

/* ─── Static data ─── */
const achievementsList = [
    { id: 1, name: "First Steps", icon: Star, unlocked: true, color: "text-yellow-400" },
    { id: 2, name: "7-Day Streak", icon: Flame, unlocked: true, color: "text-orange-400" },
    { id: 3, name: "500 Words", icon: BookOpen, unlocked: true, color: "text-violet-400" },
    { id: 4, name: "Quiz Master", icon: Trophy, unlocked: true, color: "text-fuchsia-400" },
    { id: 5, name: "30-Day Streak", icon: Flame, unlocked: false, color: "text-muted-foreground" },
    { id: 6, name: "1000 Words", icon: BookOpen, unlocked: false, color: "text-muted-foreground" },
];

const weeklyData = [
    { day: "Mon", hrs: 1.5 }, { day: "Tue", hrs: 2.0 }, { day: "Wed", hrs: 1.2 },
    { day: "Thu", hrs: 2.8 }, { day: "Fri", hrs: 1.8 }, { day: "Sat", hrs: 3.0 }, { day: "Sun", hrs: 2.2 },
];
const maxHrs = Math.max(...weeklyData.map((d) => d.hrs));

const skillBars = [
    { name: "Vocabulary", value: 75 }, { name: "Grammar", value: 65 },
    { name: "Speaking", value: 58 }, { name: "Listening", value: 72 }, { name: "Reading", value: 70 },
];

/* ─── Helpers ─── */
const glassBtn = {
    background: "rgba(139, 92, 246, 0.12)",
    border: "1px solid rgba(139, 92, 246, 0.25)",
};

export default function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();

    /* ── profile state ── */
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const [name, setName] = useState("Alex Johnson");
    const [level, setLevel] = useState("Intermediate");
    const avatarInputRef = useRef<HTMLInputElement>(null);

    /* ── edit modal ── */
    const [editOpen, setEditOpen] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftLevel, setDraftLevel] = useState(level);

    /* ── toggles ── */
    const [notifs, setNotifs] = useState(true);
    const [pronounce, setPronounce] = useState(true);
    const [grammar, setGrammar] = useState(false);

    /* ── toast ── */
    const [toast, setToast] = useState({ msg: "", show: false });
    const showToast = (msg: string) => {
        setToast({ msg, show: true });
        setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
    };

    /* ── handlers ── */
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatarSrc(url);
        showToast("Profile photo updated ✓");
    };

    const openEdit = () => {
        setDraftName(name);
        setDraftLevel(level);
        setEditOpen(true);
    };

    const saveEdit = () => {
        setName(draftName.trim() || name);
        setLevel(draftLevel);
        setEditOpen(false);
        showToast("Profile saved ✓");
    };



    const handleLogout = () => {
        clearUser();
        navigate("/login");
    };

    const statsCards = [
        { label: "Words Learned", value: "1,247", icon: BookOpen, color: "text-violet-400" },
        { label: "Day Streak", value: "15", icon: Flame, color: "text-orange-400" },
        { label: "Accuracy", value: "89%", icon: Target, color: "text-fuchsia-400" },
        { label: "Practice Hours", value: "87h", icon: Clock, color: "text-blue-400" },
    ];

    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* Gradient blobs */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, hsl(270 80% 55% / 0.4), transparent 70%)" }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, hsl(280 85% 60% / 0.4), transparent 70%)" }} />
            </div>
            <AnimatedBackground />

            {/* ── Hidden file input for avatar ── */}
            <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
            />

            {/* ══ Content ══ */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 pb-28">

                {/* TOP BAR */}
                <motion.div className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <h1 className="font-display text-2xl font-bold glow-text">My Profile</h1>
                    <div className="flex items-center gap-2">
                        <button
                            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                            style={glassBtn}
                            aria-label="Settings"
                            onClick={() => navigate("/settings")}
                        >
                            <Settings className="w-5 h-5" style={{ color: "hsl(270, 80%, 75%)" }} />
                        </button>
                        <button
                            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                            style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)" }}
                            aria-label="Logout"
                            onClick={handleLogout}
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" style={{ color: "hsl(0, 80%, 70%)" }} />
                        </button>
                    </div>
                </motion.div>

                {/* PROFILE CARD */}
                <motion.div className="glass-card p-6 mb-6"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
                    <div className="flex items-center gap-5">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div
                                className="w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, hsl(270 80% 50%), hsl(280 85% 60%))",
                                    boxShadow: "0 0 30px hsl(270 80% 55% / 0.35)",
                                }}
                            >
                                {avatarSrc
                                    ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                                    : <User className="w-10 h-10 text-white" />}
                            </div>
                            {/* Edit avatar button */}
                            <button
                                onClick={() => avatarInputRef.current?.click()}
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                style={{ background: "hsl(270 80% 55%)", border: "2px solid hsl(270 100% 4%)" }}
                                aria-label="Change avatar"
                            >
                                <Edit3 className="w-3 h-3 text-white" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="font-display text-xl font-bold text-foreground">{name}</h2>
                                <Crown className="w-4 h-4 text-yellow-400"
                                    style={{ filter: "drop-shadow(0 0 6px rgba(234,179,8,0.6))" }} />
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-xs px-3 py-1 rounded-full font-semibold text-white"
                                    style={{ background: "linear-gradient(135deg, hsl(270 80% 50%), hsl(280 85% 60%))" }}>
                                    {level}
                                </span>
                                <span className="text-xs px-3 py-1 rounded-full font-medium"
                                    style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)", color: "hsl(270,80%,75%)" }}>
                                    2,847 XP
                                </span>
                            </div>
                            {/* Edit Profile button */}
                            <button
                                onClick={openEdit}
                                className="text-xs px-4 py-1.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{ ...glassBtn, color: "hsl(270,80%,75%)" }}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {statsCards.map(({ label, value, icon: Icon, color }, i) => (
                        <motion.div key={label} className="glass-card p-4"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.1 + i * 0.1 }}>
                            <div className="flex items-center gap-2 mb-1">
                                <Icon className={`w-4 h-4 ${color}`} />
                                <span className="text-xs text-muted-foreground">{label}</span>
                            </div>
                            <p className="font-display text-2xl font-bold text-foreground">{value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* LEARNING PROGRESS */}
                <motion.div className="glass-card p-5 mb-6"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp className="w-5 h-5 text-violet-400" />
                        <h3 className="font-display text-base font-bold text-foreground">Learning Progress</h3>
                    </div>
                    <div className="mb-5">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-muted-foreground">Overall</span>
                            <span className="font-semibold" style={{ color: "hsl(270,80%,75%)" }}>67%</span>
                        </div>
                        <div className="h-2.5 rounded-full" style={{ background: "rgba(139,92,246,0.15)" }}>
                            <div className="h-full rounded-full transition-all duration-700"
                                style={{ width: "67%", background: "linear-gradient(90deg, hsl(270 80% 50%), hsl(280 85% 60%))", boxShadow: "0 0 10px hsl(270 80% 55% / 0.4)" }} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {skillBars.map(({ name: n, value }) => (
                            <div key={n}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-muted-foreground">{n}</span>
                                    <span className="text-foreground font-medium">{value}%</span>
                                </div>
                                <div className="h-1.5 rounded-full" style={{ background: "rgba(139,92,246,0.12)" }}>
                                    <div className="h-full rounded-full"
                                        style={{ width: `${value}%`, background: "linear-gradient(90deg, hsl(270 80% 55%), hsl(280 85% 65%))" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* WEEKLY ACTIVITY */}
                <motion.div className="glass-card p-5 mb-6"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }}>
                    <div className="flex items-center gap-2 mb-5">
                        <Clock className="w-5 h-5 text-violet-400" />
                        <h3 className="font-display text-base font-bold text-foreground">Weekly Activity</h3>
                    </div>
                    <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
                        {weeklyData.map(({ day, hrs }) => (
                            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                                <div className="w-full rounded-t-lg relative overflow-hidden"
                                    style={{ height: `${(hrs / maxHrs) * 80}px` }}>
                                    <div className="absolute inset-0 rounded-t-lg"
                                        style={{ background: "linear-gradient(180deg, hsl(275 85% 65%), hsl(270 80% 50%))", boxShadow: "0 0 8px hsl(270 80% 55% / 0.3)" }} />
                                </div>
                                <span className="text-[10px] text-muted-foreground">{day}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ACHIEVEMENTS */}
                <motion.div className="glass-card p-5 mb-6"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }}>
                    <div className="flex items-center gap-2 mb-5">
                        <Award className="w-5 h-5 text-violet-400" />
                        <h3 className="font-display text-base font-bold text-foreground">Achievements</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {achievementsList.map(({ id, name: aName, icon: Icon, unlocked, color }) => (
                            <div key={id}
                                className="relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200"
                                style={{
                                    background: unlocked ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.04)",
                                    border: `1px solid ${unlocked ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.08)"}`,
                                    opacity: unlocked ? 1 : 0.5,
                                }}>
                                {!unlocked && <Lock className="absolute top-2 right-2 w-3 h-3 text-muted-foreground" />}
                                <Icon className={`w-6 h-6 ${color}`} />
                                <span className="text-[10px] text-center text-muted-foreground leading-tight">{aName}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* DAILY GOAL */}
                <motion.div className="glass-card p-5 mb-6"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-violet-400" />
                            <h3 className="font-display text-base font-bold text-foreground">Daily Goal</h3>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: "hsl(270,80%,75%)" }}>15 / 20 words</span>
                    </div>
                    <div className="h-2.5 rounded-full mb-4" style={{ background: "rgba(139,92,246,0.15)" }}>
                        <div className="h-full rounded-full"
                            style={{ width: "75%", background: "linear-gradient(90deg, hsl(142 76% 45%), hsl(158 76% 42%))", boxShadow: "0 0 8px hsl(142 76% 45% / 0.4)" }} />
                    </div>
                    <div className="flex gap-2">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="flex-1 h-7 rounded-lg flex items-center justify-center text-xs font-semibold"
                                style={
                                    i < 5
                                        ? { background: "linear-gradient(135deg, hsl(142 76% 45%), hsl(158 76% 42%))", color: "white" }
                                        : i === 5
                                            ? { background: "linear-gradient(135deg, hsl(270 80% 50%), hsl(280 85% 60%))", color: "white" }
                                            : { background: "rgba(139,92,246,0.1)", color: "hsl(270,80%,60%)", border: "1px solid rgba(139,92,246,0.2)" }
                                }>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* QUICK SETTINGS — all toggles with real state */}
                <motion.div className="glass-card p-5"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.35 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-5 h-5 text-violet-400" />
                        <h3 className="font-display text-base font-bold text-foreground">Quick Settings</h3>
                    </div>
                    <div className="space-y-2">
                        {[
                            { label: "Notifications", icon: Bell, val: notifs, set: setNotifs },
                            { label: "Pronunciation Feedback", icon: Volume2, val: pronounce, set: setPronounce },
                            { label: "Auto Grammar Check", icon: CheckCircle, val: grammar, set: setGrammar },
                        ].map(({ label, icon: Icon, val, set }) => (
                            <div key={label}
                                className="flex items-center justify-between px-4 py-3 rounded-2xl"
                                style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.12)" }}>
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{label}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        set(!val);
                                        showToast(`${label} ${!val ? "enabled" : "disabled"}`);
                                    }}
                                    className="w-10 h-5 rounded-full relative transition-all duration-300 shrink-0"
                                    style={{ background: val ? "linear-gradient(90deg, hsl(270 80% 50%), hsl(280 85% 60%))" : "rgba(139,92,246,0.15)" }}
                                    aria-label={label}
                                >
                                    <span
                                        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300"
                                        style={{ left: val ? "calc(100% - 18px)" : "2px" }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* ══ EDIT PROFILE MODAL ══ */}
            <AnimatePresence>
                {editOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-[60]"
                            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setEditOpen(false)}
                        />
                        {/* Modal */}
                        <motion.div
                            className="fixed z-[70] left-1/2 top-1/2 w-[90%] max-w-sm rounded-3xl p-6"
                            style={{
                                background: "rgba(18, 10, 40, 0.95)",
                                border: "1px solid rgba(139,92,246,0.3)",
                                boxShadow: "0 0 50px rgba(139,92,246,0.2)",
                            }}
                            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        >
                            {/* Modal header */}
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-display text-lg font-bold glow-text">Edit Profile</h2>
                                <button
                                    onClick={() => setEditOpen(false)}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                                    style={glassBtn}
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Name field */}
                            <label className="block mb-4">
                                <span className="text-xs text-muted-foreground font-medium mb-1.5 block">Display Name</span>
                                <input
                                    type="text"
                                    value={draftName}
                                    onChange={(e) => setDraftName(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none transition-all"
                                    style={{
                                        background: "rgba(139,92,246,0.1)",
                                        border: "1px solid rgba(139,92,246,0.25)",
                                    }}
                                    placeholder="Your name"
                                />
                            </label>

                            {/* Level field */}
                            <label className="block mb-6">
                                <span className="text-xs text-muted-foreground font-medium mb-1.5 block">Level</span>
                                <select
                                    value={draftLevel}
                                    onChange={(e) => setDraftLevel(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none transition-all"
                                    style={{
                                        background: "rgba(139,92,246,0.1)",
                                        border: "1px solid rgba(139,92,246,0.25)",
                                    }}
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </label>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
                                    style={{ ...glassBtn, color: "hsl(270,80%,75%)" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveEdit}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                                    style={{ background: "linear-gradient(135deg, hsl(270 80% 50%), hsl(280 85% 60%))", boxShadow: "0 0 20px hsl(270 80% 55% / 0.35)" }}
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ══ TOAST ══ */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        key="toast"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[999] px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-xl"
                        style={{
                            background: "rgba(30, 20, 60, 0.92)",
                            border: "1px solid rgba(139,92,246,0.35)",
                            backdropFilter: "blur(16px)",
                            boxShadow: "0 4px 24px rgba(139,92,246,0.25)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══ BOTTOM NAV ══ */}
            <motion.nav
                className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3"
                style={{
                    background: "rgba(15, 10, 30, 0.75)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderTop: "1px solid rgba(139, 92, 246, 0.2)",
                    boxShadow: "0 -4px 30px rgba(139, 92, 246, 0.1)",
                }}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            >
                {navItems.map(({ label, icon: Icon, path }) => {
                    const active = location.pathname === path;
                    return (
                        <button key={label} onClick={() => navigate(path)}
                            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200"
                            style={{
                                background: active ? "rgba(139,92,246,0.18)" : "transparent",
                                border: active ? "1px solid rgba(139,92,246,0.35)" : "1px solid transparent",
                            }}>
                            <Icon className="w-5 h-5 transition-all duration-200"
                                style={{
                                    color: active ? "hsl(270, 80%, 75%)" : "rgba(160, 140, 200, 0.6)",
                                    filter: active ? "drop-shadow(0 0 6px hsl(270 80% 65%))" : "none",
                                }} />
                            <span className="text-[10px] font-medium leading-none"
                                style={{
                                    color: active ? "hsl(270, 80%, 80%)" : "rgba(160, 140, 200, 0.5)",
                                    fontFamily: "'Inter', sans-serif",
                                }}>
                                {label}
                            </span>
                        </button>
                    );
                })}
            </motion.nav>
        </div>
    );
}
