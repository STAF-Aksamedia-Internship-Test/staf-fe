import { Link } from 'react-router-dom';

export default function QuickActionCard({ title, description, link, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 ${icon.bgColor} rounded-xl`}>
          <svg 
            className={`w-6 h-6 ${icon.color}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
      <Link 
        to={link} 
        className={`inline-flex items-center ${icon.accentColor} hover:${icon.accentHover} font-medium transition-colors`}
      >
        {icon.actionText}
        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12M15 12L9 6M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );
}
