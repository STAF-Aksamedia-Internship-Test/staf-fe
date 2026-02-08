export default function WelcomeCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang di STAF</h1>
        <p className="text-white/80 max-w-2xl">
          Systematic Talent & Administration Framework. Kelola data divisi dan karyawan dengan mudah dan efisien.
        </p>
      </div>
    </div>
  );
}
