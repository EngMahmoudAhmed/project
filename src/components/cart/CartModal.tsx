import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { Button } from '../ui/Button';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {state.items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            state.items.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <Button onClick={onClose}>
            Checkout (${state.total.toFixed(2)})
          </Button>
        </div>
      </div>
    </div>
  );
}