import React, { useState } from 'react';
import { ShoppingCart, Server, Cpu, Layers, Database, Shield, Zap, Sparkles, HelpCircle } from 'lucide-react';

export default function CoffeeSmartDiagram({ lang = 'en' }) {
  const [activeFlow, setActiveFlow] = useState('order'); // 'order', 'withdraw', 'ai'

  const translations = {
    vi: {
      order: {
        title: "1. Đặt đồ uống & Khấu trừ kho tự động (In-Memory Queue)",
        techs: ["ASP.NET Core", ".NET Channels", "EF Core", "PostgreSQL"],
        nodes: ["client", "gateway", "backend", "channels", "worker", "db"],
        description: "Quy trình xử lý đặt đơn hàng bất đồng bộ nhằm giảm tải cho luồng chính và đảm bảo tính chính xác của kho nguyên liệu:",
        steps: [
          "Thiết bị khách hàng gửi yêu cầu đặt món thông qua API Gateway.",
          "Backend tiếp nhận đơn, ghi trạng thái 'Pending' và lập tức đẩy Event 'OrderPlacedEvent' vào .NET Channels (In-Memory Queue), phản hồi nhanh cho Client.",
          "Kênh truyền dẫn .NET Channel định tuyến sự kiện tới Background Worker.",
          "Background Hosted Service (Worker) tiêu thụ sự kiện bất đồng bộ, tính toán quy đổi công thức nước uống ra số lượng nguyên liệu thô.",
          "Worker cập nhật trừ số lượng tồn kho nguyên liệu tương ứng trong database PostgreSQL một cách nhất quán."
        ]
      },
      withdraw: {
        title: "2. Rút tiền an toàn & Xác thực mã OTP (In-Memory Cache)",
        techs: ["IMemoryCache", "OTP Verification", "Database Transaction"],
        nodes: ["client", "gateway", "backend", "cache", "db"],
        description: "Quy trình kiểm soát giao dịch rút tiền nhạy cảm nhằm ngăn chặn tấn công Concurrency (Race Condition) và spam API:",
        steps: [
          "Khách hàng gửi yêu cầu rút tiền từ Ví điện tử nội bộ.",
          "Yêu cầu được xác thực thông tin cơ bản tại Gateway.",
          "Backend sử dụng .NET IMemoryCache làm bộ nhớ tạm để kiểm soát tần suất (Rate Limit) 24h đối với mỗi user để tránh việc spam mã OTP.",
          "Mã OTP được xác minh; sau đó hệ thống mở một Database Transaction có cô lập (Isolation Level) nghiêm ngặt để cập nhật số dư ví và lưu lịch sử giao dịch vào DB PostgreSQL."
        ]
      },
      ai: {
        title: "3. Tự động hóa tạo thực đơn với Gemini AI",
        techs: ["Gemini API", "JSON Schema Validator", "Hosted Service"],
        nodes: ["backend", "gemini", "db"],
        description: "Quy trình khai thác trí tuệ nhân tạo để sinh thực đơn thông minh, đồng thời kiểm soát chất lượng dữ liệu đầu vào:",
        steps: [
          "Hệ thống quản trị (Admin) kích hoạt tính năng đề xuất thực đơn mới.",
          "Backend thực hiện kỹ thuật Prompt Engineering, gửi yêu cầu có cấu trúc chặt chẽ đến API Gemini.",
          "Gemini phản hồi dữ liệu thô. Backend sử dụng Schema Validator để đối chiếu, đảm bảo dữ liệu trùng khớp 100% với cấu trúc thực đơn hợp lệ.",
          "Lưu thực đơn đã chuẩn hóa vào cơ sở dữ liệu PostgreSQL."
        ]
      },
      tip: "Chọn các nút bên trên để đổi kịch bản kiểm tra sơ đồ.",
      subTitle: "Kịch bản luồng dữ liệu"
    },
    en: {
      order: {
        title: "1. Order Beverage & Auto Stock Deduction (In-Memory Queue)",
        techs: ["ASP.NET Core", ".NET Channels", "EF Core", "PostgreSQL"],
        nodes: ["client", "gateway", "backend", "channels", "worker", "db"],
        description: "Asynchronous order processing workflow to offload the main request thread and ensure accurate raw ingredient inventory:",
        steps: [
          "Customer device sends an order request through the API Gateway.",
          "Backend accepts the order, records it as 'Pending', immediately pushes 'OrderPlacedEvent' into .NET Channels (In-Memory Queue), and responds to the Client.",
          "The .NET Channel routes the event to the Background Worker.",
          "Background Hosted Service (Worker) consumes the event asynchronously, translating the drink recipe into raw ingredient quantities.",
          "Worker deducts and updates the corresponding stock levels in PostgreSQL database consistently."
        ]
      },
      withdraw: {
        title: "2. Secure Wallet Withdrawal & OTP Verification (In-Memory Cache)",
        techs: ["IMemoryCache", "OTP Verification", "Database Transaction"],
        nodes: ["client", "gateway", "backend", "cache", "db"],
        description: "Sensitive wallet withdrawal verification process to prevent Concurrency attacks (Race Conditions) and API abuse:",
        steps: [
          "Customer sends a request to withdraw money from their internal digital wallet.",
          "The request is validated for basic authentication at the Gateway.",
          "Backend utilizes .NET IMemoryCache to manage rate limiting (24-hour lock) per user, preventing OTP code spamming.",
          "Once the OTP is verified, the system opens a strict Database Transaction to update the wallet balance and log transaction history in PostgreSQL."
        ]
      },
      ai: {
        title: "3. Smart Menu Generation with Gemini AI",
        techs: ["Gemini API", "JSON Schema Validator", "Hosted Service"],
        nodes: ["backend", "gemini", "db"],
        description: "AI workflow utilizing generative models for smart menu suggestions while enforcing strict data schemas:",
        steps: [
          "Administrator triggers the smart menu suggestion feature.",
          "Backend performs Prompt Engineering, sending structured requirements to the Gemini API.",
          "Gemini returns raw catalog data. Backend uses a JSON Schema Validator to verify it matches the valid menu structure 100%.",
          "Standardized menu items are saved directly into the PostgreSQL database."
        ]
      },
      tip: "Click the buttons above to switch visualization scenarios.",
      subTitle: "Data Flow Scenario"
    }
  };

  const currentText = translations[lang] || translations.en;
  const activeFlowData = currentText[activeFlow];

  const nodeCoords = {
    client: { x: 80, y: 170, label: lang === 'vi' ? "Ứng dụng khách" : "Client App", sub: "React Native / Web", icon: ShoppingCart },
    gateway: { x: 230, y: 170, label: "API Gateway", sub: "YARP / Security", icon: Shield },
    backend: { x: 420, y: 170, label: "Backend API", sub: ".NET Core", icon: Server },
    channels: { x: 610, y: 80, label: ".NET Channels", sub: "In-Memory Queue", icon: Layers },
    worker: { x: 800, y: 80, label: "Hosted Services", sub: "Background Workers", icon: Cpu },
    cache: { x: 420, y: 280, label: "IMemoryCache", sub: ".NET In-Memory", icon: Zap },
    db: { x: 700, y: 240, label: "PostgreSQL DB", sub: "Primary Store", icon: Database },
    gemini: { x: 420, y: 50, label: "Gemini AI API", sub: "Smart Menu Gen", icon: Sparkles }
  };

  const isNodeActive = (nodeId) => activeFlowData.nodes.includes(nodeId);

  // Map flows to visual path identifiers
  const flowPaths = {
    order: ["client-gateway", "gateway-backend", "backend-channels", "channels-worker", "worker-db"],
    withdraw: ["client-gateway", "gateway-backend", "backend-cache", "backend-db"],
    ai: ["backend-gemini", "backend-db"]
  };

  const isPathActive = (pathId) => flowPaths[activeFlow].includes(pathId);

  return (
    <div className="glass-premium rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden flex flex-col gap-6">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 blur-3xl rounded-full -z-10" />

      {/* Flow Selection Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFlow('order')}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
            activeFlow === 'order'
              ? 'bg-white text-black border-white shadow-lg shadow-white/10'
              : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
          }`}
        >
          {lang === 'vi' ? "Luồng Order (In-Memory Queue)" : "Order Flow (In-Memory Queue)"}
        </button>
        <button
          onClick={() => setActiveFlow('withdraw')}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
            activeFlow === 'withdraw'
              ? 'bg-white text-black border-white shadow-lg shadow-white/10'
              : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
          }`}
        >
          {lang === 'vi' ? "Luồng Rút tiền (IMemoryCache)" : "Withdraw Flow (IMemoryCache)"}
        </button>
        <button
          onClick={() => setActiveFlow('ai')}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
            activeFlow === 'ai'
              ? 'bg-white text-black border-white shadow-lg shadow-white/10'
              : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
          }`}
        >
          {lang === 'vi' ? "Luồng AI Menu Gen" : "AI Menu Gen Flow"}
        </button>
      </div>

      {/* SVG Diagram Canvas (Wrapper added with overflow-x-auto to prevent layout breakage) */}
      <div className="relative border border-white/5 rounded-2xl bg-black/40 p-4 overflow-x-auto w-full">
        <svg 
          viewBox="0 0 950 350" 
          className="w-full h-auto min-w-[850px] select-none"
        >
          {/* Define markers/gradients */}
          <defs>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* DRAW CONNECTIONS / PATHS */}
          
          {/* client-gateway */}
          <path
            d="M 140 170 L 170 170"
            stroke={isPathActive('client-gateway') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('client-gateway') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('client-gateway') && (
            <circle r="4" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 140 170 L 170 170" />
            </circle>
          )}

          {/* gateway-backend */}
          <path
            d="M 290 170 L 360 170"
            stroke={isPathActive('gateway-backend') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('gateway-backend') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('gateway-backend') && (
            <circle r="4" fill="#a78bfa" filter="url(#glow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 290 170 L 360 170" />
            </circle>
          )}

          {/* backend-channels */}
          <path
            d="M 480 170 C 530 170, 520 80, 550 80"
            stroke={isPathActive('backend-channels') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-channels') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-channels') && (
            <circle r="4" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 480 170 C 530 170, 520 80, 550 80" />
            </circle>
          )}

          {/* channels-worker */}
          <path
            d="M 670 80 L 740 80"
            stroke={isPathActive('channels-worker') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('channels-worker') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('channels-worker') && (
            <circle r="4" fill="#c084fc" filter="url(#glow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 670 80 L 740 80" />
            </circle>
          )}

          {/* worker-db */}
          <path
            d="M 800 120 C 800 180, 810 240, 760 240"
            stroke={isPathActive('worker-db') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('worker-db') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('worker-db') && (
            <circle r="4" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 800 120 C 800 180, 810 240, 760 240" />
            </circle>
          )}

          {/* backend-db */}
          <path
            d="M 480 170 C 540 170, 580 240, 640 240"
            stroke={isPathActive('backend-db') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-db') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-db') && (
            <circle r="4" fill="#6366f1" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 480 170 C 540 170, 580 240, 640 240" />
            </circle>
          )}

          {/* backend-cache */}
          <path
            d="M 420 210 L 420 240"
            stroke={isPathActive('backend-cache') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-cache') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-cache') && (
            <circle r="4" fill="#fbbf24" filter="url(#glow)">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 420 210 L 420 240" />
            </circle>
          )}

          {/* backend-gemini */}
          <path
            d="M 420 130 L 420 90"
            stroke={isPathActive('backend-gemini') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-gemini') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-gemini') && (
            <circle r="4" fill="#a78bfa" filter="url(#glow)">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 420 130 L 420 90" />
            </circle>
          )}


          {/* DRAW NODES */}
          {Object.entries(nodeCoords).map(([id, node]) => {
            const Icon = node.icon;
            const active = isNodeActive(id);
            return (
              <g key={id} transform={`translate(${node.x - 60}, ${node.y - 40})`}>
                
                {/* Node Box */}
                <rect
                  width="120"
                  height="70"
                  rx="16"
                  fill={active ? 'rgba(20, 20, 20, 0.95)' : 'rgba(10, 10, 10, 0.4)'}
                  stroke={active ? 'url(#activeGrad)' : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth={active ? 2 : 1}
                  style={{ transition: 'all 0.3s ease' }}
                />
                
                {/* Node Active Glow */}
                {active && (
                  <rect
                    width="120"
                    height="70"
                    rx="16"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ opacity: 0.4 }}
                  />
                )}

                {/* Node Content */}
                <foreignObject x="0" y="0" width="120" height="70">
                  <div className="w-full h-full flex flex-col justify-center items-center px-2 text-center pointer-events-none select-none">
                    <div className={`p-1 rounded-lg mb-1 flex items-center justify-center ${
                      active ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500'
                    }`}>
                      <Icon size={16} />
                    </div>
                    <span className={`text-[10px] font-bold block leading-tight ${
                      active ? 'text-white' : 'text-gray-400'
                    }`}>
                      {node.label}
                    </span>
                    <span className="text-[8px] text-gray-500 block leading-tight font-medium truncate w-full">
                      {node.sub}
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Details Description Panel (Placed below the SVG in a balanced Grid structure, fixing cutoff text) */}
      <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Title, Tech Tags, Description */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 block mb-1">
                {currentText.subTitle}
              </span>
              <h3 className="text-base font-extrabold text-white leading-snug">
                {activeFlowData.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeFlowData.techs.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/5 text-[9px] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              {activeFlowData.description}
            </p>
          </div>

          <div className="hidden md:flex gap-2 items-center text-[10px] text-gray-500 mt-6">
            <HelpCircle size={12} className="text-indigo-400 flex-shrink-0" />
            <span>{currentText.tip}</span>
          </div>
        </div>

        {/* Right Column: Step-by-step numbers */}
        <div className="md:col-span-7 space-y-3">
          {activeFlowData.steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
