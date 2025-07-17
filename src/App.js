import React, { useState, useEffect, useRef } from 'react';
import { Zap, Menu, X, ArrowRight, Play, Sparkles, Layers, Shield, ChevronRight, Twitter } from 'lucide-react';
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
  ];

  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/25">
              <img src="/Diytech.png" alt="WOOF Logo" className="w-full h-full" />
            </div>
            <span className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">WOOF</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.key}>
                <a
                  href={link.href}
                  className="px-5 py-2.5 rounded-full transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10 font-medium hover:translate-y-[-2px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
                {/* Insert Twitter icon after Demo */}
                {link.key === 'demo' && (
                  <a
                    href="https://x.com/bonk_fun" // Replace with your actual X handle
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 flex items-center px-3 py-2 rounded-full text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </React.Fragment>
            ))}
            <button 
              className="ml-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 rounded-full font-semibold text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105" 
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
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.key}>
                <a
                  href={link.href}
                  className="block w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
                {/* Insert Twitter icon after Demo */}
                {link.key === 'demo' && (
                  <a
                    href="https://twitter.com/YOUR_HANDLE" // Replace with your actual X handle
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    <span>Twitter</span>
                  </a>
                )}
              </React.Fragment>
            ))}
            <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300" onClick={() => { setCurrentPage('builder'); setIsMenuOpen(false); }}>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-6 backdrop-blur-sm hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-500">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  AI-Powered Website Generation
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                <span className="text-white block transform hover:translate-x-2 transition-transform duration-700">Build Websites</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mt-2">
                  Like Magic
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                Transform your ideas into stunning, production-ready websites in seconds.
                <span className="text-white font-medium"> No coding required.</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 rounded-full font-semibold text-lg text-white shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  onClick={() => setCurrentPage('builder')}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl transform perspective-1000 hover:rotate-y-2 transition-all duration-500">
                  <div className="bg-gray-950 rounded-xl p-8 md:p-12 min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mx-auto mb-6"></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Powerful Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mt-2">
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
                gradient: "from-orange-500 to-amber-600",
                shadow: "shadow-amber-500/20",
                delay: 0.1
              },
              { 
                icon: Shield, 
                title: "Production Ready", 
                desc: "SEO optimized, responsive, and performance focused",
                gradient: "from-amber-500 to-yellow-600",
                shadow: "shadow-yellow-500/20",
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
              <Play className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Live Demo</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              See The Magic
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mt-2">
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
            <div className="relative bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-3xl p-1 hover:from-yellow-900/30 hover:to-orange-900/30 transition-all duration-500">
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
                color: "from-yellow-500 to-orange-500",
                delay: 0
              },
              { 
                step: "02", 
                title: "AI Works Its Magic", 
                desc: "Watch as your website is generated in real-time",
                color: "from-orange-500 to-amber-500",
                delay: 0.2
              },
              { 
                step: "03", 
                title: "Deploy Instantly", 
                desc: "Export your code or deploy directly to the web",
                color: "from-amber-500 to-yellow-600",
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
          </>
        )}
      </main>
      {currentPage !== 'builder' && (
        <footer className="relative py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400">© 2024 WOOF. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ModernLandingPage;