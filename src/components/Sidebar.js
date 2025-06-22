import React from 'react';
import { FiHome, FiUser, FiBriefcase, FiCode, FiMessageSquare, FiMail } from 'react-icons/fi';

const navItems = [
  { name: 'Home', icon: <FiHome />, href: '#' },
  { name: 'About', icon: <FiUser />, href: '#' },
  { name: 'Projects', icon: <FiBriefcase />, href: '#' },
  { name: 'Skills', icon: <FiCode />, href: '#' },
  { name: 'Blog', icon: <FiMessageSquare />, href: '#' },
  { name: 'Contact', icon: <FiMail />, href: '#' },
];

const Sidebar = () => {
  return (
    <aside className="w-60 bg-[#1e1e1e] text-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Explorer</h2>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-150"
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700 text-xs text-center">
        <p>&copy; {new Date().getFullYear()} Your Name</p>
      </div>
    </aside>
  );
};

export default Sidebar;
