"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import {
    Mic,
    MicOff,
    Phone,
    PhoneOff,
    Volume2,
    Loader2,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

/* ─── Types ─── */
type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

interface TranscriptEntry {
    id: string;
    role: "assistant" | "user";
    text: string;
    timestamp: Date;
}

/* ─── Inner component that uses useSearchParams ─── */
function InterviewContent() {
    const searchParams = useSearchParams();
    const assistantId = searchParams.get("assistantId");
    const publicKey = searchParams.get("publicKey");

    const vapiRef = useRef<any>(null);
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    const [callStatus, setCallStatus] = useState<CallStatus>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [callDuration, setCallDuration] = useState(0);
    const callTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-scroll transcript
    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [transcript]);

    // Call duration timer
    useEffect(() => {
        if (callStatus === "active") {
            callTimerRef.current = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        } else {
            if (callTimerRef.current) clearInterval(callTimerRef.current);
            if (callStatus === "idle") setCallDuration(0);
        }
        return () => {
            if (callTimerRef.current) clearInterval(callTimerRef.current);
        };
    }, [callStatus]);

    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    /* ─── Initialize VAPI and start call ─── */
    const startCall = useCallback(async () => {
        if (!assistantId || !publicKey) {
            setError("Missing interview parameters. Please use the link from your email.");
            return;
        }

        try {
            setCallStatus("connecting");
            setError(null);
            setTranscript([]);

            // Dynamic import to avoid SSR issues
            const VapiModule = await import("@vapi-ai/web");
            const Vapi = VapiModule.default;

            const vapi = new Vapi(publicKey);
            vapiRef.current = vapi;

            // Event listeners
            vapi.on("call-start", () => {
                setCallStatus("active");
                setTranscript((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "assistant",
                        text: "Interview started. The AI interviewer is ready.",
                        timestamp: new Date(),
                    },
                ]);
            });

            vapi.on("call-end", () => {
                setCallStatus("ended");
            });

            vapi.on("message", (message: any) => {
                if (message.type === "transcript" && message.transcriptType === "final") {
                    setTranscript((prev) => [
                        ...prev,
                        {
                            id: Date.now().toString() + Math.random(),
                            role: message.role === "assistant" ? "assistant" : "user",
                            text: message.transcript,
                            timestamp: new Date(),
                        },
                    ]);
                }
            });

            vapi.on("volume-level", (level: number) => {
                setVolumeLevel(level);
            });

            vapi.on("error", (err: any) => {
                console.error("VAPI Error:", err);
                setError(err?.message || "An error occurred during the interview.");
                setCallStatus("error");
            });

            // Start the call with the assistant
            await vapi.start(assistantId);
        } catch (err: any) {
            console.error("Failed to start call:", err);
            setError(err?.message || "Failed to start the interview. Please try again.");
            setCallStatus("error");
        }
    }, [assistantId, publicKey]);

    /* ─── End call ─── */
    const endCall = useCallback(() => {
        if (vapiRef.current) {
            vapiRef.current.stop();
            vapiRef.current = null;
        }
        setCallStatus("ended");
    }, []);

    /* ─── Toggle mute ─── */
    const toggleMute = useCallback(() => {
        if (vapiRef.current) {
            const newMuted = !isMuted;
            vapiRef.current.setMuted(newMuted);
            setIsMuted(newMuted);
        }
    }, [isMuted]);

    /* ─── Missing params guard ─── */
    if (!assistantId || !publicKey) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23] flex items-center justify-center p-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-md w-full text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertCircle size={32} className="text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">
                        Invalid Interview Link
                    </h1>
                    <p className="text-gray-400 leading-relaxed">
                        This link is missing required parameters. Please use the interview
                        link sent to your email.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23] flex flex-col">
            {/* ── Header ── */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        E
                    </div>
                    <span className="text-white font-semibold text-lg">
                        E-Tutor Interview
                    </span>
                </div>
                {callStatus === "active" && (
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-300 text-sm font-medium">
                            {formatDuration(callDuration)}
                        </span>
                    </div>
                )}
            </header>

            {/* ── Main Content ── */}
            <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
                {/* Left: Call Interface */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* ── IDLE State ── */}
                    {callStatus === "idle" && (
                        <div className="text-center animate-in fade-in duration-500">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                                <Mic size={48} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-3">
                                AI Voice Interview
                            </h1>
                            <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                                You&apos;ll be interviewed by our AI assistant. Make sure your
                                microphone is working and you&apos;re in a quiet environment.
                            </p>

                            {/* Tips */}
                            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 max-w-md mx-auto mb-8 text-left border border-white/10">
                                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                                    Before you start
                                </h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            size={16}
                                            className="text-green-400 mt-0.5 shrink-0"
                                        />
                                        Allow microphone access when prompted
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            size={16}
                                            className="text-green-400 mt-0.5 shrink-0"
                                        />
                                        Use headphones for best audio quality
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            size={16}
                                            className="text-green-400 mt-0.5 shrink-0"
                                        />
                                        Find a quiet space with minimal background noise
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2
                                            size={16}
                                            className="text-green-400 mt-0.5 shrink-0"
                                        />
                                        Speak clearly and at a natural pace
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={startCall}
                                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-100 flex items-center gap-3 mx-auto"
                            >
                                <Phone size={22} />
                                Start Interview
                            </button>
                        </div>
                    )}

                    {/* ── CONNECTING State ── */}
                    {callStatus === "connecting" && (
                        <div className="text-center animate-in fade-in duration-300">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-pulse">
                                <Loader2 size={48} className="text-white animate-spin" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Connecting...
                            </h2>
                            <p className="text-gray-400">
                                Setting up your interview. Please wait.
                            </p>
                        </div>
                    )}

                    {/* ── ACTIVE State ── */}
                    {callStatus === "active" && (
                        <div className="text-center animate-in fade-in duration-300 w-full max-w-sm">
                            {/* Audio Visualizer */}
                            <div className="relative w-40 h-40 mx-auto mb-8">
                                {/* Ripple rings */}
                                <div
                                    className="absolute inset-0 rounded-full bg-indigo-500/20 transition-transform duration-150"
                                    style={{
                                        transform: `scale(${1 + volumeLevel * 0.5})`,
                                        opacity: 0.3 + volumeLevel * 0.5,
                                    }}
                                />
                                <div
                                    className="absolute inset-3 rounded-full bg-indigo-500/30 transition-transform duration-150"
                                    style={{
                                        transform: `scale(${1 + volumeLevel * 0.3})`,
                                        opacity: 0.5 + volumeLevel * 0.3,
                                    }}
                                />
                                {/* Center circle */}
                                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                                    <Volume2 size={40} className="text-white" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-white mb-1">
                                Interview In Progress
                            </h2>
                            <p className="text-gray-400 mb-8 text-sm">
                                Speak naturally — the AI interviewer is listening
                            </p>

                            {/* Call Controls */}
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={toggleMute}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted
                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30"
                                            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                        }`}
                                    title={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                                </button>

                                <button
                                    onClick={endCall}
                                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95"
                                    title="End Interview"
                                >
                                    <PhoneOff size={24} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── ENDED State ── */}
                    {callStatus === "ended" && (
                        <div className="text-center animate-in fade-in duration-500">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30">
                                <CheckCircle2 size={48} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">
                                Interview Complete
                            </h2>
                            <p className="text-gray-400 max-w-md mx-auto mb-2">
                                Thank you for completing the interview! Your responses have been
                                recorded and will be reviewed by our team.
                            </p>
                            <p className="text-gray-500 text-sm mb-8">
                                Duration: {formatDuration(callDuration)}
                            </p>
                            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 max-w-sm mx-auto border border-white/10">
                                <p className="text-gray-300 text-sm">
                                    You&apos;ll receive an email with the results once your
                                    interview has been reviewed. You can close this page now.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── ERROR State ── */}
                    {callStatus === "error" && (
                        <div className="text-center animate-in fade-in duration-300">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                <AlertCircle size={48} className="text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Something Went Wrong
                            </h2>
                            <p className="text-gray-400 max-w-md mx-auto mb-6">
                                {error || "An unexpected error occurred."}
                            </p>
                            <button
                                onClick={() => {
                                    setCallStatus("idle");
                                    setError(null);
                                }}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all border border-white/10"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Live Transcript (visible during active/ended) */}
                {(callStatus === "active" || callStatus === "ended") &&
                    transcript.length > 0 && (
                        <div className="lg:w-96 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden">
                            <div className="px-5 py-4 border-b border-white/10">
                                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                                    Live Transcript
                                </h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[60vh]">
                                {transcript.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 ${entry.role === "user"
                                                    ? "bg-indigo-500/30 text-indigo-100 rounded-br-md"
                                                    : "bg-white/10 text-gray-200 rounded-bl-md"
                                                }`}
                                        >
                                            <p className="text-xs font-medium mb-1 opacity-60">
                                                {entry.role === "user" ? "You" : "Interviewer"}
                                            </p>
                                            <p className="text-sm leading-relaxed">{entry.text}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={transcriptEndRef} />
                            </div>
                        </div>
                    )}
            </main>
        </div>
    );
}

/* ─── Page wrapper with Suspense for useSearchParams ─── */
export default function InterviewPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={40} className="text-indigo-400 animate-spin" />
                        <p className="text-gray-400 font-medium">
                            Loading interview...
                        </p>
                    </div>
                </div>
            }
        >
            <InterviewContent />
        </Suspense>
    );
}
