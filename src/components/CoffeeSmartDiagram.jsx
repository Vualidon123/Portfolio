import React, { useState } from 'react';
import { ShoppingCart, Server, Cpu, Layers, Database, Shield, Zap, Sparkles, HelpCircle } from 'lucide-react';

export default function CoffeeSmartDiagram({ lang = 'en' }) {
  const [activeFlow, setActiveFlow] = useState('order'); // 'order', 'withdraw', 'ai'

  const translations = {
    vi: {
      order: {
        title: "1. Nhập doanh thu & Khấu trừ kho đồng bộ (Synchronous Transaction)",
        techs: ["ASP.NET Core", "EF Core", "PostgreSQL", "Database Transaction"],
        nodes: ["client", "backend", "db"],
        description: "Quy trình ghi nhận doanh thu hàng ngày và đồng bộ khấu trừ tồn kho nguyên liệu thô trực tiếp trong cùng một Transaction:",
        steps: [
          "Thiết bị khách hàng/quản trị gửi dữ liệu doanh thu hàng ngày trực tiếp đến Backend API.",
          "Backend tiếp nhận yêu cầu, mở một Database Transaction có tính nhất quán cao.",
          "Hệ thống thực hiện trừ trực tiếp số lượng nguyên liệu thô trong ShopInventory dựa trên công thức đồ uống (ShopRecipeIngredient) của các món đã bán ngay trong Transaction tạo Daily Sales."
        ]
      },
      withdraw: {
        title: "2. Rút tiền an toàn & Xác thực mã OTP (IMemoryCache & DB Cooldown)",
        techs: ["IMemoryCache", "OTP Verification", "Database Transaction"],
        nodes: ["client", "backend", "cache", "db"],
        description: "Quy trình kiểm soát giao dịch rút tiền nhạy cảm nhằm ngăn chặn tấn công Concurrency (Race Condition) và spam API:",
        steps: [
          "Khách hàng gửi yêu cầu rút tiền từ Ví điện tử nội bộ trực tiếp đến Backend API.",
          "Hệ thống kiểm tra lịch sử rút tiền trong database PostgreSQL để áp dụng khóa cooldown 24 giờ, đồng thời dùng .NET IMemoryCache để lưu trữ mã OTP tạm thời trong vòng 5 phút.",
          "Khi yêu cầu rút tiền được khởi tạo, hệ thống đóng băng số dư khả dụng ngay lập tức. Sau khi OTP được xác thực thành công, trạng thái yêu cầu rút tiền được cập nhật thành Pending chờ Admin phê duyệt."
        ]
      },
      ai: {
        title: "3. Tự động hóa tạo thực đơn với Gemini AI",
        techs: ["Gemini API", "ResponseJsonSchema", "Vector Embeddings", "Firebase"],
        nodes: ["client", "backend", "gemini", "db"],
        description: "Quy trình khai thác trí tuệ nhân tạo để sinh thực đơn thông minh, đồng thời kiểm soát chất lượng dữ liệu đầu vào:",
        steps: [
          "Chủ cửa hàng (Coffee Shop Owner) kích hoạt tính năng đề xuất thực đơn thông minh trên Client App, gửi yêu cầu trực tiếp đến Backend API.",
          "Backend thực hiện kỹ thuật Prompt Engineering, gửi yêu cầu đến API Gemini.",
          "Gemini đảm bảo phản hồi dữ liệu cấu trúc JSON chính xác 100% khớp với DTO schema định sẵn của backend thông qua cấu hình native ResponseJsonSchema.",
          "Các món thực đơn chuẩn hóa được lưu vào PostgreSQL, vector embeddings của chúng được tạo & lưu trữ, và bố cục menu được vẽ thành ảnh lưu trên Firebase & DB."
        ]
      },
      tip: "Chọn các nút bên trên để đổi kịch bản kiểm tra sơ đồ.",
      subTitle: "Kịch bản luồng dữ liệu"
    },
    en: {
      order: {
        title: "1. Daily Sale Entry & Synchronous Stock Deduction (Synchronous Transaction)",
        techs: ["ASP.NET Core", "EF Core", "PostgreSQL", "Database Transaction"],
        nodes: ["client", "backend", "db"],
        description: "Workflow for logging daily sales and synchronously deducting raw ingredient inventory directly within a single database transaction:",
        steps: [
          "Client/Admin device sends daily sales data directly to the Backend API.",
          "Backend processes the request, opening a highly consistent Database Transaction.",
          "The system directly deducts raw ingredient quantities in ShopInventory based on drink recipe ingredients (ShopRecipeIngredient) of the sold items within the same Transaction that creates Daily Sales."
        ]
      },
      withdraw: {
        title: "2. Secure Wallet Withdrawal & OTP Verification (IMemoryCache & DB Cooldown)",
        techs: ["IMemoryCache", "OTP Verification", "Database Transaction"],
        nodes: ["client", "backend", "cache", "db"],
        description: "Sensitive wallet withdrawal verification process to prevent Concurrency attacks (Race Conditions) and API abuse:",
        steps: [
          "Customer sends a request to withdraw money from their internal digital wallet directly to the Backend API.",
          "The system checks withdrawal history in the PostgreSQL database to apply a 24-hour cooldown lock, while using .NET IMemoryCache to store the temporary OTP for 5 minutes.",
          "When a withdrawal request is initiated, the system freezes the available balance immediately. After OTP is successfully verified, the withdrawal request status is updated to Pending, waiting for Admin approval."
        ]
      },
      ai: {
        title: "3. Smart Menu Generation with Gemini AI",
        techs: ["Gemini API", "ResponseJsonSchema", "Vector Embeddings", "Firebase"],
        nodes: ["client", "backend", "gemini", "db"],
        description: "AI workflow utilizing generative models for smart menu suggestions while enforcing strict data schemas:",
        steps: [
          "Coffee Shop Owner triggers the smart menu suggestion feature on the Client App, sending the request directly to the Backend API.",
          "Backend performs Prompt Engineering, sending the request to the Gemini API.",
          "Gemini guarantees 100% structured JSON output matching the backend's predefined DTO schema via native ResponseJsonSchema configuration.",
          "Standardized menu items are saved into PostgreSQL, their vector embeddings are generated & stored, and the menu layout is rendered into images saved on Firebase & DB."
        ]
      },
      tip: "Click the buttons above to switch visualization scenarios.",
      subTitle: "Data Flow Scenario"
    }
  };

  const currentText = translations[lang] || translations.en;
  const activeFlowData = currentText[activeFlow];

  const nodeCoords = {
    client: { x: 120, y: 170, label: lang === 'vi' ? "Ứng dụng khách" : "Client App", sub: "React Native / Web", icon: ShoppingCart },
    backend: { x: 380, y: 170, label: "Backend API", sub: ".NET Core", icon: Server },
    // channels: { x: 580, y: 80, label: ".NET Channels", sub: "In-Memory Queue", icon: Layers },
    // worker: { x: 780, y: 80, label: "Hosted Services", sub: "Background Workers", icon: Cpu },
    cache: { x: 380, y: 280, label: "IMemoryCache", sub: ".NET In-Memory", icon: Zap },
    db: { x: 700, y: 240, label: "PostgreSQL DB", sub: "Primary Store", icon: Database },
    gemini: { x: 380, y: 50, label: "Gemini AI API", sub: "Smart Menu Gen", icon: Sparkles }
  };

  const isNodeActive = (nodeId) => activeFlowData.nodes.includes(nodeId);

  // Map flows to visual path identifiers
  const flowPaths = {
    order: ["client-backend", "backend-db"],
    withdraw: ["client-backend", "backend-cache", "backend-db"],
    ai: ["client-backend", "backend-gemini", "backend-db"]
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
          {lang === 'vi' ? "Nhập doanh thu & Trừ kho" : "Daily Sales & Stock Deduction"}
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

      {/* SVG Diagram Canvas */}
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
          
          {/* client-backend */}
          <path
            d="M 180 170 L 320 170"
            stroke={isPathActive('client-backend') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('client-backend') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('client-backend') && (
            <circle r="4" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 180 170 L 320 170" />
            </circle>
          )}

          {/* backend-channels */}
          <path
            d="M 440 170 C 490 170, 500 80, 520 80"
            stroke={isPathActive('backend-channels') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-channels') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-channels') && (
            <circle r="4" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 440 170 C 490 170, 500 80, 520 80" />
            </circle>
          )}

          {/* channels-worker */}
          <path
            d="M 640 80 L 720 80"
            stroke={isPathActive('channels-worker') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('channels-worker') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('channels-worker') && (
            <circle r="4" fill="#c084fc" filter="url(#glow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 640 80 L 720 80" />
            </circle>
          )}

          {/* worker-db */}
          <path
            d="M 780 120 C 780 180, 790 240, 760 240"
            stroke={isPathActive('worker-db') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('worker-db') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('worker-db') && (
            <circle r="4" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 780 120 C 780 180, 790 240, 760 240" />
            </circle>
          )}

          {/* backend-db */}
          <path
            d="M 440 170 C 500 170, 540 240, 640 240"
            stroke={isPathActive('backend-db') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-db') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-db') && (
            <circle r="4" fill="#6366f1" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 440 170 C 500 170, 540 240, 640 240" />
            </circle>
          )}

          {/* backend-cache */}
          <path
            d="M 380 210 L 380 245"
            stroke={isPathActive('backend-cache') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-cache') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-cache') && (
            <circle r="4" fill="#fbbf24" filter="url(#glow)">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 380 210 L 380 245" />
            </circle>
          )}

          {/* backend-gemini */}
          <path
            d="M 380 130 L 380 85"
            stroke={isPathActive('backend-gemini') ? 'url(#activeGrad)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={isPathActive('backend-gemini') ? 3 : 1.5}
            fill="none"
          />
          {isPathActive('backend-gemini') && (
            <circle r="4" fill="#a78bfa" filter="url(#glow)">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 380 130 L 380 85" />
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

      {/* Details Description Panel */}
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
