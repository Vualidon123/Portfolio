import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';

const getAsciiArt = (lang) => `
    .---.     
   /     \\    Tran Lac Duy - Back-End Developer
   \\     /    ---------------------------------
    \`---'     OS: Portfolio CLI OS v1.0.0
    |   |     Shell: bash-portfolio
    |   |_    Languages: C#, JS, Java
    |   |_)   ${lang === 'vi' ? 'Kỹ năng: .NET Core, Microservices, DB' : 'Skills: .NET Core, Microservices, DB'}
    |   |     ${lang === 'vi' ? 'Dự án: CoffeeSmart, PersonalityTest' : 'Projects: CoffeeSmart, PersonalityTest'}
    \`---'     ${lang === 'vi' ? 'Trạng thái: Sẵn sàng làm việc' : 'Status: Available for work'}
`;

const DIRECTORIES = {
  '~': ['projects', 'skills.txt', 'contact.txt', 'experience.txt'],
  'projects': ['coffeesmart.txt', 'personalitytest.txt', 'vietcarbon.txt']
};

export default function TerminalMode({ lang = 'en', onClose }) {
  const [history, setHistory] = useState([]);
  const [currentDir, setCurrentDir] = useState('~');
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Initialize boot history based on language
    const isVi = lang === 'vi';
    setHistory([
      { text: isVi ? "Trần Lạc Duy - Hệ điều hành Console Portfolio [Phiên bản 1.0.0]" : "Tran Lac Duy - Portfolio Console OS [Version 1.0.0]", type: "info" },
      { text: "(c) 2026 Tran Lac Duy. All rights reserved.", type: "info" },
      { text: isVi ? "Gõ 'help' để xem danh sách lệnh, hoặc 'gui' để quay lại giao diện chính." : "Type 'help' to view available commands, or 'gui' to return to standard web UI.", type: "warning" },
      { text: "", type: "info" }
    ]);
  }, [lang]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const promptText = `visitor@duy-portfolio:${currentDir}$ ${trimmed}`;
    setHistory(prev => [...prev, { text: promptText, type: "prompt" }]);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let output = [];
    const isVi = lang === 'vi';

    switch (command) {
      case 'help':
        output = isVi ? [
          { text: "Các lệnh khả dụng:", type: "info" },
          { text: "  about       - Giới thiệu sơ lược về Duy", type: "text" },
          { text: "  skills      - Danh sách kỹ năng lập trình", type: "text" },
          { text: "  projects    - Thông tin các dự án tiêu biểu", type: "text" },
          { text: "  experience  - Chi tiết kinh nghiệm làm việc", type: "text" },
          { text: "  education   - Học vấn & Ngoại ngữ", type: "text" },
          { text: "  contact     - Thông tin liên hệ", type: "text" },
          { text: "  ls          - Liệt kê tập tin thư mục hiện tại", type: "text" },
          { text: "  cd <dir>    - Di chuyển thư mục", type: "text" },
          { text: "  cat <file>  - Đọc nội dung file văn bản", type: "text" },
          { text: "  neofetch    - Hiển thị logo ASCII & tóm tắt hệ thống", type: "text" },
          { text: "  clear       - Xóa màn hình console", type: "text" },
          { text: "  gui         - Thoát chế độ Terminal quay về web", type: "warning" }
        ] : [
          { text: "Available commands:", type: "info" },
          { text: "  about       - Brief background about Duy", type: "text" },
          { text: "  skills      - List core developer skills", type: "text" },
          { text: "  projects    - Summary of featured projects", type: "text" },
          { text: "  experience  - Detail professional experiences", type: "text" },
          { text: "  education   - Detail academic degree & languages", type: "text" },
          { text: "  contact     - Display contact information", type: "text" },
          { text: "  ls          - List files in the current directory", type: "text" },
          { text: "  cd <dir>    - Change current directory", type: "text" },
          { text: "  cat <file>  - Display contents of a text file", type: "text" },
          { text: "  neofetch    - Show developer info card & ASCII logo", type: "text" },
          { text: "  clear       - Clear terminal screen", type: "text" },
          { text: "  gui         - Exit console and return to main website", type: "warning" }
        ];
        break;

      case 'about':
        output = isVi ? [
          { text: "Trần Lạc Duy - Lập trình viên Back-End", type: "success" },
          { text: "Tôi là cựu sinh viên chuyên ngành Kỹ thuật Phần mềm Đại học FPT, đam mê thiết kế các hệ thống backend ổn định, hiệu suất cao.", type: "text" },
          { text: "Thành thạo hệ sinh thái .NET (.NET Core, EF Core, Microservices, IMemoryCache, DB optimization). Sẵn sàng đồng hành cùng các đội ngũ kỹ sư chuyên nghiệp xây dựng các giải pháp phần mềm sạch sẽ, dễ bảo trì.", type: "text" }
        ] : [
          { text: "Trần Lạc Duy - Back-End Developer", type: "success" },
          { text: "I am a Software Engineering graduate from FPT University HCMC with a passion for designing scalable, high-performance back-end architectures.", type: "text" },
          { text: "Specializing in the .NET ecosystem (.NET Core, EF Core, Microservices, in-memory caching, DB optimization). Eager to work with professional engineering teams to transform complex systems into highly clean, maintainable code.", type: "text" }
        ];
        break;

      case 'skills':
        output = isVi ? [
          { text: "CÂY KỸ NĂNG LẬP TRÌNH:", type: "success" },
          { text: "├── Ngôn ngữ:      C#, JavaScript, Java", type: "text" },
          { text: "├── Frameworks:    .NET Core, EF Core, ASP.NET Core, WPF", type: "text" },
          { text: "├── Kiến trúc:     CQRS, API Gateway, .NET Channels (In-Memory Queue)", type: "text" },
          { text: "├── Cơ sở dữ liệu: PostgreSQL, MongoDB, MSSQL, .NET IMemoryCache", type: "text" },
          { text: "└── Công cụ:       Docker, Git, Postman, Dify", type: "text" }
        ] : [
          { text: "DEVELOPER SKILLS TREE:", type: "success" },
          { text: "├── Languages:     C#, JavaScript, Java", type: "text" },
          { text: "├── Frameworks:    .NET Core, EF Core, ASP.NET Core, WPF", type: "text" },
          { text: "├── Architectures: CQRS, API Gateway, .NET Channels (In-Memory Queue)", type: "text" },
          { text: "├── Databases:     PostgreSQL, MongoDB, MSSQL, .NET IMemoryCache", type: "text" },
          { text: "└── Tools:         Docker, Git, Postman, Dify (AI Agent)", type: "text" }
        ];
        break;

      case 'projects':
        output = isVi ? [
          { text: "CÁC DỰ ÁN TIÊU BIỂU:", type: "success" },
          { text: "1. CoffeeSmart (Đồ án tốt nghiệp)", type: "warning" },
          { text: "   - Phát triển thuật toán trừ kho tự động theo dung tích ly.", type: "text" },
          { text: "   - Xây dựng hệ thống rút ví ví điện tử kèm mã OTP và hạn chế spam (Rate Limit) qua cache.", type: "text" },
          { text: "   - Công nghệ: .NET Core, .NET Channels, Hosted Services, PostgreSQL, React Native.", type: "text" },
          { text: "2. PersonalityTest / Hướng nghiệp", type: "warning" },
          { text: "   - Kiến trúc hệ thống microservices tách biệt ghi/đọc (CQRS).", type: "text" },
          { text: "   - Công nghệ: .NET Core, CQRS, MongoDB, React, API Gateway.", type: "text" },
          { text: "3. VietCarbon", type: "warning" },
          { text: "   - Xây dựng lõi tính toán dấu chân carbon CO2 cá nhân.", type: "text" },
          { text: "   - Công nghệ: Flutter, React Native, .NET Core, PostgreSQL.", type: "text" }
        ] : [
          { text: "FEATURED PROJECTS:", type: "success" },
          { text: "1. CoffeeSmart (Graduation Project)", type: "warning" },
          { text: "   - Engineered a scaled ingredient deduction algorithm.", type: "text" },
          { text: "   - Built a secure wallet withdrawal system with OTP verification & in-memory rate limits.", type: "text" },
          { text: "   - Tech Stack: .NET Core, .NET Channels, PostgreSQL, React Native, Hosted Services.", type: "text" },
          { text: "2. PersonalityTest / Career Guidance App", type: "warning" },
          { text: "   - Microservices architecture based on CQRS pattern.", type: "text" },
          { text: "   - Tech Stack: .NET Core, CQRS, MongoDB, React, API Gateway.", type: "text" },
          { text: "3. VietCarbon", type: "warning" },
          { text: "   - Core mathematical calculation engine for carbon footprint tracking.", type: "text" },
          { text: "   - Tech Stack: Flutter, React Native, .NET Core, PostgreSQL.", type: "text" }
        ];
        break;

      case 'experience':
        output = isVi ? [
          { text: "KINH NGHIỆM LÀM VIỆC:", type: "success" },
          { text: "Thực tập sinh Back-End | Sendo Technology JSC (12/2024 - 04/2025)", type: "warning" },
          { text: "  - Nghiên cứu tối ưu hệ thống xử lý message cốt lõi, giảm độ trễ luồng dữ liệu.", type: "text" },
          { text: "  - Phát triển chatbot chăm sóc khách hàng bằng .NET Core và tích hợp duyệt nghỉ tự động qua AI.", type: "text" }
        ] : [
          { text: "PROFESSIONAL EXPERIENCE:", type: "success" },
          { text: "Back-End Developer Intern | Sendo Technology JSC (12/2024 - 04/2025)", type: "warning" },
          { text: "  - Optimized core backend message processing flows, improving latency and pipeline safety.", type: "text" },
          { text: "  - Developed a support chatbot with .NET Core and Dify, automating employee leave requests.", type: "text" }
        ];
        break;

      case 'education':
        output = isVi ? [
          { text: "HỌC VẤN & NGOẠI NGỮ:", type: "success" },
          { text: "- Đại học FPT TP.HCM: Cử nhân Kỹ thuật Phần mềm (09/2022 - 06/2026)", type: "text" },
          { text: "  GPA: 3.0 / 4.0", type: "text" },
          { text: "- Ngoại ngữ:", type: "text" },
          { text: "  - Tiếng Anh: Giao tiếp làm việc tốt", type: "text" },
          { text: "  - Tiếng Nhật: JLPT N5 (Hoàn thành 03/2025)", type: "text" }
        ] : [
          { text: "EDUCATION & LANGUAGES:", type: "success" },
          { text: "- FPT University HCMC: Bachelor of Computer Software Engineering (09/2022 - 06/2026)", type: "text" },
          { text: "  GPA: 3.0 / 4.0", type: "text" },
          { text: "- Language Proficiencies:", type: "text" },
          { text: "  - English: Working proficiency (good communication)", type: "text" },
          { text: "  - Japanese: JLPT N5 (Completed 03/2025)", type: "text" }
        ];
        break;

      case 'contact':
        output = [
          { text: "CONTACT DIRECTORY:", type: "success" },
          { text: "  - Phone:    0961330320", type: "text" },
          { text: "  - Email:    lacduy5@gmail.com", type: "text" },
          { text: "  - GitHub:   https://github.com/Vualidon123", type: "text" },
          { text: "  - LinkedIn: https://www.linkedin.com/in/tr%E1%BA%A7n-l%E1%BA%A1c-duy-756b00330/", type: "text" }
        ];
        break;

      case 'neofetch':
        output = getAsciiArt(lang).split('\n').map(line => ({ text: line, type: "ascii" }));
        break;

      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      case 'gui':
        onClose();
        return;

      case 'ls':
        const files = DIRECTORIES[currentDir] || [];
        if (files.length === 0) {
          output = [{ text: isVi ? "Thư mục trống" : "Directory is empty", type: "text" }];
        } else {
          output = [{ text: files.join('    '), type: "success" }];
        }
        break;

      case 'cd':
        if (!arg || arg === '~') {
          setCurrentDir('~');
        } else if (arg === 'projects' && currentDir === '~') {
          setCurrentDir('projects');
        } else if (arg === '..' && currentDir === 'projects') {
          setCurrentDir('~');
        } else {
          output = [{ text: isVi ? `cd: không tìm thấy thư mục: ${arg}` : `cd: no such file or directory: ${arg}`, type: "error" }];
        }
        break;

      case 'cat':
        if (!arg) {
          output = [{ text: isVi ? "cat: thiếu tham số tập tin" : "cat: missing file operand", type: "error" }];
        } else {
          const fileName = arg.toLowerCase();
          if (currentDir === '~') {
            if (fileName === 'skills.txt') {
              output = isVi ? [
                { text: "Ngôn ngữ: C#, Javascript, Java", type: "text" },
                { text: "Frameworks: .NET, EF Core, ASP.NET Core", type: "text" },
                { text: "Cơ sở dữ liệu: MongoDB, MSSQL, PostgreSQL, IMemoryCache", type: "text" }
              ] : [
                { text: "Languages: C#, Javascript, Java", type: "text" },
                { text: "Frameworks: .NET, EF Core, ASP.NET Core", type: "text" },
                { text: "Databases: MongoDB, MSSQL, PostgreSQL, IMemoryCache", type: "text" }
              ];
            } else if (fileName === 'contact.txt') {
              output = [
                { text: "Email: lacduy5@gmail.com", type: "text" },
                { text: "Phone: 0961330320", type: "text" }
              ];
            } else if (fileName === 'experience.txt') {
              output = isVi ? [
                { text: "Thực tập sinh Backend tại Sendo Technology JSC (12/2024 - 04/2025)", type: "text" }
              ] : [
                { text: "Back-End Intern at Sendo Technology JSC (12/2024 - 04/2025)", type: "text" }
              ];
            } else if (fileName === 'projects') {
              output = [{ text: isVi ? "cat: projects: Là một thư mục" : "cat: projects: Is a directory", type: "error" }];
            } else {
              output = [{ text: isVi ? `cat: ${arg}: Không tìm thấy file` : `cat: ${arg}: No such file or directory`, type: "error" }];
            }
          } else if (currentDir === 'projects') {
            if (fileName === 'coffeesmart.txt') {
              output = isVi ? [
                { text: "CoffeeSmart: Đồ án tốt nghiệp.", type: "text" },
                { text: "Thiết kế thuật toán trừ kho tự động & ví điện tử bảo mật với in-memory caching.", type: "text" }
              ] : [
                { text: "CoffeeSmart: Graduation project.", type: "text" },
                { text: "Designed dynamic stock deduction algorithms & secure wallets with in-memory caching.", type: "text" }
              ];
            } else if (fileName === 'personalitytest.txt') {
              output = isVi ? [
                { text: "PersonalityTest: Ứng dụng trắc nghiệm hướng nghiệp.", type: "text" },
                { text: "Sử dụng kiến trúc CQRS & cơ sở dữ liệu MongoDB.", type: "text" }
              ] : [
                { text: "PersonalityTest: Career guidance app.", type: "text" },
                { text: "Utilized CQRS architecture & MongoDB database.", type: "text" }
              ];
            } else if (fileName === 'vietcarbon.txt') {
              output = isVi ? [
                { text: "VietCarbon: Theo dõi dấu chân carbon CO2.", type: "text" },
                { text: "Lập trình công thức tính toán lượng carbon phát thải.", type: "text" }
              ] : [
                { text: "VietCarbon: Carbon footprint tracker.", type: "text" },
                { text: "Engineered calculations for carbon offset coefficients.", type: "text" }
              ];
            } else {
              output = [{ text: isVi ? `cat: ${arg}: Không tìm thấy file` : `cat: ${arg}: No such file or directory`, type: "error" }];
            }
          }
        }
        break;

      default:
        output = [{ 
          text: isVi 
            ? `bash: không tìm thấy lệnh: ${command}. Gõ 'help' để xem các lệnh khả dụng.` 
            : `bash: command not found: ${command}. Type 'help' to see all valid commands.`, 
          type: "error" 
        }];
    }

    setHistory(prev => [...prev, ...output, { text: "", type: "info" }]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const getTextColorClass = (type) => {
    switch (type) {
      case 'prompt': return 'text-indigo-400 font-bold';
      case 'success': return 'text-emerald-400 font-bold';
      case 'warning': return 'text-amber-400';
      case 'error': return 'text-rose-500 font-medium';
      case 'ascii': return 'text-indigo-300 font-mono whitespace-pre';
      default: return 'text-gray-300';
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className="fixed inset-0 z-50 bg-[#020202] text-gray-300 font-mono text-xs md:text-sm p-4 flex flex-col justify-between select-text"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(16, 24, 48, 0.2) 0%, rgba(2, 2, 2, 1) 100%)',
      }}
    >
      {/* CRT Scanline effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%'
        }}
      />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4 pointer-events-none select-none">
        <div className="flex items-center gap-2 text-gray-500">
          <Terminal size={14} className="text-indigo-400" />
          <span>visitor@duy-portfolio: {currentDir}</span>
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto p-1 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
          title={lang === 'vi' ? 'Thoát console (gui)' : 'Exit Terminal Mode (gui)'}
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable Command Line History */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        {history.map((line, index) => (
          <div 
            key={index} 
            className={`${getTextColorClass(line.type)} leading-relaxed break-all`}
          >
            {line.text}
          </div>
        ))}

        {/* Current prompt line */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-indigo-400 font-bold flex-shrink-0">
            visitor@duy-portfolio:{currentDir}$
          </span>
          <div className="flex-1 flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent focus:outline-none border-none resize-none p-0 outline-none"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <span className="text-gray-200 z-10 break-all select-none">
              {inputValue}
            </span>
            <span className="w-2 h-4 bg-white/70 animate-pulse ml-0.5 z-10 flex-shrink-0" />
          </div>
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer info */}
      <div className="border-t border-white/5 pt-2 mt-4 flex justify-between text-[10px] text-gray-600 pointer-events-none select-none">
        <span>{lang === 'vi' ? "Lệnh hỗ trợ: 'help' | Lệnh thoát: 'gui'" : "Help Command: 'help' | Exit Command: 'gui'"}</span>
        <span className="flex items-center gap-1">
          {lang === 'vi' ? 'Ấn Enter để chạy' : 'Press Enter to run'}
          <CornerDownLeft size={10} />
        </span>
      </div>
    </div>
  );
}
