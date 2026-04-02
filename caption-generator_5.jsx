import { useState } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", emoji: "📸", color: "#E1306C" },
  { id: "twitter", label: "Twitter/X", emoji: "🐦", color: "#1DA1F2" },
  { id: "linkedin", label: "LinkedIn", emoji: "💼", color: "#0077B5" },
  { id: "facebook", label: "Facebook", emoji: "👍", color: "#1877F2" },
  { id: "youtube", label: "YouTube", emoji: "▶️", color: "#FF0000" },
];

const TONES = ["Funny 😂", "Professional 💼", "Inspirational ✨", "Casual 😎", "Promotional 🔥", "Emotional 💖"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0f;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    color: #f0f0f0;
    position: relative;
    overflow: hidden;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }
  .orb1 { width: 400px; height: 400px; background: #ff6b35; top: -100px; left: -100px; }
  .orb2 { width: 300px; height: 300px; background: #7c3aed; bottom: 100px; right: -50px; }
  .orb3 { width: 200px; height: 200px; background: #06b6d4; top: 50%; left: 50%; }

  .container {
    max-width: 680px;
    margin: 0 auto;
    padding: 32px 20px 60px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .badge {
    display: inline-block;
    background: rgba(255,107,53,0.15);
    border: 1px solid rgba(255,107,53,0.4);
    color: #ff6b35;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 16px;
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 6vw, 48px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 12px;
  }

  h1 span {
    background: linear-gradient(135deg, #ff6b35, #f7c59f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #888;
    font-size: 15px;
    font-weight: 300;
  }

  .card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 16px;
    backdrop-filter: blur(10px);
  }

  .label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 12px;
    display: block;
  }

  .platform-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .platform-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #ccc;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .platform-btn:hover {
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
  }

  .platform-btn.active {
    background: rgba(255,107,53,0.15);
    border-color: #ff6b35;
    color: #ff6b35;
  }

  .tone-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tone-btn {
    padding: 7px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #aaa;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tone-btn:hover { border-color: rgba(255,255,255,0.2); color: #ddd; }
  .tone-btn.active {
    background: rgba(124,58,237,0.2);
    border-color: #7c3aed;
    color: #a78bfa;
  }

  textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 14px 16px;
    color: #f0f0f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    resize: none;
    outline: none;
    transition: border-color 0.2s;
    min-height: 100px;
  }

  textarea:focus { border-color: rgba(255,107,53,0.5); }
  textarea::placeholder { color: #555; }

  .generate-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #ff6b35, #e85d04);
    border: none;
    border-radius: 14px;
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
  }

  .generate-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(255,107,53,0.4);
  }

  .generate-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loading-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }

  .dot {
    width: 6px; height: 6px;
    background: white;
    border-radius: 50%;
    animation: bounce 1.2s infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-6px); opacity: 1; }
  }

  .results-section { margin-top: 24px; }

  .results-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #f0f0f0;
  }

  .caption-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 12px;
    transition: all 0.2s;
    position: relative;
  }

  .caption-card:hover {
    border-color: rgba(255,107,53,0.3);
    background: rgba(255,107,53,0.04);
  }

  .caption-number {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #ff6b35;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  .caption-text {
    font-size: 14px;
    line-height: 1.7;
    color: #ddd;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .caption-actions {
    display: flex;
    gap: 8px;
    margin-top: 14px;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #888;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover { border-color: rgba(255,255,255,0.2); color: #ccc; }
  .copy-btn.copied { border-color: #22c55e; color: #22c55e; background: rgba(34,197,94,0.08); }

  .error-msg {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 12px;
    padding: 14px 18px;
    color: #f87171;
    font-size: 14px;
    margin-top: 16px;
  }

  .tip-bar {
    background: rgba(6,182,212,0.08);
    border: 1px solid rgba(6,182,212,0.2);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 13px;
    color: #67e8f9;
    margin-bottom: 16px;
    text-align: center;
  }
`;

export default function CaptionGenerator() {
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("Casual 😎");
  const [topic, setTopic] = useState("");
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);

  const generateCaptions = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setCaptions([]);

    const selectedPlatform = PLATFORMS.find(p => p.id === platform);

    const prompt = `You are a social media expert. Generate exactly 3 unique, creative captions for ${selectedPlatform.label} about: "${topic}".

Tone: ${tone}
Platform: ${selectedPlatform.label}

Rules:
- Each caption should be different in style/approach
- Include relevant emojis
- Add 3-5 relevant hashtags at the end of each caption
- Keep appropriate length for ${selectedPlatform.label}
- Make them engaging and scroll-stopping

Format your response ONLY as a JSON array like this (no extra text, no markdown):
["caption 1 text here", "caption 2 text here", "caption 3 text here"]`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setCaptions(parsed);
    } catch (err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />
        <div className="bg-orb orb3" />

        <div className="container">
          <div className="header">
            <div className="badge">AI Powered</div>
            <h1>Social Media<br /><span>Caption Generator</span></h1>
            <p className="subtitle">Create viral captions in seconds ⚡</p>
          </div>

          <div className="tip-bar">
            💡 Just describe your post — AI will write 3 ready-to-use captions!
          </div>

          <div className="card">
            <span className="label">Choose Platform</span>
            <div className="platform-grid">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  className={`platform-btn ${platform === p.id ? "active" : ""}`}
                  onClick={() => setPlatform(p.id)}
                >
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <span className="label">Select Tone</span>
            <div className="tone-grid">
              {TONES.map(t => (
                <button
                  key={t}
                  className={`tone-btn ${tone === t ? "active" : ""}`}
                  onClick={() => setTone(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <span className="label">What's your post about?</span>
            <textarea
              placeholder="e.g. New outfit I bought, my cafe's special coffee, motivational Monday post, launching my new product..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              rows={3}
            />
          </div>

          <button
            className="generate-btn"
            onClick={generateCaptions}
            disabled={loading || !topic.trim()}
          >
            {loading ? (
              <span className="loading-dots">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </span>
            ) : "✨ Generate 3 Captions"}
          </button>

          {error && <div className="error-msg">⚠️ {error}</div>}

          {captions.length > 0 && (
            <div className="results-section">
              <div className="results-title">✅ Your Captions are Ready!</div>
              {captions.map((caption, idx) => (
                <div key={idx} className="caption-card">
                  <div className="caption-number">Caption {idx + 1}</div>
                  <div className="caption-text">{caption}</div>
                  <div className="caption-actions">
                    <button
                      className={`copy-btn ${copied === idx ? "copied" : ""}`}
                      onClick={() => copyCaption(caption, idx)}
                    >
                      {copied === idx ? "✓ Copied!" : "📋 Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
