import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Zap, Globe, Users, Star, Menu, X, ArrowRight, Play, Check } from 'lucide-react';
import LiveRenderer from './components/LiveRenderer';

const ModernLandingPage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Navbar links for anchor scrolling
  const navLinks = [
    { key: 'home', label: 'Home', href: '#home' },
    { key: 'features', label: 'Features', href: '#features' },
    { key: 'demo', label: 'Demo', href: '#demo' },
    { key: 'pricing', label: 'Pricing', href: '#pricing' },
    { key: 'about', label: 'About', href: '#about' },
  ];

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">WebCraft AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="px-4 py-2 rounded-lg transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105" onClick={() => setCurrentPage('builder')}>
              Get Started
            </button>
          </div>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="block w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105" onClick={() => { setCurrentPage('builder'); setIsMenuOpen(false); }}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Each section gets an id for anchor scrolling
  const HomeSection = () => (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Build Websites
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              In Real Time
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into stunning websites instantly with AI-powered generation. 
            No coding required, just describe your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              onClick={() => setCurrentPage('builder')}
            >
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <a href="#demo" className="group border-2 border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-cyan-400 hover:bg-slate-800/50 transition-all duration-300 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  // The rest of the sections are unchanged, just add id and remove state logic
  const FeaturesSection = () => (
    <section id="features" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to create professional websites without any technical knowledge
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Instant Generation", desc: "Create full websites in seconds with AI" },
            { icon: Globe, title: "Responsive Design", desc: "Perfect on all devices automatically" },
            { icon: Code, title: "Clean Code", desc: "Production-ready HTML, CSS & JavaScript" }
          ].map((feature, idx) => (
            <div key={idx} className="group p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const DemoSection = () => (
    <section id="demo" className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            See It In <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Watch how easy it is to create professional websites with just a few words
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-12">
          <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20"></div>
            <div className="relative text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-white text-lg">Click to watch demo</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Describe Your Vision", desc: "Tell us what kind of website you want to create" },
            { step: "02", title: "AI Generates Code", desc: "Watch as your website is built in real-time" },
            { step: "03", title: "Customize & Export", desc: "Make final tweaks and download your code" }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const PricingSection = () => (
    <section id="pricing" className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Simple <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free, upgrade anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Starter",
              price: "Free",
              desc: "Perfect for trying out",
              features: ["5 websites per month", "Basic templates", "Standard support", "Export HTML/CSS"],
              popular: false
            },
            {
              name: "Pro",
              price: "$19",
              desc: "For serious creators",
              features: ["Unlimited websites", "Premium templates", "Priority support", "Advanced customization", "Commercial license"],
              popular: true
            },
            {
              name: "Team",
              price: "$49",
              desc: "For teams & agencies",
              features: ["Everything in Pro", "Team collaboration", "White-label exports", "API access", "Dedicated support"],
              popular: false
            }
          ].map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
              plan.popular 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500 shadow-2xl shadow-cyan-500/25' 
                : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-white mb-2">
                  {plan.price}
                  {plan.price !== "Free" && <span className="text-lg text-slate-400">/month</span>}
                </div>
                <p className="text-slate-400">{plan.desc}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section id="about" className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">WebCraft AI</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We're on a mission to democratize web development and make beautiful websites accessible to everyone.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              Founded in 2024, WebCraft AI emerged from a simple observation: creating websites shouldn't require years of coding experience. 
              We believe that everyone has great ideas, and technology should empower, not limit creativity.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Our team of AI researchers and web developers have created a platform that understands design principles, 
              user experience, and modern web standards to generate professional websites from simple descriptions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "50K+", label: "Websites Created" },
              { number: "99.9%", label: "Uptime" },
              { number: "2.3s", label: "Avg Generation Time" },
              { number: "24/7", label: "Support" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-12">Meet The Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Chen", role: "CEO & Co-founder", avatar: "👨‍💼" },
              { name: "Sarah Kim", role: "CTO & Co-founder", avatar: "👩‍💻" },
              { name: "Mike Johnson", role: "Head of AI", avatar: "👨‍🔬" }
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                  {member.avatar}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // Main render
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navigation />
      <main className="transition-all duration-500 ease-in-out">
        {currentPage === 'builder' ? (
          <LiveRenderer onNavigateHome={() => setCurrentPage('home')} />
        ) : (
          <>
            <HomeSection />
            <FeaturesSection />
            <DemoSection />
            <PricingSection />
            <AboutSection />
          </>
        )}
      </main>
      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">WebCraft AI</span>
            </div>
            <p className="text-slate-400">© 2024 WebCraft AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModernLandingPage;