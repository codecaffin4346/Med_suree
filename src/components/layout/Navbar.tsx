"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, Shield, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="medsure-container py-3">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-medsure-primary" />
              <Heart className="h-4 w-4 text-medsure-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xl font-bold text-medsure-primary">Medsure</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-medsure-primary transition-colors">Home</Link>
            <Link href="/predict" className="text-gray-700 hover:text-medsure-primary transition-colors">Predict Cost</Link>
            <Link href="/schemes" className="text-gray-700 hover:text-medsure-primary transition-colors">Find Schemes</Link>
            <Link href="/about" className="text-gray-700 hover:text-medsure-primary transition-colors">About</Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/predict">
              <Button className="btn-primary">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-16 px-4 md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link 
            href="/predict" 
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Shield size={20} />
            <span>Predict Insurance Cost</span>
          </Link>
          <Link 
            href="/schemes" 
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Heart size={20} />
            <span>Find Government Schemes</span>
          </Link>
          <Link 
            href="/about" 
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <span>About</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <User size={20} />
            <span>Dashboard</span>
          </Link>
          
          <div className="mt-4">
            <Button className="btn-primary w-full" onClick={() => setIsOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
