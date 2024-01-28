import React, { ReactNode } from 'react';
import '/Users/jli/Desktop/dev_playground/Dots-app/dots/styles/globals.css';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow">
      <header>
        {/* Add header content here */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
    </div>
  );
};

export default Layout;
