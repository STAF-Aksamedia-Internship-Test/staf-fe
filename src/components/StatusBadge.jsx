const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return { bg: 'bg-green-500', text: 'text-green-500', bgLight: 'bg-green-50', border: 'border-green-200' };
    case 'offline':
      return { bg: 'bg-red-500', text: 'text-red-500', bgLight: 'bg-red-50', border: 'border-red-200' };
    case 'checking':
      return { bg: 'bg-yellow-500', text: 'text-yellow-500', bgLight: 'bg-yellow-50', border: 'border-yellow-200' };
    default:
      return { bg: 'bg-gray-500', text: 'text-gray-500', bgLight: 'bg-gray-50', border: 'border-gray-200' };
  }
};

export default function StatusBadge({ status, label }) {
  const colors = getStatusColor(status);
  
  return (
    <div className={`flex items-center gap-2 px-3 py-2 ${colors.bgLight} ${colors.border} border rounded-lg`}>
      <span className={`relative flex h-2.5 w-2.5`}>
        {status === 'checking' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.bg} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colors.bg}`}></span>
      </span>
      <span className={`text-sm font-medium ${colors.text}`}>
        {status === 'checking' ? 'Memeriksa...' : status === 'online' ? 'Aktif' : 'Tidak Aktif'}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
