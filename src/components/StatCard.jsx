import { Link } from 'react-router-dom';

export default function StatCard({ title, value, gradient, link, index, loading = false }) {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className={`absolute inset-0 ${gradient} opacity-90`} />
      
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white/10" />
      
      <div className="relative flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 pt-1">
            <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
            <p className="text-4xl font-bold text-white">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                value.toLocaleString()
              )}
            </p>
          </div>
          <div className="relative -mb-8 mt-auto">
            {index === 0 ? (
              <svg className="w-28 h-28 text-white/30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 20H4M4 20H14M4 20V6.2002C4 5.08009 4 4.51962 4.21799 4.0918C4.40973 3.71547 4.71547 3.40973 5.0918 3.21799C5.51962 3 6.08009 3 7.2002 3H10.8002C11.9203 3 12.4796 3 12.9074 3.21799C13.2837 3.40973 13.5905 3.71547 13.7822 4.0918C14 4.5192 14 5.07899 14 6.19691V12M14 20H20M14 20V12M20 20H22M20 20V12C20 11.0681 19.9999 10.6024 19.8477 10.2349C19.6447 9.74481 19.2557 9.35523 18.7656 9.15224C18.3981 9 17.9316 9 16.9997 9C16.0679 9 15.6019 9 15.2344 9.15224C14.7443 9.35523 14.3552 9.74481 14.1522 10.2349C14 10.6024 14 11.0681 14 12M7 10H11M7 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="w-28 h-28 text-white/30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-4 right-6">
          <svg className="w-12 h-12 text-white transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 16L15 12M15 12L11 8M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
