import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import icAppLogo from '../images/ic_app_round.png';
import icProfilePlaceholder from '../images/ic_profile.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const themeDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/divisions', label: 'Divisions', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { path: '/employees', label: 'Employees', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  ];

  const themeOptions = [
    { 
      value: 'system', 
      label: 'System', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z" fill="currentColor"/></svg>
    },
    { 
      value: 'light', 
      label: 'Light', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12C15 13.6569 13.6569 15 12 15C10.3432 15 9.00004 13.6569 9.00004 12C9.00004 10.3432 10.3432 9.00004 12 9.00004C13.6569 9.00004 15 10.3432 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.64338 5.18899L7.56701 6.10541C7.52707 6.58478 7.50709 6.82447 7.40373 7.01167C7.31261 7.1767 7.1767 7.31261 7.01167 7.40373C6.82447 7.50709 6.58477 7.52707 6.10541 7.56701L5.18898 7.64338C4.16259 7.72892 3.6494 7.77168 3.39642 8.00615C3.17627 8.21018 3.05941 8.50232 3.07812 8.8019C3.09961 9.14615 3.44174 9.53105 4.126 10.3008L4.69153 10.9371C5.02586 11.3132 5.19302 11.5012 5.2565 11.7135C5.31243 11.9004 5.31243 12.0997 5.2565 12.2866C5.19302 12.4988 5.02586 12.6869 4.69153 13.063L4.126 13.6992C3.44174 14.469 3.09961 14.8539 3.07812 15.1982C3.05941 15.4978 3.17627 15.7899 3.39642 15.9939C3.6494 16.2284 4.16259 16.2712 5.18899 16.3567L6.10541 16.4331C6.58478 16.473 6.82446 16.493 7.01167 16.5964C7.1767 16.6875 7.31261 16.8234 7.40373 16.9884C7.50709 17.1756 7.52707 17.4153 7.56701 17.8947L7.64338 18.8111C7.72892 19.8375 7.77168 20.3507 8.00615 20.6037C8.21018 20.8238 8.50232 20.9407 8.8019 20.922C9.14615 20.9005 9.53105 20.5583 10.3008 19.8741L10.9371 19.3085C11.3132 18.9742 11.5012 18.8071 11.7135 18.7436C11.9004 18.6876 12.0997 18.6876 12.2866 18.7436C12.4988 18.8071 12.6869 18.9742 13.063 19.3085L13.6992 19.8741C14.469 20.5583 14.8539 20.9005 15.1982 20.922C15.4978 20.9407 15.7899 20.8238 15.9939 20.6037C16.2284 20.3507 16.2712 19.8375 16.3567 18.8111L16.4331 17.8947C16.473 17.4153 16.493 17.1756 16.5964 16.9884C16.6875 16.8234 16.8234 16.6875 16.9884 16.5964C17.1756 16.493 17.4153 16.473 17.8947 16.4331L18.8111 16.3567C19.8375 16.2712 20.3507 16.2284 20.6037 15.9939C20.8238 15.7899 20.9407 15.4978 20.922 15.1982C20.9005 14.8539 20.5583 14.469 19.8741 13.6992L19.3085 13.063C18.9742 12.6869 18.8071 12.4988 18.7436 12.2866C18.6876 12.0997 18.6876 11.9004 18.7436 11.7135C18.8071 11.5012 18.9742 11.3132 19.3085 10.9371L19.8741 10.3008C20.5583 9.53105 20.9005 9.14615 20.922 8.8019C20.9407 8.50232 20.8238 8.21018 20.6037 8.00615C20.3507 7.77168 19.8375 7.72892 18.8111 7.64338L17.8947 7.56701C17.4153 7.52707 17.1756 7.50709 16.9884 7.40373C16.8234 7.31261 16.6875 7.1767 16.5964 7.01167C16.493 6.82446 16.473 6.58478 16.4331 6.10541L16.3567 5.18898C16.2712 4.16259 16.2284 3.6494 15.9939 3.39642C15.7899 3.17627 15.4978 3.05941 15.1982 3.07812C14.8539 3.09961 14.469 3.44174 13.6992 4.126L13.063 4.69153C12.6869 5.02586 12.4988 5.19302 12.2866 5.2565C12.0997 5.31243 11.9004 5.31243 11.7135 5.2565C11.5012 5.19302 11.3132 5.02586 10.9371 4.69153L10.3008 4.126C9.53105 3.44174 9.14615 3.09961 8.8019 3.07812C8.50232 3.05941 8.21018 3.17627 8.00615 3.39642C7.77168 3.6494 7.72892 4.16259 7.64338 5.18899Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    { 
      value: 'dark', 
      label: 'Dark', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
  ];

  const getCurrentThemeIcon = () => {
    const current = themeOptions.find(t => t.value === theme);
    return current?.icon || themeOptions[0].icon;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={icAppLogo} alt="STAF" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                STAF
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              title="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                title="Theme"
              >
                <span>{getCurrentThemeIcon()}</span>
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 rounded-xl transition-colors duration-200 ${
                        theme === option.value
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-md overflow-hidden">
                  <img src={user?.profile_image ? `${import.meta.env.VITE_API_URL}/storage/employees/${user.profile_image}` : icProfilePlaceholder} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-none">
                    {user?.name?.split(' ')[0] || 'User'}
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 mt-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profil Saya</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 mt-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                </svg>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
