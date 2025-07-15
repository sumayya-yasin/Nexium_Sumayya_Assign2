"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Moon, Sun, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [originalText, setOriginalText] = useState<string>("");
  const [urduSummary, setUrduSummary] = useState<string>("");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showDownloaded, setShowDownloaded] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [translationLoading, setTranslationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [greenMode, setGreenMode] = useState<boolean>(false);

  const handleSummarize = async () => {
    if (!url) return;
    setLoading(true);
    setTranslationLoading(false);
    setError(null);

    try {
      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!scrapeRes.ok) throw new Error("Failed to scrape website");
      const { text } = await scrapeRes.json();
      setOriginalText(text);

      const summaryRes = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!summaryRes.ok) throw new Error("Failed to summarize");
      const { summary: aiSummary } = await summaryRes.json();
      const cleaned = aiSummary.split("\n").slice(1).join("\n").trim();
      setSummary(cleaned);

      setTranslationLoading(true);
      const translationRes = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiSummary }),
      });

      const { translated } = await translationRes.json();
      setUrduSummary(translated);
      setTranslationLoading(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
      setTranslationLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadText = (title: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.txt`;
    link.click();
  };

  return (
    <main
      className={`font-nowalt relative ${
        darkMode
          ? "bg-gradient-to-br from-[#1e1b2e] via-[#2a2438] to-[#191724] text-white"
          : greenMode
          ? "bg-gradient-to-tr from-[#e0f7f1] via-[#d5f5ee] to-[#f0fffc] text-gray-900"
          : "bg-gradient-to-tr from-[#fff0f4] via-[#ffe8f1] to-[#fff5f9] text-gray-900"
      } min-h-screen flex items-center justify-center px-4 py-8 transition-colors overflow-hidden`}
    >
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-pink-200 via-teal-100 to-rose-100 opacity-30 animate-gradient-x blur-3xl"
      />

      <div className="absolute top-4 right-4 z-50">
        <div className="relative inline-block">
          {/* Theme Button */}
          <Button
            variant="ghost"
            className="text-sm px-3 py-1 rounded hover:bg-transparent cursor-pointer"
            onClick={() => setShowThemeDropdown((prev) => !prev)}
            onMouseLeave={() => {
              // Only close if cursor leaves both button AND dropdown
              setTimeout(() => {
                const dropdown = document.getElementById("theme-dropdown");
                if (dropdown && !dropdown.matches(":hover")) {
                  setShowThemeDropdown(false);
                }
              }, 100); // Delay to allow mouse to reach dropdown
            }}
          >
            Theme
          </Button>

          {/* Dropdown */}
          {showThemeDropdown && (
            <div
              id="theme-dropdown"
              onMouseLeave={() => setShowThemeDropdown(false)}
              className={`absolute right-0 mt-2 w-36 rounded-md shadow-lg z-50 transition-all duration-200 ${
                darkMode
                  ? "bg-[#2a2438] border border-zinc-700"
                  : greenMode
                  ? "bg-white border border-teal-200"
                  : "bg-white border border-rose-200"
              }`}
            >
              <div className="p-2 flex flex-col gap-2">
                <Button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-sm"
                  variant="ghost"
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </Button>
                <Button
                  onClick={() => setGreenMode(!greenMode)}
                  className="text-sm"
                  variant="ghost"
                >
                  {greenMode ? "Default" : "Teal Mode"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Card
          className={`w-full mx-auto backdrop-blur-xl mt-14 ${
            darkMode
              ? "bg-[#2a2438]/80 border-zinc-700"
              : greenMode
              ? "bg-teal-50/90 border-teal-200"
              : "bg-[#fffafc]/90 border-rose-200"
          } rounded-3xl shadow-xl transition-all duration-300`}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              Blog Summarizer
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/blog"
                className={`w-full flex-1 min-w-0 ${
                  darkMode
                    ? "placeholder:text-pink-200"
                    : greenMode
                    ? "placeholder:text-teal-700"
                    : "placeholder:text-pink-700"
                }`}
              />
              <Button
                onClick={handleSummarize}
                disabled={loading}
                className={`w-full sm:w-auto text-white active:scale-95 transition-all shadow ${
                  greenMode
                    ? "bg-emerald-400 hover:bg-emerald-500"
                    : "bg-rose-400 hover:bg-rose-500"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  "Summarize"
                )}
              </Button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300 text-sm dark:bg-red-950 dark:text-red-400">
                <strong>Error:</strong> {error}
              </div>
            )}

            {summary && (
              <div className="space-y-4">
                {[
                  { title: "English Summary", text: summary },
                  { title: "Urdu Translation", text: urduSummary },
                ].map((item, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.01 }}>
                    <Card
                      className={`backdrop-blur-md ${
                        darkMode
                          ? "bg-[#352f44]/80 border-zinc-600"
                          : greenMode
                          ? "bg-teal-50 border-teal-200"
                          : "bg-white/70 border-rose-200 hover:shadow-md"
                      } rounded-xl transition-shadow shadow-lg`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between w-full">
                          <CardTitle className="text-lg font-semibold">
                            {item.title}
                          </CardTitle>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                downloadText(item.title, item.text)
                              }
                              title="Download"
                              className="text-sm p-1 cursor-pointer hover:scale-110 active:scale-95 transition"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => copyToClipboard(item.text)}
                              title="Copy"
                              className="text-sm p-1 cursor-pointer hover:scale-110 active:scale-95 transition"
                            >
                              📋
                            </button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-base sm:text-lg whitespace-pre-wrap leading-relaxed">
                          {item.text}
                        </p>
                        {item.title === "Urdu Translation" &&
                          translationLoading && (
                            <div className="text-xs text-center mt-2 text-gray-500">
                              <Loader2 className="h-4 w-4 inline-block mr-1 animate-spin" />{" "}
                              Translating to Urdu...
                            </div>
                          )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <motion.div whileHover={{ scale: 1.01 }}>
                  <Card
                    className={`backdrop-blur-md ${
                      darkMode
                        ? "bg-[#352f44]/80 border-zinc-600"
                        : greenMode
                        ? "bg-teal-50 border-teal-200"
                        : "bg-white/70 border-rose-200 hover:shadow-md"
                    } rounded-xl transition-shadow shadow-lg`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        Scrapped Text (Preview)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base sm:text-lg whitespace-pre-wrap">
                        {originalText.split(/\s+/).slice(0, 100).join(" ")}{" "}
                        {originalText.split(/\s+/).length > 100 && "..."}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {showCopied && (
        <div className="fixed bottom-6 right-6 bg-black text-white text-sm px-4 py-2 rounded shadow-lg z-50">
          Copied to clipboard!
        </div>
      )}
      {showDownloaded && (
        <div className="fixed top-6 right-6 bg-black text-white text-sm px-4 py-2 rounded shadow-lg z-50">
          Downloading..
        </div>
      )}
    </main>
  );
}
