import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center mt-5 sticky bottom-0">
      <p>&copy; {new Date().getFullYear()} Dots</p>
    </footer>
  );
};

export default Footer;