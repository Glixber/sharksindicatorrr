import { useState } from 'react';
import WarningModal from '../components/WarningModal';

export default function Landing() {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
    if (paymentLink && paymentLink !== 'TU_STRIPE_PAYMENT_LINK') {
      window.location.href = paymentLink;
    } else {
      alert('Stripe payment link not configured');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-titanium selection:bg-accent-blue selection:text-obsidian overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10 md:space-y-12">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[300] leading-[1.1] tracking-tight text-white">
                Sharks – 5m Trading Instruccional
              </h1>

              <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-[200] text-platinum leading-relaxed max-w-xl">
                Diseñado para identificar ventanas de liquidez institucional con precisión quirúrgica.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-white text-obsidian font-sans text-[11px] font-bold tracking-widest-xl uppercase overflow-hidden transition-all hover:pr-14 w-full sm:w-auto"
                >
                  <span className="relative z-10">Adquiérelo</span>
                  <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                <button
                  onClick={() => {
                    const element = document.getElementById('more-info');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 sm:px-10 py-4 sm:py-5 border border-white/20 text-white font-sans text-[11px] font-bold tracking-widest-xl uppercase hover:bg-white/5 transition-all w-full sm:w-auto"
                >
                  Mas Información
                </button>
              </div>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] perspective-1000">
              {/* Blue Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-accent-blue/20 blur-[140px] rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Phone Frame */}
              <div className="relative z-10 rounded-[3rem] sm:rounded-[3.5rem] p-[6px] sm:p-[8px] bg-gradient-to-b from-[#3A3A3A] via-[#1A1A1A] to-[#050505] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)]">
                <div className="relative h-[580px] sm:h-[640px] md:h-[660px] w-full rounded-[2.75rem] sm:rounded-[3rem] overflow-hidden bg-black border-[1px] border-white/10">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140px] h-[32px] bg-black rounded-b-[24px] z-10 flex items-start justify-center pt-1">
                    <div className="w-16 h-1 bg-[#1a1d2e] rounded-full"></div>
                  </div>

                  {/* Status Bar */}
                  <div className="absolute top-3 left-0 right-0 px-8 flex justify-between items-center text-white text-[11px] z-20 font-semibold">
                    <span>5:52</span>
                    <div className="flex gap-2 items-center">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"/>
                      </svg>
                      <span className="text-[10px]">5G</span>
                      <svg className="w-6 h-3" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="0.5" y="0.5" width="20" height="11" rx="2"/>
                        <rect x="21" y="3.5" width="2" height="5" rx="0.5" fill="currentColor"/>
                        <rect x="2" y="2.5" width="16" height="7" rx="1" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="w-full h-full bg-black pt-12 px-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-3 items-center">
                        <div className="text-blue-500 text-xs font-mono font-bold">M15</div>
                        <div className="w-5 h-5 border border-gray-700 rounded-sm"></div>
                        <div className="w-5 h-5 border border-gray-700 rounded-sm"></div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 6v6l4 2"/>
                        </svg>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Pair Info */}
                    <div className="mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-white font-bold text-xl tracking-tight">XAUUSD</span>
                        <span className="text-gray-600 text-[10px]">• M15</span>
                      </div>
                      <div className="text-gray-600 text-[11px] font-medium">GOLD VS US DOLLAR</div>
                    </div>

                    {/* Price Info on right side */}
                    <div className="absolute top-[120px] right-4 text-right space-y-1 text-[9px] text-gray-600 z-10">
                      <div>3057.30</div>
                      <div>3053.32</div>
                      <div>3049.00</div>
                    </div>

                    {/* Chart Area - Candlesticks */}
                    <div className="relative h-[420px] flex items-end justify-around px-1 mt-6" style={{ paddingBottom: '60px' }}>
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-around">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-full h-px bg-gray-900/50"></div>
                        ))}
                      </div>

                      {/* Animated Candlesticks */}
                      {[
                        { h: 100, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 120 },
                        { h: 60, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 80 },
                        { h: 140, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 160 },
                        { h: 90, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 110 },
                        { h: 170, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 190 },
                        { h: 120, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 140 },
                        { h: 200, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 220 },
                        { h: 150, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 170 },
                        { h: 240, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 260 },
                        { h: 180, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 200 },
                        { h: 130, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 150 },
                        { h: 160, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 180 },
                        { h: 110, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 130 },
                        { h: 190, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 210 },
                        { h: 80, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 100 },
                        { h: 70, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 90 },
                        { h: 100, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 120 },
                        { h: 50, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 70 },
                        { h: 90, color: 'bg-gradient-to-b from-[#ff3366] to-[#dd2255]', wick: 110 },
                        { h: 180, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 200 },
                        { h: 280, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 300 },
                        { h: 220, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 240 },
                        { h: 270, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 290 },
                        { h: 200, color: 'bg-gradient-to-b from-[#00ff88] to-[#00dd77]', wick: 220 },
                      ].map((candle, i) => (
                        <div key={i} className="relative flex flex-col items-center justify-end" style={{ animation: `fadeIn 0.4s ease-out ${i * 0.08}s both` }}>
                          {/* Wick */}
                          <div className="w-[1px] bg-gray-700" style={{ height: `${candle.wick}px` }}></div>
                          {/* Candle body */}
                          <div
                            className={`w-2.5 ${candle.color} rounded-[1px] shadow-lg absolute bottom-0`}
                            style={{ height: `${candle.h}px` }}
                          ></div>
                        </div>
                      ))}

                      {/* Buy Signal + Confirmed Label */}
                      <div className="absolute top-6 right-4 space-y-1">
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 px-2 py-1 rounded text-[9px] text-gray-400 text-right">
                          BUY SIGNAL
                        </div>
                        <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500 px-3 py-1.5 rounded text-white text-xs font-bold">
                          Confirmed
                        </div>
                      </div>

                      {/* Price label on candle */}
                      <div className="absolute top-[180px] right-12 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                        32
                      </div>
                    </div>

                    {/* Time labels at bottom */}
                    <div className="absolute bottom-16 left-4 right-4 flex justify-between text-[9px] text-gray-700">
                      <span>29 Feb 09:15</span>
                      <span>29 Feb 17:15</span>
                      <span>1 Mar 02:15</span>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-around px-6 text-gray-600">
                      <div className="flex flex-col items-center gap-1.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        <span className="text-[8px] font-medium tracking-wider">QUOTES</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                        <span className="text-[8px] font-medium tracking-wider">CHART</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                        <span className="text-[8px] font-medium tracking-wider text-white">TRADE</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-[8px] font-medium tracking-wider">HISTORY</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        <span className="text-[8px] font-medium tracking-wider">SETTINGS</span>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* More Info Section */}
      <div id="more-info" className="opacity-0 pointer-events-none">
        {/* Placeholder for scroll target */}
      </div>

      <WarningModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
