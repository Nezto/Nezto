import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { Mail, Lock, Eye, EyeOff, Phone, ArrowRight, Facebook, ChevronLeft } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    otp: ['', '', '', '']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    
    setFormData(prev => ({
      ...prev,
      otp: newOtp
    }));
    
    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === 'phone' && !otpSent) {
        setOtpSent(true);
        setIsLoading(false);
        return;
      }
      
      // Call the onLogin prop to update authentication state
      onLogin();
      
      // Navigate to home on successful auth
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    onLogin()
    window.open(`${API_URL}/auth/login`, '_self');
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      // Simulate Facebook auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Facebook sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    setOtpSent(false);
  };

  const renderSignInForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Your email"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="pl-10 pr-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Your password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </div>
      
      <button
        type="submit"
        className={`w-full py-3 rounded-lg flex items-center justify-center font-medium text-white ${
          isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'
        } transition-colors shadow-md`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );

  const renderSignUpForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          placeholder="Your full name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Your email"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="pl-10 pr-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Password must be at least 8 characters long with a number and a special character.
        </p>
      </div>
      
      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <button
            type="button"
            onClick={() => navigate('/terms')}
            className="text-primary hover:underline"
          >
            Terms & Conditions
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => navigate('/privacy')}
            className="text-primary hover:underline"
          >
            Privacy Policy
          </button>
        </label>
      </div>
      
      <button
        type="submit"
        className={`w-full py-3 rounded-lg flex items-center justify-center font-medium text-white ${
          isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'
        } transition-colors shadow-md`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Creating Account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );

  const renderPhoneForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!otpSent ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Your phone number"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              We'll send you a verification code via SMS
            </p>
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 rounded-lg flex items-center justify-center font-medium text-white ${
              isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'
            } transition-colors shadow-md`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending OTP...
              </>
            ) : (
              <>
                Send OTP
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <div>
            <div className="flex items-center mb-4">
              <button 
                type="button" 
                onClick={() => setOtpSent(false)}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <p className="text-sm text-gray-600">
                Enter the 4-digit code sent to <span className="font-medium">{formData.phone}</span>
              </p>
            </div>
            
            <div className="flex justify-center space-x-3 mb-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={formData.otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              ))}
            </div>
            
            <div className="text-center mb-4">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    otp: ['', '', '', '']
                  }));
                  setOtpSent(false);
                }}
              >
                Didn't receive code? Resend
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 rounded-lg flex items-center justify-center font-medium text-white ${
              isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'
            } transition-colors shadow-md`}
            disabled={isLoading || formData.otp.some(digit => !digit)}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Logo */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <img 
            src="/img/logo/logo-header.png" 
            alt="Nezto" 
            className="h-10"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/120x40?text=Nezto';
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            {authMode === 'signin' ? 'Sign in to your account' : 
             authMode === 'signup' ? 'Create a new account' : 
             'Sign in with phone'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {authMode === 'signin' ? 'Access your Nezto account' : 
             authMode === 'signup' ? 'Join Nezto for seamless services' : 
             'Quick access with your phone number'}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Auth Form */}
            {authMode === 'signin' && renderSignInForm()}
            {authMode === 'signup' && renderSignUpForm()}
            {authMode === 'phone' && renderPhoneForm()}
            
            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
                  <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
                  <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button
                type="button"
                onClick={handleFacebookSignIn}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                Facebook
              </button>
            </div>

            {/* Phone Sign In Option */}
            {authMode !== 'phone' && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => switchMode('phone')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  Continue with Phone
                </button>
              </div>
            )}

            {/* Switch Auth Mode */}
            <div className="mt-6 text-center">
              {authMode === 'signin' ? (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Sign up
                  </button>
                </p>
              ) : authMode === 'signup' ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Prefer email login?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Sign in with email
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Nezto. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <button
              type="button"
              onClick={() => navigate('/terms')}
              className="text-gray-500 hover:text-gray-700"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => navigate('/privacy')}
              className="text-gray-500 hover:text-gray-700"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact-support')}
              className="text-gray-500 hover:text-gray-700"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
