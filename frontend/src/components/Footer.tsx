import { Package, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-zinc-400" />
              <span className="text-2xl font-bold text-white">CoreBuild</span>
            </div>
            <p className="text-zinc-400 text-sm">
              Your trusted partner for premium computer hardware. Building the future, one component at a time.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Products</h3>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">CPUs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Graphics Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Motherboards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Memory & Storage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Power Supplies</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Build Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compatibility Check</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-3 text-zinc-400 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-COREBUILD</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@corebuild.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Tech Valley, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-400 text-sm">
          <p>&copy; 2025 CoreBuild. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};