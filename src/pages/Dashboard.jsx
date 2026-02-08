import { useState, useEffect, useCallback } from 'react';
import api from '../api';
import WelcomeCard from '../components/WelcomeCard';
import StatCard from '../components/StatCard';
import SystemStatus from '../components/SystemStatus';
import QuickActionCard from '../components/QuickActionCard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    divisions: 0,
    employees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState({
    backend: 'checking',
    database: 'checking',
    responseTime: 0,
    lastChecked: null,
  });

  useEffect(() => {
    fetchStats();
    checkHealth();
    
    const healthInterval = setInterval(checkHealth, 30000);
    return () => clearInterval(healthInterval);
  }, []);

  const checkHealth = useCallback(async () => {
    const result = await api.healthCheck();
    setHealth({
      backend: result.backend,
      database: result.database,
      responseTime: result.responseTime,
      lastChecked: new Date().toISOString(),
    });
  }, []);

  const fetchStats = async () => {
    try {
      const [divisionsRes, employeesRes] = await Promise.all([
        api.getDivisions({ per_page: 1 }),
        api.getEmployees({ per_page: 1 }),
      ]);

      setStats({
        divisions: divisionsRes.data?.meta?.total || divisionsRes.data?.divisions?.length || 0,
        employees: employeesRes.data?.meta?.total || employeesRes.data?.employees?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Tambah Divisi',
      description: 'Buat divisi baru untuk organisasi Anda',
      link: '/divisions',
      icon: {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        color: 'text-blue-600 dark:text-blue-400',
        accentColor: 'text-blue-600 dark:text-blue-400',
        accentHover: 'text-blue-700 dark:text-blue-300',
        actionText: 'Lihat Divisi',
        svg: '<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
      },
    },
    {
      title: 'Tambah Karyawan',
      description: 'Daftarkan karyawan baru ke sistem',
      link: '/employees',
      icon: {
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
        color: 'text-emerald-600 dark:text-emerald-400',
        accentColor: 'text-emerald-600 dark:text-emerald-400',
        accentHover: 'text-emerald-700 dark:text-emerald-300',
        actionText: 'Lihat Karyawan',
        svg: '<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M17 21V19M17 21H7M17 21H21M7 21V19C7 17.9391 7.42143 16.9217 8.17157 16.1716C8.92172 15.4214 9.93913 15 11 15H12M7 21H4M12 15V9M12 9H15M12 9V5M12 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
      },
    },
    {
      title: 'Profil Saya',
      description: 'Kelola informasi profil Anda',
      link: '/profile',
      icon: {
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        color: 'text-purple-600 dark:text-purple-400',
        accentColor: 'text-purple-600 dark:text-purple-400',
        accentHover: 'text-purple-700 dark:text-purple-300',
        actionText: 'Lihat Profil',
        svg: '<path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12V21M12 12C14 12 15 12 15 14M12 12C10 12 9 12 9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
      },
    },
  ];

  return (
    <div className="space-y-8">
      <WelcomeCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Divisi"
          value={stats.divisions}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          link="/divisions"
          index={0}
          loading={loading}
        />
        <StatCard
          title="Total Karyawan"
          value={stats.employees}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          link="/employees"
          index={1}
          loading={loading}
        />
      </div>

      <SystemStatus health={health} onRefresh={checkHealth} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
}
