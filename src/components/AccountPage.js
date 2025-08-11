"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  VscChevronDown,
  VscChevronRight,
  VscEdit,
  VscRefresh,
  VscCollapseAll,
  VscMail,
  VscBook,
  VscLocation,
  VscOrganization,
  VscAccount,
  VscRocket,
  VscCopy,
  VscCheck,
  VscGlobe,
} from "react-icons/vsc";

/* ---------- Small bits ---------- */

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

function Row({ icon, label, value, onClick, href, title }) {
  const core = (
    <div
      className={`flex items-start gap-2 px-2 py-[6px] rounded-[2px] outline outline-0 hover:outline-1 hover:outline-[var(--vscode-tab-active-top-border-color)] transition-[outline] ${
        onClick || href ? "cursor-pointer hover:bg-[var(--vscode-list-hover-background)]" : ""
      }`}
      title={title}
      onClick={onClick}
    >
      <span className="w-4 h-4 flex items-center justify-start flex-shrink-0 mt-[2px] text-[var(--vscode-text-secondary)]">
        {icon}
      </span>

      <span className="flex-shrink-0 text-xs text-[var(--vscode-text-secondary)] whitespace-nowrap min-w-[88px] pr-1">
        {label}:
      </span>

      <span
        className="flex-1 text-sm text-[var(--vscode-text-primary)] leading-snug"
        style={{ overflowWrap: "anywhere", wordBreak: "break-word", hyphens: "auto" }}
      >
        {value}
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {core}
    </a>
  ) : (
    core
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
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      title="Copy"
      className={`p-1 rounded-sm hover:bg-[#37373d] transition-colors ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <VscCheck size={14} /> : <VscCopy size={14} />}
    </button>
  );
}

/* ---------- Image Modal (centered, focusable, animated) ---------- */

function ImageModal({ src, alt, open, onClose }) {
  const containerRef = useRef(null);

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label="Image preview"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] opacity-100 transition-opacity" />

      {/* Centered panel */}
      <div
        ref={containerRef}
        className="relative max-w-4xl w-full max-h-[90vh] transform transition-all duration-200 ease-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          className="object-contain w-full h-auto max-h-[90vh] rounded-lg shadow-2xl"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded px-2 py-1 text-sm bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Close image"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */

export default function AccountPage({
  name = "Mohamed Hazem",
  lastName = "Hassine",
  email = "hazemhassine.edu@gmail.com",
  city = "Passau",
  country = "Germany",
  studying = "M.Sc. Computer Science",
  university = "University of Passau",
  bachelor = "B.Sc. (Higher Institute of Mathematics and Informatics of Monastir)",
  originCountry = "Tunisia",
  avatarUrl = "https://avatars.githubusercontent.com/HazemHassine",
  website = "https://github.com/HazemHassine",
}) {
  const [openAbout, setOpenAbout] = useState(true);
  const [openEducation, setOpenEducation] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const fullName = `${name} ${lastName}`;

  const collapseAll = () => {
    const anyClosed = !openAbout || !openEducation || !openLocation;
    setOpenAbout(anyClosed);
    setOpenEducation(anyClosed);
    setOpenLocation(anyClosed);
  };

  return (
    <aside
      className="flex flex-col h-full shrink-0 select-none font-sans text-sm bg-[var(--vscode-sidebar-background)] text-[var(--vscode-text-primary)]"
      role="complementary"
      aria-label="Profile Panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between h-[35px] px-3 border-b border-[var(--vscode-border-color)] bg-[var(--vscode-tab-bar-background)]">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--vscode-text-secondary)]">
          Profile
        </span>
        <div className="flex items-center gap-1 text-[var(--vscode-text-secondary)]">
          <button
            title="Refresh"
            className="p-1 rounded-sm hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
          >
            <VscRefresh size={16} />
          </button>
          <a
            href={`mailto:${email}`}
            title="Email"
            className="p-1 rounded-sm hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
          >
            <VscMail size={16} />
          </a>
          <button
            title="Edit (mock)"
            className="p-1 rounded-sm hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
            onClick={() => alert("Edit mode is a mock in this portfolio 😉")}
          >
            <VscEdit size={16} />
          </button>
          <button
            title="Collapse/Expand All"
            className="p-1 rounded-sm hover:bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors"
            onClick={collapseAll}
          >
            <VscCollapseAll size={16} />
          </button>
        </div>
      </div>

      {/* Top Card */}
      <div className="p-3">
        <div className="relative flex items-start gap-3 p-3 rounded-md bg-[#252526] border border-[var(--vscode-border-color)]  outline-0 hover:outline-1 hover:outline-[var(--vscode-tab-active-top-border-color)] transition-[outline]">
          {/* Avatar (click to open modal) */}
          <button
            type="button"
            className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-[var(--vscode-border-color)] flex-shrink-0 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--vscode-tab-active-top-border-color)]"
            onClick={() => setIsImageOpen(true)}
            aria-label="Open profile image"
          >
            <Image
              src={avatarUrl}
              alt={`${fullName} avatar`}
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </button>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="text-base font-semibold truncate">{name}</span>
                <span className="text-base font-semibold truncate">{lastName}</span>
              </div>
              <span className="text-[10px] px-2 py-[2px] self-start rounded-full bg-[#0e639c]/20 text-[#0e639c] uppercase tracking-wide whitespace-nowrap">
                Available
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--vscode-text-secondary)] mt-0.5">
              <VscRocket size={14} className="flex-shrink-0 mt-[1px]" />
              <span className="truncate">AI / Data • Full-stack-leaning</span>
            </div>

            {/* Links */}
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex flex-col items-start gap-2">
                <span className="flex gap-2 items-center text-xs text-[var(--vscode-text-secondary)] whitespace-nowrap min-w-[88px] pr-1">
                  <VscGlobe size={14} />
                  <p>Website:</p>
                </span>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-2 py-[2px] rounded-sm bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors inline-block"
                  title="Open website"
                >
                  <span
                    className="text-[var(--vscode-text-primary)] leading-snug"
                    style={{ overflowWrap: "anywhere", wordBreak: "break-word", hyphens: "auto" }}
                  >
                    {website.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="flex gap-2 items-center flex-shrink-0 text-xs text-[var(--vscode-text-secondary)] whitespace-nowrap min-w-[88px] pr-1">
                  <VscMail size={14} />
                  <p>Email:</p>
                </div>
                <div className="flex-1 flex items-start gap-1 flex-wrap">
                  <a
                    href={`mailto:${email}`}
                    className="px-2 py-[2px] rounded-sm bg-[var(--vscode-list-hover-background)] hover:text-[var(--vscode-text-inverse)] transition-colors inline-block max-w-full"
                    title="Send email"
                  >
                    <span
                      className="text-[var(--vscode-text-primary)] leading-snug"
                      style={{ overflowWrap: "anywhere", wordBreak: "break-word", hyphens: "auto" }}
                    >
                      {email}
                    </span>
                  </a>
                  <CopyButton text={email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-3 pb-3 space-y-1 overflow-y-auto">
        <div className="bg-[#252526] border border-[var(--vscode-border-color)] rounded-md">
          <SectionHeader title="About" isOpen={openAbout} onToggle={() => setOpenAbout((v) => !v)} />
          {openAbout && (
            <div className="pb-2">
              <Row icon={<VscAccount size={16} />} label="Name" value={fullName} title={fullName} />
              <Row
                icon={<VscMail size={16} />}
                label="Email"
                value={email}
                title="Click to copy"
                onClick={() => navigator.clipboard.writeText(email)}
              />
            </div>
          )}
        </div>

        <div className="bg-[#252526] border border-[var(--vscode-border-color)] rounded-md">
          <SectionHeader title="Education" isOpen={openEducation} onToggle={() => setOpenEducation((v) => !v)} />
          {openEducation && (
            <div className="pb-2">
              <Row
                icon={<VscOrganization size={16} />}
                label="Current"
                value={`${studying} · ${university}`}
                title={`${studying} at ${university}`}
              />
              <Row icon={<VscBook size={16} />} label="Bachelor" value={bachelor} title={bachelor} />
            </div>
          )}
        </div>

        <div className="bg-[#252526] border border-[var(--vscode-border-color)] rounded-md">
          <SectionHeader title="Location" isOpen={openLocation} onToggle={() => setOpenLocation((v) => !v)} />
          {openLocation && (
            <div className="pb-2">
              <Row
                icon={<VscLocation size={16} />}
                label="Based in"
                value={`${city}, ${country}`}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city} ${country}`)}`}
                title="Open in Maps"
              />
              <Row icon={<VscGlobe size={16} />} label="Origin" value={originCountry} title={originCountry} />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        src={avatarUrl}
        alt={`${fullName} enlarged avatar`}
        open={isImageOpen}
        onClose={() => setIsImageOpen(false)}
      />
    </aside>
  );
}
