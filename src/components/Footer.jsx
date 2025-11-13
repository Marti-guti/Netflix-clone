export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Domande frequenti</a>
          <a href="#" className="hover:text-white transition-colors">Centro assistenza</a>
          <a href="#" className="hover:text-white transition-colors">Account</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Cookie</a>
        </div>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} NetClone, Inc.</p>
      </div>
    </footer>
  );
}
