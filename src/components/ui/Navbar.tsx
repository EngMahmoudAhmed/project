import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { CartModal } from '../cart/CartModal';
import { ProfileModal } from '../profile/ProfileModal';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { state } = useCart();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">E-Shop</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-600 hover:text-indigo-600 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-indigo-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="p-2 text-gray-600 hover:text-indigo-600"
                >
                  <User className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({itemCount})
              </button>
              <button 
                onClick={() => {
                  setIsProfileOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}