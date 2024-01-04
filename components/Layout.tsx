import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        {/* Add header content here */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default Layout;
