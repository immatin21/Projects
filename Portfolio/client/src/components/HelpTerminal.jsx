import React, { useRef, useState } from "react";
import Skills from "./Skills";
import { Command } from "lucide-react";

const commands = {
  help: [
    "📋 Available Commands:",
    "help - Show this help message",
    "about - Display information about me",
    "email - Show my email address",
    "github - Open my GitHub profile",
    "linkedin - Open my LinkedIn profile",
    "skills - List my technical skills",
    "projects - Scroll to projects section",
    "contact - Scroll to contact section",
    "clear - Clear terminal screen",
  ],

  about: [
    "👨‍💻 Matin Mondal",
    "💼 Full Stack Developer",
    "📝 Passionate developer building amazing web applications.",
  ],
  email: [
    "📧 Email: mondalmatin04@gmail.com",
    "You can reach me at: mondalmatin04@gmail.com",
  ],
  github: ["🔗 Opening GitHub profile: https://github.com/immatin21"],
  linkedin: [
    "🔗 Opening LinkedIn profile: https://www.linkedin.com/in/matin-mondal-631575286",
  ],
  skills: [
    "🛠️ Technical Skills:",
    "Frontend: React, JavaScript, Tailwind CSS",
    "Backend: Node.js, Express, MongoDB",
    "Tools: Git, Postman, VS Code",
  ],
  projects: ["🚀 Scrolling to Projects section..."],
  contact: ["📧 Scrolling to Contact section..."],
};

const HelpTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null)

  const handleCommand = (command) => {
    const cmd = command.trim().toLowerCase();

    if (cmd === "clear") {
      setHistory([])
      if(inputRef.current){
        inputRef.current.placeholder = "Terminal Cleared. Type 'help' for commands."
        inputRef.current.focus()
      }
      return;
    }

    if (cmd === "github") {
      window.open("https://github.com/immatin21", "_blank");
    }

    if (cmd === "linkedin") {
      window.open("https://linkedin.com/in/matin-mondal-631575286", "_blank");
    }

    if (cmd === "contact" || cmd === "projects") {
      document.getElementById(cmd)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (commands[cmd]) {
      setHistory((prev) => [
        ...prev,
        { type: "command", text: command },
        ...commands[cmd].map((line) => ({ type: "output", text: line })),
      ]);
      return;
    }
    setHistory((prev) => [
      ...prev,
      { type: "command", text: command },
      {
        type: "error",
        text: `Command not found : ${command}. Type "help" to see available commands.`,
      }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    handleCommand(input);
    setInput("");
  };

  return (
    <section id="terminal" className="bg-black py-20">
      <div className="mx-auto max-w-4xl w-full">
        <div className="bg-[#0a0a0a] rounded-xl border m-5 border-white/10">
          <div className="bg-[#1a1a1a] rounded-xl px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors"></div>
            </div>
            <span className="text-gray-400 text-sm ml-4">
              matin@portfolio:~$
            </span>
          </div>

          <div className="text-white font-mono px-4 py-4 h-[400px] overflow-y-auto">
            <div className="text-sm">
              Welcome to O4M5 Portfolio Terminal! Type "help" for available
              commands.
            </div>
            {history.map((item, i) => {
              if (item.type === "command") {
                return (
                  <div key={i} className="text-green-400 text-sm">
                    &gt; {item.text}
                  </div>
                );
              }
              if (item.type === "error") {
                return (
                  <div key={i} className="text-red-700 text-sm">
                    &gt; {item.text}
                  </div>
                );
              }
              return (
                <div key={i} className="text-white text-sm">
                  {item.text}
                </div>
              );
            })}
            <form onSubmit={handleSubmit} className="flex items-center ">
              <span className="text-green-400 mr-2">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                name="query"
                id="query"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'help' for commands..."
                className="flex-1 border-none bg-transparent text-sm outline-none"
              />
            </form>
          </div>

          <div className="bg-[#1a1a1a] px-4 py-2 border-t border-white/5">
            <p className="text-xs text-gray-500">
              💡 Tip: Type "help" and press Enter to see available commands
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpTerminal;
