
import React from 'react';
import Link from 'next/link';
import { Shield, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-medsure-primary text-white pt-12 pb-6">
      <div className="medsure-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Shield className="h-8 w-8 text-white" />
                <Heart className="h-4 w-4 text-medsure-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xl font-bold">Medsure</span>
            </div>
            <p className="text-gray-200 text-sm mb-4">
              AI-powered medical insurance cost prediction system that helps users estimate their premiums and discover suitable government schemes.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/predict" className="text-gray-200 hover:text-white transition-colors">Predict Cost</Link>
              </li>
              <li>
                <Link href="/schemes" className="text-gray-200 hover:text-white transition-colors">Find Schemes</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-200 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-200 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-200 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-200 hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-200 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-medsure-secondary" />
                <span className="text-gray-200">contact@medsure.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-medsure-secondary" />
                <span className="text-gray-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-medsure-secondary shrink-0 mt-1" />
                <span className="text-gray-200">123 Healthcare Ave, Medical District, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Medsure. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
