"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Star, 
  Shield, 
  Zap, 
  Target, 
  Lock, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Briefcase,
  Cpu,
  Bot,
  Gamepad2,
  CreditCard,
  Bitcoin
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock email signup
    setTimeout(() => {
      setIsLoading(false);
      alert('Díky za registraci! Brzy se ozveme s beta přístupem.');
      setEmail('');
    }, 2000);
  };

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  const roadmapData = [
    {
      phase: "01",
      title: "NFT DESIGN",
      description: "The project was conceived and designed by Ahmed Younes, who as executive producer at Dubai TV has created a number of captivating programmes, election campaigns, and advertisements for television stations in Egypt, Dubai, the UAE, and Europe. His most recent project was EXPO 2020.",
      icon: <Target className="w-6 h-6" />
    },
    {
      phase: "02", 
      title: "SMART CONTRACT",
      description: "The software developers behind the many successes of Apartmania Holding a.s. have engineered a unique smart contract exclusively for Gavlik Capital NFT.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      phase: "03",
      title: "OPENSEA LAUNCH", 
      description: "Gavlik Capital NFT will debut in June 2022 on OpenSea, the world's largest NFT marketplace.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      phase: "04",
      title: "REWARD STABILITY",
      description: "Each owner of a GC NFT CARD will earn a regular quarterly profit share in the form of a reward paid to their MetaMask wallet. The goal for 2023 is stabilization of the regular rewards and continued growth of the portfolio.",
      icon: <Award className="w-6 h-6" />
    },
    {
      phase: "05",
      title: "BTC BOT NFT",
      description: "Gavlik Capital will soon be launching a new project in its ecosystem. The BTC BOT will generate regular monthly rewards and put a portion of the profits in bitcoin.",
      icon: <Bitcoin className="w-6 h-6" />
    },
    {
      phase: "06",
      title: "PHYSICAL MERCH AND LIVE EVENTS",
      description: "The video animation in the MetaMask wallet is only the beginning. We are also preparing physical silver and gold cards that will serve as tickets to Gavlik Capital live events. More info coming soon..",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      phase: "07",
      title: "GAMING / METAVERSE NFT",
      description: "The specialists in the Gavlik Capital ecosystem have yet another exciting project in the pipeline, this time focusing on gaming and the metaverse.",
      icon: <Gamepad2 className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#151515] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 animate-fade-in-left">
              <div className="w-8 h-8 bg-[#F9D523] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">GC</span>
              </div>
              <span className="text-white font-bold text-xl">Gavlik Capital</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 animate-fade-in-right">
              <a href="#products" className="text-gray-300 hover:text-[#F9D523] transition-colors">Products</a>
              <a href="#roadmap" className="text-gray-300 hover:text-[#F9D523] transition-colors">Roadmap</a>
              <a href="#founder" className="text-gray-300 hover:text-[#F9D523] transition-colors">Founder</a>
              <a href="#vip-club" className="text-gray-300 hover:text-[#F9D523] transition-colors">VIP Club</a>
              <a href="#faq" className="text-gray-300 hover:text-[#F9D523] transition-colors">FAQ</a>
              <button
                onClick={handleGetStarted}
                className="bg-[#F9D523] hover:bg-[#e3c320] text-black font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Launch App
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - POUZE TADY ANIMOVANÉ POZADÍ */}
      <section className="hero-animated-bg pt-32 pb-20 px-6 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6 animate-fade-in-left">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  <span className="text-white">Secure and Smart</span><br />
                  <span className="text-white">NFT Investment</span><br />
                  <span className="text-[#F9D523]">Crypto Portfolio</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  GC Card owner has a free mint of the next NFT projects.
                  Gavlik Capital provides crypto-based financial services with focus on 
                  decentralized asset management.
                </p>
              </div>

              {/* Email Signup */}
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md animate-fade-in-left animate-delay-200">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#F9D523] focus:bg-white/20 transition-all backdrop-blur-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#F9D523] hover:bg-[#e3c320] text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Now'}
                </button>
              </form>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in-right animate-delay-300">
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#F9D523]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                
                {/* Phone */}
                <div className="relative w-80 h-[600px] bg-black rounded-[3rem] p-4 shadow-2xl border border-gray-800">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-full bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-white text-xl font-bold">My Portfolio</h2>
                        <div className="w-8 h-8 bg-[#F9D523] rounded-full"></div>
                      </div>

                      <div className="bg-gradient-to-r from-[#F9D523] to-[#e3c320] rounded-2xl p-6 mb-6">
                        <p className="text-black/70 text-sm">Portfolio Overview</p>
                        <p className="text-black text-3xl font-bold">Investment Dashboard</p>
                        <p className="text-black/70 text-sm mt-2">Manage your portfolio</p>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-6">
                        {[
                          { icon: <CreditCard className="w-4 h-4" />, label: "Buy", color: "bg-[#F9D523]" },
                          { icon: <TrendingUp className="w-4 h-4" />, label: "Sell", color: "bg-green-500" },
                          { icon: <Zap className="w-4 h-4" />, label: "Send", color: "bg-blue-500" },
                          { icon: <Bot className="w-4 h-4" />, label: "Swap", color: "bg-purple-500" }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-gray-800 rounded-xl p-3 text-center">
                            <div className={`w-8 h-8 ${item.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                              {item.icon}
                            </div>
                            <p className="text-white text-xs">{item.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-white font-semibold">My Holdings</h3>
                        <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F9D523] rounded-full flex items-center justify-center">
                              <span className="text-black font-bold">GC</span>
                            </div>
                            <div>
                              <p className="text-white font-medium">GC Cards</p>
                              <p className="text-gray-400 text-sm">Investment NFTs</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">Active</p>
                            <p className="text-green-500 text-sm">Growing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZBYTEK STRÁNKY S GLASSMORPHISM POZADÍM */}
      <div className="glassmorphism-bg">

        {/* Floating Cards Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute top-10 left-10 w-80 h-48 bg-gradient-to-br from-[#F9D523] to-[#e3c320] rounded-2xl p-6 rotate-12 shadow-2xl backdrop-blur-sm animate-fade-in-left">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-black font-bold text-xl">Crypto Custody</h3>
                    <Shield className="w-8 h-8 text-black/60" />
                  </div>
                  <p className="text-black/80 text-sm mb-4">Safe and secure institutional-grade cryptocurrency storage and management</p>
                  <div className="flex justify-between items-end">
                    <span className="text-black/60 text-xs">Enterprise Security</span>
                    <span className="text-black font-bold text-lg">Protected</span>
                  </div>
                </div>

                <div className="absolute top-32 right-10 w-80 h-48 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 -rotate-6 shadow-2xl backdrop-blur-sm animate-fade-in-right animate-delay-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-bold text-xl">Swap Private Digital Assets</h3>
                    <Zap className="w-8 h-8 text-white/80" />
                  </div>
                  <p className="text-white/90 text-sm mb-4">Trade NFTs and crypto with complete privacy and security protocols</p>
                  <button className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Find Out More →
                  </button>
                </div>
              </div>

              <div className="space-y-8 animate-fade-in-right animate-delay-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[#F9D523] text-sm font-bold">→ Usage Gavlik Financials ?</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Professional Crypto<br />
                    <span className="text-[#F9D523]">Investment Platform</span>
                  </h2>

                  <p className="text-xl text-gray-300 leading-relaxed">
                    Advanced blockchain technology combined with traditional finance expertise. 
                    Our platform offers institutional-grade security with retail-friendly interface.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 stagger-animation">
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                    <div className="icon-container bg-[#F9D523] mb-4">
                      <Target className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Smart Investing</h3>
                    <p className="text-gray-400 text-sm">AI-powered investment strategies with real-time market analysis</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                    <div className="icon-container bg-green-500 mb-4">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Bank-Level Security</h3>
                    <p className="text-gray-400 text-sm">Multi-signature wallets and cold storage protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 px-6 border-y border-white/10">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 stagger-animation">
              {["CoinGecko", "Binance", "CoinMarketCap", "DeFiPulse", "CryptoCompare"].map((partner) => (
                <div key={partner} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded"></div>
                  <span className="text-white font-bold text-lg">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Roadmap</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our journey from concept to the future of decentralized investment
              </p>
            </div>

            <div className="timeline">
              {roadmapData.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="icon-container bg-[#F9D523] text-black">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[#F9D523] font-bold text-lg">{item.phase}</span>
                        <h3 className="text-white font-bold text-xl">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Products - POUZE ŽLUTÉ */}
        <section id="products" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Products</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Innovative blockchain solutions for modern investors
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
              {/* GC Cards */}
              <div className="product-card">
                <div className="absolute top-4 right-4 w-16 h-16 bg-black/10 rounded-full"></div>
                <div className="mb-6">
                  <div className="icon-container bg-black/20 mb-4">
                    <CreditCard className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">GC Cards</h3>
                  <p className="text-black/80">Investment NFT cards with guaranteed returns and secondary market trading</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/70">Type:</span>
                    <span className="font-bold">Investment NFT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/70">Status:</span>
                    <span className="font-bold text-green-800">Active</span>
                  </div>
                </div>
              </div>

              {/* BTC Bot */}
              <div className="product-card">
                <div className="absolute top-4 right-4 w-16 h-16 bg-black/10 rounded-full"></div>
                <div className="mb-6">
                  <div className="icon-container bg-black/20 mb-4">
                    <Bitcoin className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">BTC Bot</h3>
                  <p className="text-black/80">Automated Bitcoin trading bot with advanced algorithms and risk management</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/70">Type:</span>
                    <span className="font-bold">Trading Bot</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/70">Status:</span>
                    <span className="font-bold text-green-800">Running</span>
                  </div>
                </div>
              </div>

              {/* Algo Trader */}
              <div className="product-card">
                <div className="absolute top-4 right-4 w-16 h-16 bg-black/10 rounded-full"></div>
                <div className="mb-6">
                  <div className="icon-container bg-black/20 mb-4">
                    <Cpu className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Algo Trader</h3>
                  <p className="text-black/80">AI-powered algorithmic trading with machine learning optimization</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/70">Type:</span>
                    <span className="font-bold">AI Trading</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/70">Status:</span>
                    <span className="font-bold text-green-800">Advanced</span>
                  </div>
                </div>
              </div>

              {/* VC NFT */}
              <div className="product-card">
                <div className="absolute top-4 right-4 w-16 h-16 bg-black/10 rounded-full"></div>
                <div className="mb-6">
                  <div className="icon-container bg-black/20 mb-4">
                    <Star className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">VC NFT</h3>
                  <p className="text-black/80">Exclusive venture capital NFT collection with investment privileges</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/70">Type:</span>
                    <span className="font-bold">Investment NFT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/70">Rarity:</span>
                    <span className="font-bold text-green-800">Ultra Rare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIP Club Section */}
        <section id="vip-club" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-[#F9D523]">VIP</span> Club
              </h2>
              <p className="text-2xl text-white mb-4">
                Catch them all and be a part of VIP CLUB
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in-left">
                <div className="space-y-6">
                  {[
                    { icon: <MessageCircle className="w-6 h-6" />, text: "Private chat with the founder" },
                    { icon: <Shield className="w-6 h-6" />, text: "Exclusive information" },
                    { icon: <MapPin className="w-6 h-6" />, text: "Business trips with the founder" },
                    { icon: <Star className="w-6 h-6" />, text: "And more exclusive benefits" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10 hover:border-[#F9D523] transition-colors">
                      <div className="icon-container bg-[#F9D523] text-black">
                        {item.icon}
                      </div>
                      <span className="text-white font-medium text-lg">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-fade-in-right animate-delay-200">
                <div className="vip-cards-container">
                  <div className="vip-card orange">
                    <div className="text-6xl font-bold">G</div>
                    <div className="text-white/90 text-sm mt-2">Orange Card</div>
                  </div>
                  <div className="vip-card gold">
                    <div className="text-6xl font-bold text-black">G</div>
                    <div className="text-black/80 text-sm mt-2">Gold Card</div>
                  </div>
                  <div className="vip-card blue">
                    <div className="text-6xl font-bold text-white">G</div>
                    <div className="text-white/90 text-sm mt-2">Blue Card</div>
                  </div>
                  <div className="vip-card yellow">
                    <div className="text-6xl font-bold text-black">G</div>
                    <div className="text-black/80 text-sm mt-2">Yellow Card</div>
                  </div>
                  <div className="vip-card purple">
                    <div className="text-6xl font-bold text-white">G</div>
                    <div className="text-white/90 text-sm mt-2">Purple Card</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section id="founder" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-[#F9D523]">Founder</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="founder-section p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in-left">
                    <div className="relative">
                      <div className="founder-image bg-gray-800 rounded-2xl p-8 flex items-center justify-center">
                        <Users className="w-32 h-32 text-[#F9D523]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 animate-fade-in-right animate-delay-200">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">Jakub Gavlík, founder</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        I've spent more than ten years navigating the world of investment and enterprise. 
                        My many successes in that time have given me the experience and contacts necessary 
                        to take Gavlik Capital NFT from idea to reality. Today, backed by a team of seasoned 
                        professionals, I oversee a dynamic investment portfolio comprising assets in cryptocurrency, 
                        stocks, and real estate. In addition to heading Gavlik Capital NFT, I'm also co-CEO of 
                        Apartmania Holding a.s., whose 2022 market capitalization was calculated at approximately 
                        USD 55 million.
                      </p>
                    </div>

                    <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                      <blockquote className="text-xl italic text-white mb-4">
                        "The two most important ingredients of success? Simplicity and common sense."
                      </blockquote>
                    </div>

                    <div className="flex gap-4">
                      {[
                        { icon: <Mail className="w-5 h-5" />, label: "Email" },
                        { icon: <Phone className="w-5 h-5" />, label: "Phone" },
                        { icon: <MessageCircle className="w-5 h-5" />, label: "Social" }
                      ].map((item, index) => (
                        <div key={index} className="social-icon">
                          {item.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trade NFTs with Crypto */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative animate-fade-in-left">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 shadow-2xl">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="icon-container bg-[#F9D523]">
                          <Star className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-white font-medium">Trade</span>
                      </div>
                      <div className="text-white text-2xl font-bold">NFT Trading</div>
                      <div className="text-white/70 text-sm">Secure marketplace</div>
                    </div>
                    
                    <div className="bg-white/20 rounded-xl p-4">
                      <div className="text-white/70 text-sm mb-2">Payment Method</div>
                      <div className="flex items-center gap-3">
                        <div className="icon-container bg-orange-500 text-white">
                          <Bitcoin className="w-5 h-5" />
                        </div>
                        <span className="text-white font-medium">Bitcoin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 animate-fade-in-right animate-delay-200">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Trade NFTs with Crypto
                  </h2>
                  <p className="text-xl text-gray-300">
                    No complicated fiat code. Just simple names
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    "Use our registered with phone number and their nickname",
                    "You can choose if you would like to be found with phone number or name",
                    "Easy to use yet top-tier privacy - we give your data back to you in reverse encrypted system !",
                    "Secure and transparent blockchain transactions"
                  ].map((text, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#F9D523] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-black font-bold text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="bg-transparent border-2 border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105">
                  Find Out More →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300">
                Everything you need to know about Gavlik Capital
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4 stagger-animation">
              {[
                {
                  q: "What is Gavlik Capital?",
                  a: "Gavlik Capital is a decentralized investment platform offering NFT-based financial products, automated trading bots, and crypto portfolio management tools."
                },
                {
                  q: "Is it possible to use the long term?",
                  a: "Yes, all our products are designed for long-term investment strategies with sustainable returns and compound growth mechanisms."
                },
                {
                  q: "I lost my old phone. Can I still access my funds?",
                  a: "Yes, your funds are secured by your wallet private keys. You can restore access using your recovery phrase on any device."
                },
                {
                  q: "Does it can work creating a transaction?",
                  a: "All transactions are processed on blockchain networks ensuring transparency, security, and immutability of your investments."
                },
                {
                  q: "Can I be send other countries?",
                  a: "Yes, our platform supports global users with multi-currency support and international compliance standards."
                }
              ].map((item, index) => (
                <details key={index} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 group">
                  <summary className="p-6 cursor-pointer flex justify-between items-center text-white font-medium text-lg hover:text-[#F9D523] transition-colors">
                    <span>{item.q}</span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter & Updates */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-[#F9D523] to-[#e3c320] rounded-3xl p-12 text-center animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Stay Updated with Gavlik Capital
              </h2>
              <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest news about new NFT drops, trading opportunities, and platform updates delivered to your inbox.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white border-0 rounded-full text-black placeholder-black/60 focus:outline-none focus:ring-4 focus:ring-black/20"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-[#F9D523] font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/10">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4 animate-fade-in-up">
                  <div className="w-8 h-8 bg-[#F9D523] rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">GC</span>
                  </div>
                  <span className="text-white font-bold text-xl">Gavlik Capital</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Secure and smart NFT investment crypto portfolio platform for the future of decentralized finance.
                </p>
                <div className="flex gap-4">
                  {[<Mail className="w-5 h-5" />, <Phone className="w-5 h-5" />, <MessageCircle className="w-5 h-5" />].map((icon, idx) => (
                    <div key={idx} className="social-icon cursor-pointer">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-100">
                <h3 className="text-white font-bold text-lg mb-4">Products</h3>
                <div className="space-y-3 text-gray-400">
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">GC Cards NFTs</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">BTC Trading Bot</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Algo Trader AI</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">VC NFT Collection</a>
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-200">
                <h3 className="text-white font-bold text-lg mb-4">Support</h3>
                <div className="space-y-3 text-gray-400">
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Help Center</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Contact Us</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Community</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">API Documentation</a>
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-300">
                <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                <div className="space-y-3 text-gray-400">
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Terms of Service</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Privacy Policy</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Cookie Policy</a>
                  <a href="#" className="block hover:text-[#F9D523] transition-colors">Disclaimer</a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Gavlik Capital. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <span>Made with ❤️ for the crypto community</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}