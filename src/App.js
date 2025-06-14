import React, { useState, useEffect, useRef } from 'react';
import { Zap, Menu, X, ArrowRight, Play, Check, Sparkles, Layers, Shield, ChevronRight, Star } from 'lucide-react';
import LiveRenderer from './components/LiveRenderer';

// Custom hook for scroll reveal animations
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // Stop observing once visible
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

const ModernLandingPage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll CSS and scroll detection
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('scroll', handleScroll);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/25">
              <img src="/Diytech.png" alt="DIY TECH Logo" className="w-full h-full" />
            </div>
            <span className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">DIY TECH</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="px-5 py-2.5 rounded-full transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10 font-medium hover:translate-y-[-2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button 
              className="ml-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full font-semibold text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105" 
              onClick={() => setCurrentPage('builder')}
            >
              Start Building
            </button>
          </div>
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="block w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300" onClick={() => { setCurrentPage('builder'); setIsMenuOpen(false); }}>
              Start Building
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Premium Hero Section
  const HomeSection = () => {
    // Animation state that only runs once
    const [animationComplete, setAnimationComplete] = useState(false);
    
    // Run this effect only once when component mounts
    useEffect(() => {
      // Set a flag after component mounts to trigger the animation
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }, []);

    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          {/* Static gradient orbs - removed animations */}
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 60 0 L 0 0 0 60%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.03)%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Left Column: Main Content */}
            <div 
              className={`lg:w-1/2 text-left lg:pr-8 transition-all duration-1000 ease-out ${
                animationComplete ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-sm hover:from-purple-500/20 hover:to-cyan-500/20 transition-all duration-500">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI-Powered Website Generation
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                <span className="text-white block transform hover:translate-x-2 transition-transform duration-700">Build Websites</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                  Like Magic
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                Transform your ideas into stunning, production-ready websites in seconds.
                <span className="text-white font-medium"> No coding required.</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full font-semibold text-lg text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  onClick={() => setCurrentPage('builder')}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <a 
                  href="#demo" 
                  className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-lg text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  Watch Demo
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="hidden md:block">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">Trusted by innovative teams</p>
                <div className="flex flex-wrap items-center gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-20 bg-white/5 rounded-md flex items-center justify-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                      <div className="h-3 w-12 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column: Floating UI Preview */}
            <div 
              className={`lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 ease-out delay-300 ${
                animationComplete ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative mx-auto max-w-xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl transform perspective-1000 hover:rotate-y-2 transition-all duration-500">
                  <div className="bg-gray-950 rounded-xl p-8 md:p-12 min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl mx-auto mb-6"></div>
                      <div className="h-4 bg-gray-800 rounded-full w-48 mx-auto mb-4"></div>
                      <div className="h-3 bg-gray-800 rounded-full w-32 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Premium Features Section
  const FeaturesSection = () => {
    const [featuresRef, areFeaturesVisible] = useScrollReveal();
    const [featureCardsRef, areFeatureCardsVisible] = useScrollReveal();

    return (
      <section id="features" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div 
            className={`text-center mb-16 md:mb-20 ${areFeaturesVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            ref={featuresRef}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Powerful Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                Build Faster
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our AI understands design principles, modern frameworks, and best practices to deliver production-ready code
            </p>
          </div>
          
          <div 
            className={`grid md:grid-cols-3 gap-6 md:gap-8 ${areFeatureCardsVisible ? '' : 'opacity-0'}`}
            ref={featureCardsRef}
          >
            {[
              { 
                icon: Zap, 
                title: "Lightning Fast", 
                desc: "Generate complete websites in under 10 seconds",
                gradient: "from-yellow-500 to-orange-600",
                shadow: "shadow-orange-500/20",
                delay: 0
              },
              { 
                icon: Layers, 
                title: "Modern Stack", 
                desc: "Clean HTML5, CSS3, and JavaScript with best practices",
                gradient: "from-cyan-500 to-blue-600",
                shadow: "shadow-blue-500/20",
                delay: 0.1
              },
              { 
                icon: Shield, 
                title: "Production Ready", 
                desc: "SEO optimized, responsive, and performance focused",
                gradient: "from-purple-500 to-pink-600",
                shadow: "shadow-purple-500/20",
                delay: 0.2
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative p-8 bg-gradient-to-b from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2"
                style={{ 
                  transform: 'translateY(20px)',
                  opacity: 0,
                  animation: areFeatureCardsVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                  animationDelay: `${feature.delay}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg ${feature.shadow} group-hover:shadow-xl group-hover:scale-110 transition-all`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">{feature.title}</h3>
                <p className="relative text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Premium Demo Section
  const DemoSection = () => {
    const [demoHeaderRef, isDemoHeaderVisible] = useScrollReveal();
    const [videoRef, isVideoVisible] = useScrollReveal();
    const [stepsRef, areStepsVisible] = useScrollReveal();

    return (
      <section id="demo" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div 
            className={`text-center mb-16 md:mb-20 ${isDemoHeaderVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            ref={demoHeaderRef}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
              <Play className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Live Demo</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              See The Magic
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mt-2">
                In Action
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Watch how our AI transforms simple descriptions into beautiful, functional websites
            </p>
          </div>
          
          {/* Video Player Mock */}
          <div 
            className={`relative max-w-5xl mx-auto mb-16 md:mb-20 ${isVideoVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            ref={videoRef}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl p-1 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500">
              <div className="bg-black rounded-3xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="relative transform transition-transform duration-500 group-hover:scale-110">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Process Steps */}
          <div 
            className={`grid lg:grid-cols-3 gap-6 md:gap-8 ${areStepsVisible ? '' : 'opacity-0'}`}
            ref={stepsRef}
          >
            {[
              { 
                step: "01", 
                title: "Describe Your Vision", 
                desc: "Use natural language to describe your ideal website",
                color: "from-cyan-500 to-blue-500",
                delay: 0
              },
              { 
                step: "02", 
                title: "AI Works Its Magic", 
                desc: "Watch as your website is generated in real-time",
                color: "from-blue-500 to-purple-500",
                delay: 0.2
              },
              { 
                step: "03", 
                title: "Deploy Instantly", 
                desc: "Export your code or deploy directly to the web",
                color: "from-purple-500 to-pink-500",
                delay: 0.4
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="relative group"
                style={{
                  transform: 'translateY(20px)',
                  opacity: 0,
                  animation: areStepsVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                  animationDelay: `${item.delay}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 rounded-2xl transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div>
                <div className="relative p-6 md:p-8 hover:transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-6 group-hover:transform group-hover:translate-x-2 transition-transform duration-300`}>
                  {item.step}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:transform group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Premium Pricing Section
  const PricingSection = () => {
    const [pricingHeaderRef, isPricingHeaderVisible] = useScrollReveal();
    const [pricingCardsRef, arePricingCardsVisible] = useScrollReveal();

    return (
      <section id="pricing" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div 
            className={`text-center mb-16 md:mb-20 ${isPricingHeaderVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            ref={pricingHeaderRef}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Simple Pricing</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent mt-2">
                Perfect Plan
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          
          <div 
            className={`grid lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto ${arePricingCardsVisible ? '' : 'opacity-0'}`}
            ref={pricingCardsRef}
          >
            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                desc: "Perfect for trying out",
                features: ["5 websites per month", "Basic templates", "Community support", "Export to HTML/CSS"],
                cta: "Start Free",
                popular: false,
                gradient: "from-gray-600 to-gray-700",
                borderGradient: "from-gray-600 to-gray-700",
                delay: 0
              },
              {
                name: "Pro",
                price: "$19",
                period: "/month",
                desc: "For serious creators",
                features: ["Unlimited websites", "Premium templates", "Priority support", "Advanced customization", "Commercial license", "API access"],
                cta: "Start Free Trial",
                popular: true,
                gradient: "from-cyan-500 via-blue-500 to-purple-600",
                borderGradient: "from-cyan-400 via-blue-400 to-purple-500",
                delay: 0.15
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                desc: "For teams & agencies",
                features: ["Everything in Pro", "White-label options", "Dedicated support", "Custom integrations", "SLA guarantee", "Advanced analytics"],
                cta: "Contact Sales",
                popular: false,
                gradient: "from-purple-600 to-pink-600",
                borderGradient: "from-purple-500 to-pink-500",
                delay: 0.3
              }
            ].map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative group ${plan.popular ? 'lg:-mt-8' : ''}`}
                style={{
                  transform: 'translateY(20px)',
                  opacity: 0,
                  animation: arePricingCardsVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                  animationDelay: `${plan.delay}s`
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-0 right-0 flex justify-center z-10">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-purple-500/25">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`relative h-full p-8 md:p-10 rounded-3xl border transition-all duration-500 transform hover:-translate-y-2 ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-transparent shadow-2xl' 
                    : 'bg-gray-900/30 border-white/10 hover:border-white/20'
                }`}>
                  {plan.popular && (
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.borderGradient} p-[1px]`}>
                      <div className="w-full h-full bg-gray-950 rounded-3xl"></div>
                  </div>
                  )}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">{plan.name}</h3>
                    <p className="text-gray-400 mb-8 text-base">{plan.desc}</p>
                    <div className="flex items-baseline mb-10 group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-5xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2 text-lg">{plan.period}</span>
                </div>
                    <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center gap-3 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIdx * 50}ms` }}>
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                    <button className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                  plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105`
                        : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                      {plan.cta}
                </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Premium About Section
  const AboutSection = () => {
    const [aboutHeaderRef, isAboutHeaderVisible] = useScrollReveal();
    const [aboutContentRef, isAboutContentVisible] = useScrollReveal();
    const [statsRef, areStatsVisible] = useScrollReveal();
    const [ctaRef, isCtaVisible] = useScrollReveal();

    return (
      <section id="about" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div 
            className={`text-center mb-16 md:mb-20 ${isAboutHeaderVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            ref={aboutHeaderRef}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Our Story</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Building The Future of
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mt-2">
                Web Development
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize web development and empower creators worldwide
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-32">
            <div 
              className={`${isAboutContentVisible ? 'animate-fadeInRight' : 'opacity-0'}`}
              ref={aboutContentRef}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 hover:translate-x-2 transition-transform duration-500">
                Empowering creators since 2024
              </h3>
              <p className="text-gray-400 text-base md:text-lg mb-6 leading-relaxed hover:text-gray-300 transition-colors duration-300">
                DIY TECH was born from a simple observation: creating websites shouldn't require years of coding experience. 
                Our team of AI researchers and web developers have built a platform that understands design principles, 
                user experience, and modern web standards.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed hover:text-gray-300 transition-colors duration-300">
                We believe that everyone has great ideas, and technology should empower, not limit creativity. 
                That's why we've made it our mission to make web development accessible to everyone.
              </p>
            </div>
            
            <div 
              className={`grid grid-cols-2 gap-4 md:gap-6 ${areStatsVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}
              ref={statsRef}
            >
              {[
                { number: "10K+", label: "Websites Created", gradient: "from-cyan-500 to-blue-500" },
                { number: "99.9%", label: "Uptime SLA", gradient: "from-blue-500 to-purple-500" },
                { number: "10.8s", label: "Avg Generation", gradient: "from-purple-500 to-pink-500" },
                { number: "150+", label: "Countries", gradient: "from-pink-500 to-red-500" }
              ].map((stat, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  <div className="relative p-6 md:p-8 text-center">
                    <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:transform group-hover:translate-y-[-5px] transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div 
            className={`relative ${isCtaVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            ref={ctaRef}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-900/70 backdrop-blur-xl rounded-3xl p-10 md:p-16 text-center border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators who are building the future of the web
              </p>
              <button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full font-semibold text-lg text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                onClick={() => setCurrentPage('builder')}
              >
                Start Building for Free
                <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Main render
  return (
    <div className="app-container bg-black text-white">
      <Navigation />
      <main className="main-content">
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
      {currentPage !== 'builder' && (
        <footer className="relative py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400">© 2024 DIY TECH. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ModernLandingPage;