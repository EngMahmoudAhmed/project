import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';

interface CartItemProps {
  item: Product & { quantity: number };
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  return (
    <div className="flex items-center py-4 border-b">
      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
      
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        
        <div className="flex items-center mt-2">
          <button
            onClick={() => dispatch({
              type: 'UPDATE_QUANTITY',
              payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
            })}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="mx-2 min-w-[2rem] text-center">{item.quantity}</span>
          
          <button
            onClick={() => dispatch({
              type: 'UPDATE_QUANTITY',
              payload: { id: item.id, quantity: item.quantity + 1 }
            })}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <Plus className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
            className="ml-4 p-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}