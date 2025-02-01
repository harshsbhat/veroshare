export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 border-gray-800">
        <div className="max-w-[690px] mx-auto flex justify-between items-center py-4 px-4">
          <span className="text-3xl font-serif bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
            VeroShare
          </span>
          <div className="text-gray-400 text-base">
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>
    );
  }
  