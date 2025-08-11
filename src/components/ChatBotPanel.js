"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  VscTrash,
  VscRefresh,
  VscRocket,
  VscCopy,
  VscCheck,
  VscChevronDown,
  VscChevronRight,
  VscChromeClose,
} from "react-icons/vsc";

/* ---------- Small bits ---------- */

function ToolbarButton({ title, onClick, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-1 rounded-sm hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
    >
      {children}
    </button>
  );
}

function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        } catch {}
      }}
      title="Copy message"
      className={`p-1 rounded-sm hover:bg-[#37373d] transition-colors ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <VscCheck size={14} /> : <VscCopy size={14} />}
    </button>
  );
}

function SectionHeader({ title, isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-1 px-2 py-[6px] text-left text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-text-primary)] hover:bg-[var(--vscode-list-hover-background)] rounded-[2px] transition-colors"
      aria-expanded={isOpen}
    >
      <span className="w-4 h-4 flex items-center justify-start">
        {isOpen ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
      </span>
      <span className="uppercase text-[11px] tracking-wide">{title}</span>
    </button>
  );
}

function MessageBubble({
  role,
  content,
  userAvatarUrl,
  botAvatarUrl,
}) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 mt-1 rounded-full overflow-hidden ring-1 ring-[var(--vscode-border-color)] bg-[#2d2d2d] flex items-center justify-center flex-shrink-0">
          {botAvatarUrl ? (
            <Image src={botAvatarUrl} alt="Bot" width={28} height={28} />
          ) : (
            <span className="text-[10px] text-[var(--vscode-text-secondary)]">BOT</span>
          )}
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[70%] px-3 py-2 rounded-md border outline-0 hover:outline-1 hover:outline-[var(--vscode-tab-active-top-border-color)] transition-[outline]
        ${isUser ? "bg-[#0e639c]/20 border-[#0e639c]/30" : "bg-[#252526] border-[var(--vscode-border-color)]"}`}
        style={{ overflowWrap: "anywhere", wordBreak: "break-word", hyphens: "auto" }}
      >
        <div className="prose prose-invert prose-p:my-2 prose-pre:my-2 max-w-none text-sm">
          {content}
        </div>
        <div className="flex justify-end">
          <CopyButton text={typeof content === "string" ? content : ""} />
        </div>
      </div>

      {isUser && (
        <div className="w-7 h-7 mt-1 rounded-full overflow-hidden ring-1 ring-[var(--vscode-border-color)] bg-[#2d2d2d] flex items-center justify-center flex-shrink-0">
          {userAvatarUrl ? (
            <Image src={userAvatarUrl} alt="You" width={28} height={28} />
          ) : (
            <span className="text-[10px] text-[var(--vscode-text-secondary)]">YOU</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Main Component ---------- */

export default function ChatBotPanel({
  title = "Chatbot",
  userAvatarUrl = "",
  botAvatarUrl = "",
  placeholder = "Ask anything about Hazem...",
  apiPath = "/api/portfolio-chat",
  showContext = true,
  systemContext = `You are a friendly portfolio chatbot. Answer concisely about Hazem based on the site content.`,
}) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your portfolio chatbot. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [openContext, setOpenContext] = useState(false);
  const listRef = useRef(null);
  const abortRef = useRef(null);
  const textareaRef = useRef(null);

  // auto-scroll
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, busy]);

  // auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  const send = async (text) => {
    if (!text?.trim() || busy) return;
    const newUser = { role: "user", content: text.trim() };
    const optimistic = [...messages, newUser];

    setMessages(optimistic);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        body: JSON.stringify({
          messages: optimistic,
          system: systemContext,
        }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data?.reply ?? "(no reply)";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg =
        e.name === "AbortError"
          ? "Stopped."
          : "Sorry—something went wrong. Try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const stop = () => {
    if (abortRef.current) abortRef.current.abort();
  };

  const clear = () => {
    setMessages([{ role: "assistant", content: "New chat. Ask me anything!" }]);
  };

  const regenerate = async () => {
    // resend the last user message if exists
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      await send(lastUser.content);
    }
  };

  const suggestionChips = [
    "What are your strongest skills?",
    "Show me recent projects.",
    "How can I contact you?",
  ];

  return (
    <section
      className="flex flex-col h-full bg-[var(--vscode-sidebar-background)] text-[var(--vscode-text-primary)] select-none"
      aria-label="Chatbot Panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between h-[35px] px-3 border-b border-[var(--vscode-border-color)] bg-[var(--vscode-tab-bar-background)]">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--vscode-text-secondary)]">
          {title}
        </span>
        <div className="flex items-center gap-1 text-[var(--vscode-text-secondary)]">
          <ToolbarButton title="Regenerate" onClick={regenerate}>
            <VscRefresh size={16} />
          </ToolbarButton>
          <ToolbarButton title="Clear" onClick={clear}>
            <VscTrash size={16} />
          </ToolbarButton>
          {busy ? (
            <ToolbarButton title="Stop" onClick={stop}>
              <VscChromeClose size={16} />
            </ToolbarButton>
          ) : null}
        </div>
      </div>

      {/* Optional context section (collapsible) */}
      {showContext && (
        <div className="border-b border-[var(--vscode-border-color)]">
          <SectionHeader
            title="Context"
            isOpen={openContext}
            onToggle={() => setOpenContext((v) => !v)}
          />
          {openContext && (
            <div className="px-3 pb-3">
              <div className="rounded-md bg-[#252526] border border-[var(--vscode-border-color)] p-3 text-[12px] text-[var(--vscode-text-secondary)] outline-0 hover:outline-1 hover:outline-[var(--vscode-tab-active-top-border-color)] transition-[outline]">
                {systemContext}
                <div className="mt-2 flex justify-end">
                  <CopyButton text={systemContext} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat list */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
        data-testid="chat-list"
      >
        {messages.map((m, idx) => (
          <MessageBubble
            key={idx}
            role={m.role}
            content={m.content}
            userAvatarUrl={userAvatarUrl}
            botAvatarUrl={botAvatarUrl}
          />
        ))}

        {busy && (
          <div className="flex items-center gap-2 text-xs text-[var(--vscode-text-secondary)] px-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--vscode-text-secondary)] animate-pulse" />
            Thinking…
          </div>
        )}
      </div>

      {/* Suggestions */}
      {!busy && messages.length <= 2 && (
        <div className="px-3 pb-2 flex flex-wrap gap-2">
          {suggestionChips.map((t) => (
            <button
              key={t}
              onClick={() => send(t)}
              className="text-xs px-2 py-1 rounded-md bg-[var(--vscode-list-hover-background)] hover:outline-1 hover:outline-[var(--vscode-tab-active-top-border-color)] transition-[outline,background] outline-0"
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <div className="p-3 border-t h-36 border-[var(--vscode-border-color)] bg-[var(--vscode-tab-bar-background)]">
        <div className="flex justify-center items-center  gap-2">
          <div
            className="flex-1 bg-[#252526] border border-[var(--vscode-border-color)] rounded-md outline-0 hover:outline-1 hover:outline-[var(--vscode-tab-active-top-border-color)] transition-[outline]"
            aria-label="Message input"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder={placeholder}
              className="w-full h-full resize-y bg-transparent text-sm p-2 focus:outline-none"
            />
          </div>
          <button
            onClick={() => send(input)}
            disabled={busy || !input.trim()}
            className="px-3 py-2 rounded-md bg-[#0e639c] disabled:bg-[#0e639c]/40 text-white text-sm flex items-center gap-1 hover:opacity-90 transition-opacity"
            title="Send (Enter)"
            aria-label="Send message"
          >
            <VscRocket size={14} />
            Send
          </button>
        </div>
        <p className="mt-1 text-[10px] text-[var(--vscode-text-secondary)]">
          Press <kbd className="px-1 py-[1px] rounded bg-[#2d2d2d] border border-[#3a3a3a]">Enter</kbd> to send,{" "}
          <kbd className="px-1 py-[1px] rounded bg-[#2d2d2d] border border-[#3a3a3a]">Shift</kbd>+<kbd className="px-1 py-[1px] rounded bg-[#2d2d2d] border border-[#3a3a3a]">Enter</kbd> for a new line.
        </p>
      </div>
    </section>
  );
}
