'use client';

import React from 'react';
import { Product } from '@/types/order';

interface ProductSelectorProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ 
  product, 
  quantity, 
  onQuantityChange 
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-3">{product.name}</h2>
      {product.description && (
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <div className="text-2xl font-bold text-red-600 mb-4 sm:mb-0">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Số lượng:</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button 
              onClick={handleDecrease}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-lg disabled:opacity-50"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-6 py-2 border-x font-semibold bg-white text-lg">
              {quantity}
            </span>
            <button 
              onClick={handleIncrease}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
