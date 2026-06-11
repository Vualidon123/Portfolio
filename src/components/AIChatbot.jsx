import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Key, Check, Info, Bot, User } from 'lucide-react';
import { marked } from 'marked';

// CV context to train Gemini & use in mock responses
const CV_DATA = {
  name: "Trần Lạc Duy",
  role: "Back-End Developer",
  email: "lacduy5@gmail.com",
  phone: "0961330320",
  github: "https://github.com/Vualidon123",
  linkedin: "https://www.linkedin.com/in/tr%E1%BA%A7n-l%E1%BA%A1c-duy-756b00330/",
  summary: {
    vi: "Sinh viên Kỹ thuật Phần mềm trường Đại học FPT HCMC, chuyên ngành Back-End Developer với tư duy sản phẩm nhạy bén và kinh nghiệm xây dựng hệ thống quy mô lớn, hiệu năng cao. Thành thạo hệ sinh thái .NET, microservices và tối ưu hóa cơ sở dữ liệu.",
    en: "Software Engineering student at FPT University HCMC, specializing in Back-End Development with a strong product mindset and experience in building scalable, high-performance systems. Proficient in the .NET ecosystem, microservices, and database optimization."
  },
  experience: [
    {
      role: { vi: "Back-End Developer Intern (OJT)", en: "Back-End Developer Intern (OJT)" },
      company: "Sendo Technology JSC",
      time: "12/2024 - 04/2025",
      details: {
        vi: [
          "Tối ưu hóa hệ thống xử lý message cốt lõi phía backend, cải thiện độ ổn định và giảm độ trễ xử lý.",
          "Đồng phát triển chatbot chăm sóc khách hàng bằng .NET Core và Dify, tích hợp AI tự động hóa quy trình xin nghỉ phép."
        ],
        en: [
          "Optimized the core message-handling backend system, improving pipeline stability and reducing latency.",
          "Co-developed customer support chatbot using .NET Core and Dify, automating employee leave requests."
        ]
      }
    }
  ],
  education: {
    major: "Computer Software Engineering",
    school: "FPT University, Ho Chi Minh City",
    time: "09/2022 - 06/2026",
    gpa: "3.0 / 4.0",
    languages: {
      vi: "Tiếng Anh (giao tiếp tốt), Tiếng Nhật (JLPT N5 - 03/2025)",
      en: "English (Working proficiency), Japanese (JLPT N5 - 03/2025)"
    }
  },
  skills: {
    languages: ["C#", "JavaScript", "Java"],
    frameworks: [".NET", "EF Core", "ASP.NET Core", "WPF"],
    microservices: ["CQRS", "API Gateway", "In-Memory Queue (.NET Channels)"],
    databases: ["MongoDB", "MSSQL", "PostgreSQL"],
    tools: ["Docker", "GitHub", "Postman", "Dify"]
  },
  projects: [
    {
      name: "CoffeeSmart",
      time: "12/2025 - 05/2026",
      role: { vi: "Lập trình viên Backend", en: "Backend Developer" },
      details: {
        vi: [
          "Phát triển thuật toán trừ kho nguyên liệu thô tự động theo size đồ uống.",
          "Xây dựng module rút tiền ví điện tử bảo mật, xác thực OTP kèm rate limit 24h ngăn chặn Race Condition.",
          "Tối ưu hóa hiệu năng nhập liệu qua bulk-insert APIs và .NET Hosted Services xử lý tác vụ ngầm.",
          "Tích hợp Gemini API sinh thực đơn tự động dựa trên prompt-engineering."
        ],
        en: [
          "Developed a scaled raw ingredient deduction algorithm to match drink sizes automatically.",
          "Built a secure wallet withdrawal system with OTP verification and a 24-hour rate limit to prevent Race Conditions.",
          "Optimized database ingestion using bulk-inserts and ran background tasks using .NET Hosted Services.",
          "Integrated Gemini API to generate seasonal drink menus dynamically based on prompt engineering."
        ]
      }
    },
    {
      name: "PersonalityTest / Career Guidance App",
      time: "06/2025 - 09/2025",
      role: { vi: "Lập trình viên Backend", en: "Backend Developer" },
      details: {
        vi: [
          "Thiết kế hệ thống microservice áp dụng mẫu CQRS tăng thông lượng truy vấn.",
          "Thiết kế cơ sở dữ liệu MongoDB tối ưu hóa việc quản lý đề thi và lịch sử làm bài phức tạp."
        ],
        en: [
          "Architected a scalable microservice system utilizing the CQRS pattern to decouple reads and writes.",
          "Designed a MongoDB database schema to handle nested relationships of tests, questions, and attempt histories."
        ]
      }
    },
    {
      name: "VietCarbon",
      time: "09/2025 - 11/2025",
      role: { vi: "Lập trình viên Full-Stack", en: "Full-Stack Developer" },
      details: {
        vi: [
          "Thiết kế lõi công thức tính toán lượng khí thải CO2 hàng ngày của người dùng.",
          "Đồng phát triển giao diện ứng dụng di động bằng Flutter và React Native."
        ],
        en: [
          "Designed and implemented the core calculation engine to compute user carbon footprints.",
          "Co-developed cross-platform mobile interfaces using Flutter and React Native."
        ]
      }
    }
  ]
};

export default function AIChatbot({ lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync initial greeting when lang changes
  useEffect(() => {
    const greetingText = lang === 'vi'
      ? `Xin chào! Tôi là Trợ lý ảo của anh **Trần Lạc Duy**. Bạn có thể hỏi tôi về kinh nghiệm, kỹ năng lập trình hoặc các dự án của anh ấy. 
      
      *Mẹo: Bạn có thể nhập Gemini API Key cá nhân trong phần cài đặt để trò chuyện trực tiếp bằng AI thực tế.*`
      : `Hello! I'm the Virtual Assistant of **Trần Lạc Duy**. Feel free to ask me about his work experiences, coding skills, or projects.
      
      *Tip: You can enter your personal Gemini API Key in the settings panel to enable live AI responses.*`;

    setMessages(prev => {
      if (prev.length <= 1) {
        return [{
          sender: 'bot',
          text: greetingText,
          time: new Date()
        }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('GEMINI_API_KEY', apiKey.trim());
    setShowKeyInput(false);
    
    const text = apiKey.trim()
      ? (lang === 'vi' 
          ? "✅ *Đã cấu hình API Key thành công! Kể từ bây giờ tôi sẽ trả lời bạn bằng Gemini AI thực tế.*" 
          : "✅ *API Key configured successfully! I will now reply to you using live Gemini AI.*")
      : (lang === 'vi'
          ? "ℹ️ *Đã xóa API Key. Tôi sẽ chuyển về chế độ Phản hồi mô phỏng cục bộ.*"
          : "ℹ️ *API Key removed. Reverting to local search simulation mode.*");

    setMessages(prev => [...prev, { sender: 'bot', text, time: new Date() }]);
  };

  const generateMockResponse = (query) => {
    const cleanQuery = query.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[đ]/g, "d");

    const isVi = lang === 'vi';

    if (cleanQuery.includes("kinh nghiem") || cleanQuery.includes("sendo") || cleanQuery.includes("di lam") || cleanQuery.includes("experience") || cleanQuery.includes("work")) {
      const exp = CV_DATA.experience[0];
      const role = isVi ? exp.role.vi : exp.role.en;
      const details = isVi ? exp.details.vi : exp.details.en;
      
      return isVi 
        ? `### Kinh nghiệm làm việc của Duy:
**${role}** tại **${exp.company}** (${exp.time}):
${details.map(d => `- ${d}`).join('\n')}
Duy cũng có tư duy làm sản phẩm tốt thông qua các đồ án thực tế lớn.`
        : `### Duy's Work Experience:
**${role}** at **${exp.company}** (${exp.time}):
${details.map(d => `- ${d}`).join('\n')}
Duy also has a strong product mindset built from working on large practical projects.`;
    }

    if (cleanQuery.includes("ky nang") || cleanQuery.includes("tech stack") || cleanQuery.includes("ngon ngu") || cleanQuery.includes("framework") || cleanQuery.includes("skill") || cleanQuery.includes("technology")) {
      const s = CV_DATA.skills;
      return isVi
        ? `### Kỹ năng chuyên môn của Duy:
- **Ngôn ngữ:** ${s.languages.join(', ')}
- **Frameworks:** ${s.frameworks.join(', ')}
- **Kiến trúc hệ thống:** ${s.microservices.join(', ')}
- **Cơ sở dữ liệu:** ${s.databases.join(', ')}
- **Công cụ:** ${s.tools.join(', ')}`
        : `### Duy's Technical Skills:
- **Languages:** ${s.languages.join(', ')}
- **Frameworks:** ${s.frameworks.join(', ')}
- **Architectures:** ${s.microservices.join(', ')}
- **Databases:** ${s.databases.join(', ')}
- **Tools:** ${s.tools.join(', ')}`;
    }

    if (cleanQuery.includes("du an") || cleanQuery.includes("project") || cleanQuery.includes("san pham") || cleanQuery.includes("coffeesmart") || cleanQuery.includes("vietcarbon") || cleanQuery.includes("career")) {
      return isVi
        ? `### Các dự án nổi bật của Duy:
${CV_DATA.projects.map(p => `
#### ☕ **${p.name}** (${p.time})
- **Vai trò:** ${p.role.vi}
${p.details.vi.map(d => `  - ${d}`).join('\n')}
`).join('\n')}`
        : `### Featured Projects:
${CV_DATA.projects.map(p => `
#### ☕ **${p.name}** (${p.time})
- **Role:** ${p.role.en}
${p.details.en.map(d => `  - ${d}`).join('\n')}
`).join('\n')}`;
    }

    if (cleanQuery.includes("hoc van") || cleanQuery.includes("fpt") || cleanQuery.includes("truong") || cleanQuery.includes("tieng anh") || cleanQuery.includes("jlpt") || cleanQuery.includes("education") || cleanQuery.includes("degree") || cleanQuery.includes("japanese")) {
      const edu = CV_DATA.education;
      const langText = isVi ? edu.languages.vi : edu.languages.en;
      
      return isVi
        ? `### Học vấn & Chứng chỉ:
- **Trường:** ${edu.school} (Chuyên ngành ${edu.major})
- **Thời gian học:** ${edu.time} (GPA: ${edu.gpa})
- **Ngoại ngữ:** ${langText}`
        : `### Education & Certifications:
- **School:** ${edu.school} (Major in ${edu.major})
- **Duration:** ${edu.time} (GPA: ${edu.gpa})
- **Languages:** ${langText}`;
    }

    if (cleanQuery.includes("lien he") || cleanQuery.includes("contact") || cleanQuery.includes("email") || cleanQuery.includes("dien thoai") || cleanQuery.includes("sdt") || cleanQuery.includes("phone")) {
      return isVi
        ? `### Thông tin liên hệ của Trần Lạc Duy:
- 📞 **Số điện thoại:** ${CV_DATA.phone}
- 📧 **Email:** [${CV_DATA.email}](mailto:${CV_DATA.email})
- 💼 **LinkedIn:** [Trần Lạc Duy](${CV_DATA.linkedin})
- 💻 **GitHub:** [Vualidon123](${CV_DATA.github})`
        : `### Contact Directory for Trần Lạc Duy:
- 📞 **Phone:** ${CV_DATA.phone}
- 📧 **Email:** [${CV_DATA.email}](mailto:${CV_DATA.email})
- 💼 **LinkedIn:** [Trần Lạc Duy](${CV_DATA.linkedin})
- 💻 **GitHub:** [Vualidon123](${CV_DATA.github})`;
    }

    return isVi
      ? `Tôi hiểu câu hỏi của bạn. Vì đang chạy ở chế độ **Phản hồi mô phỏng**, tôi có thể trả lời các chủ đề sau:
1. **Kinh nghiệm làm việc** (Sendo OJT, chatbot)
2. **Kỹ năng chuyên môn** (.NET, Microservices, Databases)
3. **Các dự án nổi bật** (CoffeeSmart, PersonalityTest, VietCarbon)
4. **Học vấn & Ngoại ngữ** (Đại học FPT, JLPT N5)
5. **Thông tin liên hệ** (Email, SĐT)

*Bạn hãy thử nhập một trong các từ khóa trên hoặc cấu hình API Key trong mục cài đặt để hỏi các câu hỏi tự do nhé!*`
      : `I understand your query. Since I am running in **Simulation Mode**, I can assist with these topics:
1. **Work Experience** (Sendo OJT internship)
2. **Technical Skills** (.NET ecosystem, Microservices, Databases)
3. **Featured Projects** (CoffeeSmart, PersonalityTest, VietCarbon)
4. **Education & Languages** (FPT University, JLPT N5)
5. **Contact details** (Email, Phone, social networks)

*Try typing one of these keywords or input your API Key in the settings panel to chat freely!*`;
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text, time: new Date() }]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    const storedKey = localStorage.getItem('GEMINI_API_KEY');

    if (!storedKey) {
      setTimeout(() => {
        const reply = generateMockResponse(text);
        setMessages(prev => [...prev, { sender: 'bot', text: reply, time: new Date() }]);
        setIsLoading(false);
      }, 700);
      return;
    }

    // Call actual Gemini API
    try {
      const systemInstruction = lang === 'vi'
        ? `Bạn là virtual assistant đại diện cho Trần Lạc Duy. Hãy dùng thông tin CV sau để trả lời người tuyển dụng một cách chuyên nghiệp, ngắn gọn bằng tiếng Việt. Tuyệt đối trung thực với CV và không chém gió các kỹ năng không có.
CV Trần Lạc Duy:
${JSON.stringify(CV_DATA, null, 2)}
Nếu câu hỏi nằm ngoài CV hoặc không liên quan đến công việc của Duy, hãy khéo léo từ chối và hướng họ hỏi về hồ sơ chuyên môn của Duy.`
        : `You are the virtual assistant representing Trần Lạc Duy. Use the following CV data to answer recruiters professionally, politely, and concisely in English. Be strictly truthful to the CV and do not invent skills.
Duy's CV data:
${JSON.stringify(CV_DATA, null, 2)}
If the question is unrelated to Duy's profile or career, politely decline and redirect them to ask about Duy's software engineering profile.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${storedKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `System context: ${systemInstruction}\n\nUser: ${text}` }] }]
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const reply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { sender: 'bot', text: reply, time: new Date() }]);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: lang === 'vi'
            ? `⚠️ *Lỗi kết nối Gemini API. Vui lòng kiểm tra lại API Key hoặc kết nối mạng.* \n\nChi tiết: ${err.message}`
            : `⚠️ *Gemini API connection error. Please verify your API Key and network connection.* \n\nDetails: ${err.message}`,
          time: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (text) => {
    try {
      return { __html: marked.parse(text) };
    } catch (e) {
      return { __html: text };
    }
  };

  const SUGGESTED_QUESTIONS = lang === 'vi' 
    ? [
        "Kinh nghiệm làm việc của Duy tại Sendo?",
        "Dự án tốt nghiệp CoffeeSmart có gì nổi bật?",
        "Kỹ năng lập trình chính của Duy là gì?",
        "Cách liên hệ với Duy thế nào?"
      ]
    : [
        "What is Duy's work experience at Sendo?",
        "What are the highlights of CoffeeSmart?",
        "What are Duy's primary programming skills?",
        "How can I contact Duy?"
      ];

  const uiTexts = {
    vi: {
      ariaLabel: "Mở trợ lý ảo",
      title: "Trợ lý ảo AI",
      status: "Sẵn sàng giải đáp",
      settingsTitle: "Cài đặt API Key",
      keyPlaceholder: "Nhập Gemini API Key...",
      infoText: "API Key được lưu cục bộ trong thiết bị của bạn.",
      inputPlaceholder: "Nhập câu hỏi của bạn...",
    },
    en: {
      ariaLabel: "Open virtual assistant",
      title: "AI Assistant",
      status: "Online",
      settingsTitle: "Configure API Key",
      keyPlaceholder: "Enter Gemini API Key...",
      infoText: "API Key is saved locally in your browser storage.",
      inputPlaceholder: "Type your question here...",
    }
  }[lang];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white text-black hover:bg-gray-200 transition-all duration-300 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-105 active:scale-95 group"
        aria-label={uiTexts.ariaLabel}
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
        </span>
      </button>

      {/* Slide-out Chat Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] z-50 glass-premium border-l border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
              <Bot size={22} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{uiTexts.title}</h3>
              <p className="text-[10px] text-gray-500 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {uiTexts.status}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={`p-2 rounded-lg transition-colors ${
                showKeyInput || apiKey ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title={uiTexts.settingsTitle}
            >
              <Key size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Configuration Panel */}
        {showKeyInput && (
          <form onSubmit={handleSaveKey} className="p-4 bg-indigo-950/30 border-b border-white/10 animate-fadeIn flex flex-col gap-3">
            <div className="flex gap-2 items-center text-xs text-indigo-300">
              <Info size={14} />
              <span>{uiTexts.infoText}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder={uiTexts.keyPlaceholder}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Check size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                msg.sender === 'user' 
                  ? 'bg-white/5 border-white/10 text-white' 
                  : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
              }`}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="flex flex-col gap-1">
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed prose prose-invert max-w-none ${
                    msg.sender === 'user'
                      ? 'bg-white text-black rounded-tr-none'
                      : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'
                  }`}
                  dangerouslySetInnerHTML={formatMessage(msg.text)}
                />
                <span className={`text-[8px] text-gray-500 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Bot size={14} />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer & Suggestion Questions */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex flex-col gap-3">
          {/* Suggestion tags */}
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[10px] px-2.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-left duration-200 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={uiTexts.inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className="px-4 rounded-xl bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center disabled:opacity-30 disabled:hover:bg-white"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
