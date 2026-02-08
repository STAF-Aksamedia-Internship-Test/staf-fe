import StatusBadge from './StatusBadge';

export default function SystemStatus({ health, onRefresh }) {
  const formatTime = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 16C13.66 16 15 14.66 15 13C15 11.34 13.66 10 12 10C10.34 10 9 11.34 9 13C9 14.66 10.34 16 12 16Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status Sistem</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Koneksi backend & database</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Terakhir diperbarui: {formatTime(health.lastChecked)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusBadge status={health.backend} label="Backend API" />
        
        <StatusBadge status={health.database} label="Database" />
        
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {health.responseTime > 0 ? `${health.responseTime}ms` : '-'}
          </span>
          <span className="text-xs text-gray-500">Response</span>
        </div>
        
        <button
          onClick={onRefresh}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V9H9M20 20V15H15M20 4L16 8M4 20L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Perbarui</span>
        </button>
      </div>
    </div>
  );
}
