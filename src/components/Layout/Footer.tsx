import React from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Scale,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold text-white">GazaWitness</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Documenting the human cost of war in Gaza. Collecting evidence,
              preserving testimonies, and advocating for justice and
              accountability for civilian victims.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/evidence"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Evidence Archive
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonies"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Testimonies
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/children"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Children
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/medical"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Medical Evidence
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/infrastructure"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Infrastructure Damage
                </Link>
              </li>
              <li>
                <Link
                  to="/legal-resources"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Legal Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contributors"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Contributors
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Evidence Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/verification"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Verification Process
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Updates & Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/forum"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Discussion Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Press Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Legal Framework
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © 2025 GazaWitness. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/licenses"
                className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
              >
                License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
