import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Server, Code2, Rocket, Cpu, ChevronDown, Sparkles, Zap, Brain, Menu, X } from 'lucide-react';

const HeroLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1500);
    const timer3 = setTimeout(() => setAnimationStep(3), 2500);
    const timer4 = setTimeout(() => setShowIntro(false), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Logo Animation */}
          <div className={`mb-8 transition-all duration-1000 ${animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <div className="relative">
              <img 
                src="/logo/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
                alt="DesignPanda Logo" 
                className="h-24 w-24 mx-auto object-contain animate-pulse" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-xl opacity-30 animate-ping"></div>
            </div>
          </div>

          {/* Company Name */}
          <div className={`transition-all duration-1000 delay-500 ${animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              DesignPanda
            </h1>
          </div>

          {/* Tagline */}
          <div className={`transition-all duration-1000 delay-1000 ${animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl text-gray-300 mb-8">
              Intelligent Software Architecture Design
            </p>
            <div className="flex justify-center space-x-4">
              <Sparkles className="h-6 w-6 text-cyan-400 animate-bounce" />
              <Zap className="h-6 w-6 text-blue-400 animate-bounce delay-100" />
              <Brain className="h-6 w-6 text-purple-400 animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fadeIn">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="container mx-auto text-center px-4 relative z-10">
            <div className="animate-slideUp">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Intelligent Software Architecture Design
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 animate-fadeInUp">
                DesignPanda leverages cutting-edge AI to create optimized software architecture 
                tailored to your unique project requirements and constraints.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp">
                <Button 
                  className="group text-lg px-10 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/input')}
                >
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start New Project
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-10 py-6 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/backend-setup')}
                >
                  <Server className="mr-2 h-5 w-5" />
                  Configure Backend
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-indigo-600" />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transform your ideas into production-ready architecture in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Settings className="h-12 w-12 mb-6 text-indigo-600" />,
                  title: "Input Requirements",
                  description: "Specify your project details, constraints, and functional requirements with our intuitive interface.",
                  color: "from-indigo-500 to-blue-500"
                },
                {
                  icon: <Cpu className="h-12 w-12 mb-6 text-purple-600" />,
                  title: "AI Analysis",
                  description: "Our advanced AI analyzes requirements and determines optimal architecture patterns using machine learning.",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Code2 className="h-12 w-12 mb-6 text-cyan-600" />,
                  title: "Architecture Design",
                  description: "Receive detailed architecture diagrams, tech stack recommendations, and comprehensive deployment strategies.",
                  color: "from-cyan-500 to-teal-500"
                }
              ].map((feature, index) => (
                <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="flex flex-col items-center text-center p-8 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400/10 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-transparent rounded-full blur-3xl animate-float"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fadeInUp">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Ready to Design Your Architecture?
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-200 leading-relaxed">
                Start building better software systems with architecture designed for your specific needs. 
                Join thousands of developers who trust DesignPanda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  className="group text-lg px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/input')}
                >
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Get Started
                </Button>
                <Button 
                  className="text-lg px-12 py-6 bg-white text-indigo-900 border-2 border-white hover:bg-indigo-100 hover:border-indigo-200 shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 font-semibold"
                  onClick={() => navigate('/backend-setup')}
                >
                  <Server className="mr-2 h-5 w-5" />
                  Configure Backend
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img 
                src="/logo/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
                alt="DesignPanda Logo" 
                className="h-8 w-8 object-contain" 
              />
              <p className="text-sm text-gray-600">© 2025 DesignPanda. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroLandingPage;