import React, { useEffect, useState, memo } from 'react';

const SplashScreen = memo(({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Create a progress animation from 0 to 100%
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);
    
    // Start fade out animation after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    
    // Complete splash screen after animation duration
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);
    
    // Handle app initialization
    const initApp = () => {
      console.log('App initialized');
    };
    
    initApp();
    
    // Prevent interaction during splash
    document.body.style.pointerEvents = 'none';
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.pointerEvents = 'auto';
    };
  }, [onComplete]);
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#A8DDDF] to-[#40BFC1] ${
        fadeOut ? 'animate-fadeOut' : 'animate-fadeIn'
      }`} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Nezto loading screen"
    >
      <div className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center">
        {/* Bubbles */}
        <div className="absolute top-[10%] left-[30%] w-[60px] h-[60px] rounded-full border-2 border-white/70 bg-white/10 animate-float" aria-hidden="true">
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/60 rounded-full"></div>
        </div>
        <div className="absolute top-[25%] left-[20%] w-[50px] h-[50px] rounded-full border-2 border-white/70 bg-white/10 animate-float animation-delay-700" aria-hidden="true">
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/60 rounded-full"></div>
        </div>
        <div className="absolute top-[30%] left-[10%] w-[30px] h-[30px] rounded-full border-2 border-white/70 bg-white/10 animate-float animation-delay-500" aria-hidden="true">
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/60 rounded-full"></div>
        </div>
        <div className="absolute bottom-[20%] right-[10%] w-[40px] h-[40px] rounded-full border-2 border-white/70 bg-white/10 animate-float animation-delay-800" aria-hidden="true">
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/60 rounded-full"></div>
        </div>
        <div className="absolute bottom-[10%] right-[20%] w-[30px] h-[30px] rounded-full border-2 border-white/70 bg-white/10 animate-float animation-delay-600" aria-hidden="true">
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/60 rounded-full"></div>
        </div>
        
        {/* Small Bubbles */}
        <div className="absolute top-[40%] left-[15%] w-[15px] h-[15px] rounded-full bg-white animate-float animation-delay-400" aria-hidden="true"></div>
        <div className="absolute bottom-[30%] right-[15%] w-[15px] h-[15px] rounded-full bg-white animate-float animation-delay-500" aria-hidden="true"></div>
        
        {/* Logo Centered */}
        <div className="flex flex-col items-center justify-center animate-fadeInUp animation-delay-200">
          <div className="bg-white px-6 py-4 rounded-full shadow-lg mb-6">
            <h1 className="text-center text-[#40BFC1] text-4xl font-extrabold tracking-widest">
              <span className="inline-block animate-letterPulse">N</span>
              <span className="inline-block animate-letterPulse animation-delay-100">E</span>
              <span className="inline-block animate-letterPulse animation-delay-200">Z</span>
              <span className="inline-block animate-letterPulse animation-delay-300">T</span>
              <span className="inline-block animate-letterPulse animation-delay-400">O</span>
            </h1>
          </div>
          
          {/* Progress bar */}
          <div className="w-48 h-2 bg-white/30 rounded-full mb-4">
            <div 
              className="h-full bg-white rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-white font-medium text-lg animate-pulse">
            Premium Service
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center text-white">
          <p className="text-sm mb-1">Your trusted partner for quality laundry solutions</p>
          <p className="text-sm mb-3">Professional cleaning services at your doorstep</p>
          <div className="text-xs opacity-70">© 2023 Nezto Laundry Services</div>
        </div>
      </div>
    </div>
  );
});

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen; 