import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black p-4 text-center mt-5 sticky bottom-0">
      <p className="text-white">&copy; {new Date().getFullYear()} HitDots Inc. All rights reserved. 
      <span className="text-white-500 mx-2">•</span>
      <Link href="/settings" className="text-white-500" >Privacy Policy</Link> 
      <span className="text-white-500 mx-2">•</span>
      <Link href="/settings" className="text-white-500" >Terms of Use</Link>  
      <span className="text-white-500 mx-2">•</span>
      <Link href="/settings" className="text-white-500" >FAQ</Link>  
      </p>
    </footer>
  );
};

export default Footer;