import { useState, useEffect } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(null);

  const handleChange = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
    setShowHint(field);
  };

  const validate = () => {
    if (!form.name || form.name.length < 2) return "Name must be at least 2 characters.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email address.";
    if (!form.message || form.message.length < 10) return "Message must be at least 10 characters.";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) return setStatus({ type: "error", text: error });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus({ type: "success", text: "Email sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", text: "Failed to send email." });
    }
  };

  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setShowHint(null), 2000);
    return () => clearTimeout(t);
  }, [showHint]);

  // Auto-grow inputs to feel like inline edits in VS Code
  const getInputStyle = (field, placeholder) => {
    const text = form[field] || placeholder;
    // +1ch so the caret has breathing room
    return { width: `${Math.max(text.length, placeholder.length) + 1}ch` };
  };

  const lineNumbers = ["1", "2", "3", "4", "5"];

  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono rounded-lg shadow-lg relative overflow-hidden">
      <div className="flex">
        {/* Gutter / line numbers */}
        <div className="bg-[#252526] text-[#858585] text-right pr-4 select-none pt-4">
          {lineNumbers.map((n) => (
            <div key={n} className="h-6">{n}</div>
          ))}
        </div>

        {/* Editor area */}
        <div className="flex-1 p-4">
          <pre className="whitespace-pre-wrap leading-6">
            {"{\n"}
            &nbsp;&nbsp;<span className="text-yellow-400">&quot;name&quot;</span>: &quot;
            <input
              aria-label="name"
              className="bg-transparent border-none outline-none text-green-400"
              style={getInputStyle("name", "Your Name")}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your Name"
            />
            &quot;,
            {"\n"}
            &nbsp;&nbsp;<span className="text-yellow-400">&quot;email&quot;</span>: &quot;
            <input
              aria-label="email"
              className="bg-transparent border-none outline-none text-green-400"
              style={getInputStyle("email", "you@example.com")}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
            />
            &quot;,
            {"\n"}
            &nbsp;&nbsp;<span className="text-yellow-400">&quot;message&quot;</span>: &quot;
            <textarea
              aria-label="message"
              className="align-middle bg-transparent border-none outline-none text-green-400 w-full resize-none"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Write your message here..."
              rows={3}
            />
            &quot;
            {"\n"}
            {"}"}
          </pre>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSubmit}
        className="absolute top-2 right-2 text-sm bg-[#007acc] px-3 py-1 rounded hover:bg-[#0894ff]"
        aria-label="Save"
      >
        Save
      </button>

      {/* Fake IntelliSense tooltip */}
      {showHint && (
        <div className="absolute left-16 top-10 bg-[#252526] text-[#d4d4d4] text-sm px-3 py-2 rounded shadow-lg border border-[#3c3c3c]">
          {showHint === "name" && "string • The sender's full name"}
          {showHint === "email" && "string • Must be a valid email address"}
          {showHint === "message" && "string • Your message content"}
        </div>
      )}

      {/* Status notification (VS Code-style toast) */}
      {status && (
        <div
          role="status"
          className={`absolute bottom-2 right-2 px-3 py-2 rounded shadow-md ${
            status.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {status.text}
        </div>
      )}
    </div>
  );
}
