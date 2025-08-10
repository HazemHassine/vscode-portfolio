import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
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
    if (error) {
      setStatus({ type: "error", text: error });
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: "success", text: "Email sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ type: "error", text: "Failed to send email." });
    }
  };

  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  const lineNumbers = ["1", "2", "3", "4", "5"];

  // Function to dynamically set width based on text length
  const getInputStyle = (field, placeholder) => {
    const text = form[field] || placeholder;
    return { width: `${Math.max(text.length, placeholder.length) + 1}ch` };
  };

  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono rounded-lg shadow-lg relative overflow-hidden">
      <div className="flex">
        {/* Line numbers */}
        <div className="bg-[#252526] text-[#858585] text-right pr-4 select-none pt-4">
          {lineNumbers.map((n) => (
            <div key={n} className="h-6">{n}</div>
          ))}
        </div>

        {/* Editable JSON */}
        <div className="flex-1 p-4">
          <pre className="whitespace-pre-wrap leading-6">
            {"{\n"}
            &nbsp;&nbsp;<span className="text-yellow-400">"name"</span>: "
            <input
              ref={nameRef}
              className="bg-transparent border-none outline-none text-green-400"
              style={getInputStyle("name", "Your Name")}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your Name"
            />",
            {"\n"}
            &nbsp;&nbsp;<span className="text-yellow-400">"email"</span>: "
            <input
              ref={emailRef}
              className="bg-transparent border-none outline-none text-green-400"
              style={getInputStyle("email", "you@example.com")}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
            />",
            {"\n"}
            &nbsp;&nbsp;<span className="text-yellow-400">"message"</span>: "
            <textarea
              className="align-middle bg-transparent border-none outline-none text-green-400 w-full resize-none"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Write your message here..."
              rows={3}
            />"
            {"\n"}
            {"}"}
          </pre>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSubmit}
        className="absolute top-2 right-2 text-sm bg-[#007acc] px-3 py-1 rounded hover:bg-[#0894ff]"
      >
        Save
      </button>

      {/* IntelliSense tooltip */}
      {showHint && (
        <div className="absolute left-16 top-10 bg-[#252526] text-[#d4d4d4] text-sm px-3 py-2 rounded shadow-lg border border-[#3c3c3c]">
          {showHint === "name" && "string • The sender's full name"}
          {showHint === "email" && "string • Must be a valid email address"}
          {showHint === "message" && "string • Your message content"}
        </div>
      )}

      {/* Status notification */}
      {status && (
        <div
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
