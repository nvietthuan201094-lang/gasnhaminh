'use client';

import React, { useState } from 'react';
import { Product } from '@/types/order';
import { ProductSelector } from '@/components/ProductSelector';
import { CheckoutForm } from '@/components/CheckoutForm';

interface ClientCheckoutWrapperProps {
  product: Product;
}

export default function ClientCheckoutWrapper({ product }: ClientCheckoutWrapperProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-5/12">
        <ProductSelector 
          product={product} 
          quantity={quantity} 
          onQuantityChange={setQuantity} 
        />
        
        {/* Additional trust signals could go here */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-sm font-medium text-blue-900">Giao nhanh 30 phút</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-sm font-medium text-green-900">100% Chính hãng</span>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-7/12">
        <CheckoutForm product={product} quantity={quantity} />
      </div>
    </div>
  );
}
