import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  User, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  FolderGit2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Menu,
  X,
  FileCode2,
  Calendar,
  Users,
  Layers,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom brand SVGs (since modern lucide-react versions do not bundle brand icons)
const Github = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import CoffeeSmartDiagram from './components/CoffeeSmartDiagram';
import AIChatbot from './components/AIChatbot';
import TerminalMode from './components/TerminalMode';

// Multilingual translations database
const TRANSLATIONS = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      badge: "💻 Back-End Developer • Available for work",
      title: "Trần Lạc Duy",
      subtitle: "Specializing in building reliable backend architectures with the .NET ecosystem, microservices, and database optimization.",
      btnLearn: "Explore More",
      btnCLI: "Run Console CLI"
    },
    about: {
      badge: "About Me",
      heading: "Aspiring Software Engineer Specializing in Backend",
      p1: "I am a Software Engineering graduate from FPT University HCMC. Driven by a product-oriented mindset, I focus on building reliable, high-performance back-end architectures, optimizing database queries, and executing asynchronous data flows.",
      p2: "During my internship at Sendo Technology JSC, I researched database bottlenecks, integrated background automated tasks, and processed message event pipelines. I am eager to bring my optimization skills to challenging software projects.",
      email: "Email",
      phone: "Phone",
      address: "Address",
      addressVal: "Ho Chi Minh City, Vietnam",
      school: "University",
      schoolVal: "FPT University"
    },
    skills: {
      badge: "Technical Expertise",
      title: "Tech Stack Bento Grid",
      cardLang: {
        title: "Programming Languages",
        desc: "Core languages for writing high-performance backend systems and complex business logic."
      },
      cardArch: {
        title: "System Architecture",
        desc: "Designing microservices to decouple functionalities and distribute in-memory workloads."
      },
      cardFramework: {
        title: "Frameworks & Ecosystem",
        desc: "Building RESTful APIs and clean structures using C# framework standards."
      },
      cardDB: {
        title: "Database Administration",
        desc: "Designing optimal relational and non-relational database schemas, indexing, and high-speed queries."
      },
      cardTools: {
        title: "Developer Tools"
      }
    },
    experience: {
      badge: "My Journey",
      title: "Experience & Education",
      work: "Professional Experience",
      ojt: "Back-End Developer Intern (OJT)",
      ojtDesc: [
        "Analyzed core backend architectures and optimized message-handling pipelines, significantly reducing data processing latency.",
        "Researched AI chatbot flows using .NET Core and Dify, co-developing customer support features and automating request approvals."
      ],
      education: "Education & Certifications",
      bachelor: "Bachelor of Computer Software Engineering",
      bachelorDesc: "GPA: 7.15/ 10.0. Focused on Data Structures & Algorithms, Databases, and Clean Architecture design.",
      japanese: "JLPT N5 Japanese ",
      japaneseDesc: "Basic conversation ability, reading and translating simple documents."
    },
    projects: {
      badge: "Coding Achievements",
      title: "Featured Projects",
      viewMore: "View more projects on GitHub",
      roleLabel: "Role",
      timelineLabel: "Timeline",
      teamLabel: "Team size",
      cs: {
        badge: "Graduation Project (Excellent)",
        title: "CoffeeSmart - Smart Beverage Chain Management",
        desc: "CoffeeSmart provides an optimized operation solution for automated beverage stores. It resolves raw ingredient inventory discrepancy using a scaled stock deduction algorithm and features a secure internal wallet transaction system.",
        rolesTitle: "Key Tasks (Backend Developer)",
        roles: [
          "Designed a scaled ingredient deduction algorithm that scales recipe consumption based on drink cup sizes.",
          "Built a secure digital wallet withdrawal module utilizing OTP and .NET IMemoryCache rate limiting to prevent Race Conditions.",
          "Implemented .NET Hosted Services background tasks to handle membership subscription cycles."
        ],
        optTitle: "Optimization & AI Integration",
        opt: [
          "Optimized database ingestion performance with high-speed Bulk-insert APIs.",
          "Integrated Gemini API to recommend seasonal drink menus based on prompt engineering."
        ],
        btnGitHub: "GitHub Repository",
        diagTitle: "Dynamic In-Memory Flow Architecture (.NET Channels & IMemoryCache)"
      },
      pt: {
        title: "PersonalityTest / Career Guidance App",
        desc: "An application for high school students to take personality tests and receive career advice. Optimized for high scalability and throughput.",
        details: [
          "Architected a scalable microservice system utilizing the CQRS pattern to completely decouple read and write operations.",
          "Designed a MongoDB schema optimized for nested structures (tests, questions, choices, attempt histories)."
        ]
      },
      vc: {
        title: "VietCarbon",
        desc: "A carbon audit platform to calculate and track daily carbon emissions based on energy usage and lifestyle habits.",
        details: [
          "Developed core backend calculation formulas to compute relative CO2 emission equivalents.",
          "Co-developed cross-platform mobile app screens using React Native."
        ]
      }
    },
    contact: {
      badge: "Get In Touch",
      title: "Join Me on My Next Journey",
      desc: "I am actively seeking Back-End Developer (.NET Core) opportunities in Ho Chi Minh City. Feel free to contact me!",
      btnEmail: "Email Me",
      footerMsg: "Press ` to open CLI Console"
    }
  },
  vi: {
    nav: {
      about: "Giới thiệu",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      contact: "Liên hệ"
    },
    hero: {
      badge: "💻 Back-End Developer • Sẵn sàng làm việc",
      title: "Trần Lạc Duy",
      subtitle: "Chuyên sâu phát triển hệ thống ổn định với hệ sinh thái .NET Core, kiến trúc Microservices và tối ưu cơ sở dữ liệu.",
      btnLearn: "Tìm hiểu thêm",
      btnCLI: "Chạy Console CLI"
    },
    about: {
      badge: "Giới thiệu bản thân",
      heading: "Kỹ sư phần mềm tương lai chuyên Backend",
      p1: "Tôi là một lập trình viên tốt nghiệp chuyên ngành Kỹ thuật Phần mềm tại trường Đại học FPT HCMC. Với tư duy phát triển sản phẩm thực tế, tôi tập trung đi sâu xây dựng các hệ thống backend chịu tải tốt, tối ưu hóa câu truy vấn cơ sở dữ liệu và triển khai kiến trúc luồng dữ liệu bất đồng bộ.",
      p2: "Trong kỳ thực tập tại Sendo Technology JSC, tôi có cơ hội nghiên cứu sâu các bottleneck của database, tích hợp các tác vụ ngầm tự động và xử lý hàng đợi sự kiện. Tôi khao khát được đóng góp năng lực tối ưu hóa của mình vào các dự án đầy thách thức tiếp theo.",
      email: "Email",
      phone: "Điện thoại",
      address: "Địa chỉ",
      addressVal: "Hồ Chí Minh, Việt Nam",
      school: "Đại học",
      schoolVal: "Đại học FPT"
    },
    skills: {
      badge: "Kỹ năng kỹ thuật",
      title: "Tech Stack Bento Grid",
      cardLang: {
        title: "Ngôn ngữ Lập trình",
        desc: "Ngôn ngữ nòng cốt phục vụ các giải pháp backend tính toán hiệu năng và viết logic nghiệp vụ phức tạp."
      },
      cardArch: {
        title: "Kiến trúc Hệ thống",
        desc: "Phát triển hệ thống microservices tách biệt tính năng, phân rã khối xử lý bất đồng bộ trong bộ nhớ."
      },
      cardFramework: {
        title: "Frameworks & Ecosystem",
        desc: "Thiết kế API RESTful và cấu trúc phần mềm vững chắc trên nền tảng .NET Core."
      },
      cardDB: {
        title: "Quản trị Cơ sở Dữ liệu",
        desc: "Thiết kế cấu trúc dữ liệu quan hệ và phi quan hệ tối ưu, đánh index, viết truy vấn tốc độ cao."
      },
      cardTools: {
        title: "Công cụ làm việc"
      }
    },
    experience: {
      badge: "Hành trình làm việc",
      title: "Kinh nghiệm & Học vấn",
      work: "Kinh nghiệm Thực tế",
      ojt: "Thực tập sinh Back-End (OJT)",
      ojtDesc: [
        "Nghiên cứu cấu trúc cốt lõi của backend, tham gia tối ưu hóa hệ thống message-handling, nâng cao đáng kể độ trễ đường ống dữ liệu.",
        "Tìm hiểu Dify AI, phối hợp thiết kế chatbot chăm sóc khách hàng và duyệt nghỉ tự động qua AI."
      ],
      education: "Học vấn & Chứng chỉ",
      bachelor: "Cử nhân Kỹ thuật Phần mềm (Software Engineering)",
      bachelorDesc: "Điểm trung bình (GPA): 3.0 / 4.0. Tập trung nghiên cứu về Cấu trúc dữ liệu & Thuật toán, Cơ sở dữ liệu và Thiết kế Kiến trúc sạch (Clean Architecture).",
      japanese: "Chứng chỉ Tiếng Nhật JLPT N5",
      japaneseDesc: "Có khả năng giao tiếp cơ bản, đọc dịch tài liệu thô."
    },
    projects: {
      badge: "Sản phẩm lập trình",
      title: "Dự án Nổi bật",
      viewMore: "Xem thêm dự án trên GitHub",
      roleLabel: "Vai trò",
      timelineLabel: "Thời gian",
      teamLabel: "Team size",
      cs: {
        badge: "Đồ án Tốt nghiệp (Xuất sắc)",
        title: "CoffeeSmart - Quản lý chuỗi đồ uống thông minh",
        desc: "CoffeeSmart cung cấp giải pháp vận hành tối ưu cho chuỗi cửa hàng cafe tự động. Dự án giải quyết triệt để việc sai lệch định lượng nguyên liệu bằng thuật toán phân bổ nguyên liệu tự động tỷ lệ và hệ thống giao dịch ví điện tử nội bộ.",
        rolesTitle: "Công việc chính (Backend Developer)",
        roles: [
          "Thiết kế thuật toán trừ kho nguyên liệu thô tự động theo size đồ uống, tránh thất thoát.",
          "Xây dựng module rút tiền ví điện tử bảo mật với xác thực OTP và .NET IMemoryCache rate limiting ngăn Race Condition.",
          "Áp dụng .NET Hosted Services xử lý các luồng tác vụ ngầm về chu kỳ đăng ký gói thành viên."
        ],
        optTitle: "Tối ưu & Tích hợp AI",
        opt: [
          "Tăng hiệu suất ghi nhận dữ liệu thông qua các Bulk-insert API tối ưu hóa DB.",
          "Tích hợp API AI tạo thực đơn nước uống theo mùa dựa trên Prompt Engineering."
        ],
        btnGitHub: "Mã nguồn GitHub",
        diagTitle: "Sơ đồ luồng kiến trúc động (.NET Channels & IMemoryCache)"
      },
      pt: {
        title: "PersonalityTest / Hướng nghiệp",
        desc: "Ứng dụng làm bài trắc nghiệm tính cách và tư vấn hướng nghiệp cho học sinh phổ thông. Hệ thống được thiết kế hướng hiệu năng cao và khả năng mở rộng.",
        details: [
          "Thiết kế hệ thống microservice áp dụng mẫu CQRS, phân tách tuyệt đối lệnh ghi/đọc dữ liệu.",
          "Sử dụng cơ sở dữ liệu MongoDB lưu trữ cấu trúc đề thi nhiều tầng (bài test, câu hỏi, tùy chọn, lịch sử)."
        ]
      },
      vc: {
        title: "VietCarbon",
        desc: "Nền tảng kiểm toán và theo dõi lượng khí thải carbon cá nhân dựa trên các thói quen tiêu thụ năng lượng và sinh hoạt hàng ngày.",
        details: [
          "Xây dựng công thức tính toán hệ số giảm thiểu và lượng phát thải CO2 tương đối trên backend.",
          "Lập trình giao diện ứng dụng di động bằng React Native để đồng bộ số liệu."
        ]
      }
    },
    contact: {
      badge: "Kết nối",
      title: "Đồng hành cùng dự án tiếp theo",
      desc: "Tôi đang tìm kiếm các cơ hội việc làm ở vị trí Back-End Developer (.NET Core) tại TP. Hồ Chí Minh. Hãy liên hệ với tôi qua các kênh dưới đây!",
      btnEmail: "Gửi Email cho tôi",
      footerMsg: "Nhấn phím ` để chạy CLI Console"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('PORTFOLIO_LANG') || 'en');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    localStorage.setItem('PORTFOLIO_LANG', lang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleKeyDown = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHeaderScrolled = scrollY > 50;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 selection:bg-white selection:text-black relative">
      <CustomCursor />
      
      {/* Background Glow Spots */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] left-[45%] w-[30vw] h-[30vw] bg-neutral-900/40 rounded-full blur-[100px]" />
      </div>

      {/* Sticky Premium Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isHeaderScrolled 
            ? 'py-4 glass-premium bg-[#050505]/80 border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Trần Lạc Duy
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <button onClick={() => handleScrollTo('about')} className="hover:text-white transition-colors">{t.nav.about}</button>
            <button onClick={() => handleScrollTo('skills')} className="hover:text-white transition-colors">{t.nav.skills}</button>
            <button onClick={() => handleScrollTo('experience')} className="hover:text-white transition-colors">{t.nav.experience}</button>
            <button onClick={() => handleScrollTo('projects')} className="hover:text-white transition-colors">{t.nav.projects}</button>
            <button onClick={() => handleScrollTo('contact')} className="hover:text-white transition-colors">{t.nav.contact}</button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(prev => prev === 'en' ? 'vi' : 'en')}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold border border-white/10 text-white flex items-center gap-1.5 transition-all active:scale-95"
              title={lang === 'en' ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}
            >
              <span>🌐 {lang.toUpperCase()}</span>
            </button>

            {/* Terminal Toggle Button */}
            <button
              onClick={() => setTerminalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold border border-white/10 text-white flex items-center gap-2 transition-all active:scale-95 group"
              title="Shortcut: ` (backtick)"
            >
              <TerminalIcon size={14} className="group-hover:text-indigo-400 transition-colors" />
              <span className="hidden sm:inline">Terminal Mode</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[9px] text-gray-400 font-mono">`</kbd>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white md:hidden hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] z-30 glass bg-[#080808]/95 border-b border-white/10 p-6 flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider text-gray-400 md:hidden"
          >
            <button onClick={() => handleScrollTo('about')} className="text-left py-2 hover:text-white">{t.nav.about}</button>
            <button onClick={() => handleScrollTo('skills')} className="text-left py-2 hover:text-white">{t.nav.skills}</button>
            <button onClick={() => handleScrollTo('experience')} className="text-left py-2 hover:text-white">{t.nav.experience}</button>
            <button onClick={() => handleScrollTo('projects')} className="text-left py-2 hover:text-white">{t.nav.projects}</button>
            <button onClick={() => handleScrollTo('contact')} className="text-left py-2 hover:text-white">{t.nav.contact}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden z-10 select-none">
        <ParticleCanvas />
        
        {/* Floating Glassmorphic Spheres */}
        <div className="absolute top-[25%] left-[12%] w-24 h-24 rounded-full bg-white/[0.01] border border-white/10 backdrop-blur-sm shadow-[inset_0_4px_12px_rgba(255,255,255,0.1)] hidden md:block animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[28%] right-[10%] w-36 h-36 rounded-full bg-white/[0.01] border border-white/10 backdrop-blur-sm shadow-[inset_0_4px_12px_rgba(255,255,255,0.1)] hidden md:block animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[15%] left-[22%] w-16 h-16 rounded-full bg-white/[0.01] border border-white/10 backdrop-blur-sm shadow-[inset_0_4px_12px_rgba(255,255,255,0.1)] hidden md:block animate-float" style={{ animationDelay: '4s' }} />

        <div className="max-w-4xl mx-auto px-6 text-center z-10 mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 tracking-wide inline-block mb-6"
          >
            {t.hero.badge}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-gradient-silver">{t.hero.title}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.hero.subtitle }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => handleScrollTo('about')}
              className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-gray-200 text-sm font-bold flex items-center gap-2 transition-all active:scale-95 group shadow-lg shadow-white/10"
            >
              {t.hero.btnLearn}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setTerminalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 flex items-center gap-2 transition-all active:scale-95"
            >
              {t.hero.btnCLI}
              <TerminalIcon size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10 space-y-32">

        {/* About Section */}
        <section id="about" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left Photo Wrap */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full flex-shrink-0 p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-transparent shadow-2xl relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                {imgError ? (
                  <span className="text-4xl text-gray-500 font-bold">TLD</span>
                ) : (
                  <img 
                    src="assets/ProfilePhoto.jpg" 
                    alt="Trần Lạc Duy Profile" 
                    className="w-[94%] h-[94%] object-cover rounded-full" 
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                Back-End Developer
              </div>
            </div>

            {/* Right Biography Info */}
            <div className="flex-1 space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">{t.about.badge}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t.about.heading}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
              <p className="text-gray-400 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p2 }} />

              {/* Contact Info Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3 items-center glass p-3.5 rounded-xl border border-white/5">
                  <Mail size={16} className="text-indigo-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-500 block">{t.about.email}</span>
                    <a href="mailto:lacduy5@gmail.com" className="text-xs text-white hover:underline truncate block">lacduy5@gmail.com</a>
                  </div>
                </div>
                <div className="flex gap-3 items-center glass p-3.5 rounded-xl border border-white/5">
                  <Phone size={16} className="text-indigo-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">{t.about.phone}</span>
                    <a href="tel:0961330320" className="text-xs text-white hover:underline block">0961330320</a>
                  </div>
                </div>
                <div className="flex gap-3 items-center glass p-3.5 rounded-xl border border-white/5">
                  <MapPin size={16} className="text-indigo-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">{t.about.address}</span>
                    <span className="text-xs text-white block">{t.about.addressVal}</span>
                  </div>
                </div>
                <div className="flex gap-3 items-center glass p-3.5 rounded-xl border border-white/5">
                  <GraduationCap size={16} className="text-indigo-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">{t.about.school}</span>
                    <span className="text-xs text-white block">{t.about.schoolVal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Bento Grid Section */}
        <section id="skills" className="scroll-mt-28 space-y-8">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">{t.skills.badge}</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">{t.skills.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Languages card (Wide: col-span-2) */}
            <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300 md:col-span-2 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex items-center gap-3 text-indigo-400 mb-4">
                  <Code2 size={20} />
                  <h3 className="text-sm uppercase font-bold tracking-wider">{t.skills.cardLang.title}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {t.skills.cardLang.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">C# / .NET</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">JavaScript (ES6+)</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">Java</span>
              </div>
            </div>

            {/* Microservices card */}
            <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex items-center gap-3 text-purple-400 mb-4">
                  <Layers size={20} />
                  <h3 className="text-sm uppercase font-bold tracking-wider">{t.skills.cardArch.title}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {t.skills.cardArch.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1 rounded bg-white/5 text-xs font-semibold">CQRS</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs font-semibold">.NET Channels</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs font-semibold">API Gateway</span>
              </div>
            </div>

            {/* Frameworks card */}
            <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex items-center gap-3 text-sky-400 mb-4">
                  <FileCode2 size={20} />
                  <h3 className="text-sm uppercase font-bold tracking-wider">{t.skills.cardFramework.title}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {t.skills.cardFramework.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1 rounded bg-white/5 text-xs font-semibold">ASP.NET Core</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs font-semibold">Entity Framework Core</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs font-semibold">WPF</span>
              </div>
            </div>

            {/* Databases Card (Wide) */}
            <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300 md:col-span-2 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex items-center gap-3 text-emerald-400 mb-4">
                  <Database size={20} />
                  <h3 className="text-sm uppercase font-bold tracking-wider">{t.skills.cardDB.title}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {t.skills.cardDB.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">PostgreSQL</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">MongoDB</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">MSSQL (SQL Server)</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold">.NET IMemoryCache</span>
              </div>
            </div>

            {/* Developer Tools card */}
            <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group overflow-hidden col-span-1 md:col-span-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-500/5 rounded-full blur-2xl" />
              <div>
                <h3 className="text-sm uppercase font-bold tracking-wider text-gray-300 mb-3">{t.skills.cardTools.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1 rounded bg-white/5 text-xs text-gray-400 font-medium">Docker</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs text-gray-400 font-medium">Git / GitHub CI-CD</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs text-gray-400 font-medium">Postman</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs text-gray-400 font-medium">Swagger API Docs</span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs text-gray-400 font-medium">Dify (AI Agent Integration)</span>
              </div>
            </div>

          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-28 space-y-8">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">{t.experience.badge}</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">{t.experience.title}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Experience Card */}
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 hover:border-white/10 transition-all">
              <div className="flex items-center gap-3 text-indigo-400">
                <Briefcase size={20} />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">{t.experience.work}</h3>
              </div>

              <div className="space-y-6">
                <div className="relative pl-6 border-l border-white/10 space-y-2">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] text-gray-500 font-bold tracking-wide block">12/2024 - 04/2025</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{t.experience.ojt}</h4>
                  <p className="text-xs text-indigo-300 font-medium">Sendo Technology JSC</p>
                  <ul className="text-xs text-gray-400 space-y-1.5 pt-2 list-disc pl-4">
                    {t.experience.ojtDesc.map((desc, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: desc }} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 hover:border-white/10 transition-all">
              <div className="flex items-center gap-3 text-indigo-400">
                <GraduationCap size={20} />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">{t.experience.education}</h3>
              </div>

              <div className="space-y-6">
                <div className="relative pl-6 border-l border-white/10 space-y-2">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] text-gray-500 font-bold tracking-wide block">09/2022 - 06/2026</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{t.experience.bachelor}</h4>
                  <p className="text-xs text-indigo-300 font-medium">FPT University, TP. Hồ Chí Minh</p>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1" dangerouslySetInnerHTML={{ __html: t.experience.bachelorDesc }} />
                </div>

                <div className="relative pl-6 border-l border-white/10 space-y-2">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] text-gray-500 font-bold tracking-wide block">03/2025</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{t.experience.japanese}</h4>
                  <p className="text-xs text-gray-400">{t.experience.japaneseDesc}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-28 space-y-8">
          <div className="text-center md:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">{t.projects.badge}</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">{t.projects.title}</h2>
            </div>
            <a 
              href="https://github.com/Vualidon123" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-indigo-400 hover:text-white flex items-center gap-1.5 group transition-colors"
            >
              {t.projects.viewMore}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="space-y-12">
            
            {/* CoffeeSmart (Highlight Project) */}
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
              
              <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                      {t.projects.cs.badge}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{t.projects.cs.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><Calendar size={12} /> 12/2025 - 05/2026</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {t.projects.teamLabel}: 5</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-4xl">
                {t.projects.cs.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wide text-indigo-300">{t.projects.cs.rolesTitle}</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    {t.projects.cs.roles.map((role, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: role }} />
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wide text-indigo-300">{t.projects.cs.optTitle}</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    {t.projects.cs.opt.map((opt, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: opt }} />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white font-medium">.NET Core</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white font-medium">EF Core</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white font-medium">PostgreSQL</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white font-medium">.NET Channels</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white font-medium">React Native</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white font-medium">React Native</span>  
                </div>
                <a 
                  href="https://github.com/SP26-CP-CoffeeSmart" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Github size={14} />
                  {t.projects.cs.btnGitHub}
                </a>
              </div>

              {/* Embed Dynamic Architecture Diagram */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    {t.projects.cs.diagTitle}
                  </h4>
                </div>
                <CoffeeSmartDiagram lang={lang} />
              </div>
            </div>

            {/* Other Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* PersonalityTest */}
              <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white">{t.projects.pt.title}</h3>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">06/2025 - 09/2025</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t.projects.pt.desc}
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc pl-4">
                    {t.projects.pt.details.map((detail, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: detail }} />
                    ))}
                  </ul>
                </div>
                <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">CQRS</span>
                     <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">React</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">MongoDB</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">.NET Core</span>
                  </div>
                  <a 
                    href="https://github.com/Vualidon123/SWD392" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

              {/* VietCarbon */}
              <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white">{t.projects.vc.title}</h3>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">09/2025 - 11/2025</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t.projects.vc.desc}
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc pl-4">
                    {t.projects.vc.details.map((detail, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: detail }} />
                    ))}
                  </ul>
                </div>
                <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">React Native</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">.NET Core</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">PostgreSQL</span>
                  </div>
                  <a 
                    href="https://github.com/Vualidon123/EXE_BE" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-28 space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">{t.contact.badge}</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">{t.contact.title}</h2>
            <p className="text-gray-400 text-xs md:text-sm mt-3 max-w-lg mx-auto">
              {t.contact.desc}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
            <a 
              href="mailto:lacduy5@gmail.com" 
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold text-xs shadow-lg shadow-white/5 active:scale-95"
            >
              <Mail size={16} />
              {t.contact.btnEmail}
            </a>
            <a 
              href="https://github.com/Vualidon123" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-bold text-xs active:scale-95"
            >
              <Github size={16} />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/tr%E1%BA%A7n-l%E1%BA%A1c-duy-756b00330/" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-bold text-xs active:scale-95"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </section>

      </main>

      {/* Premium Dark Footer */}
      <footer className="border-t border-white/5 bg-[#020202] py-8 relative z-10 select-none text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; 2026 Trần Lạc Duy. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><TerminalIcon size={12} /> {t.contact.footerMsg}</span>
          </div>
        </div>
      </footer>

      {/* Floating virtual assistant chatbot */}
      <AIChatbot lang={lang} />

      {/* Console Mode overlay */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <TerminalMode lang={lang} onClose={() => setTerminalOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
