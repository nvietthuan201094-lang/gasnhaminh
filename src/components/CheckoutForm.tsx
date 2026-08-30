'use client';

import React, { useState } from 'react';
import { createOrder } from '@/lib/api';
import { Product } from '@/types/order';

interface CheckoutFormProps {
  product: Product;
  quantity: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ product, quantity }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    note: '',
    referralCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await createOrder({
        ...formData,
        productId: product.id,
        slug: product.slug,
        quantity,
      });

      if (response.success) {
        setSuccessMessage(`Đặt hàng thành công! Mã đơn: ${response.orderId}`);
        setFormData({ customerName: '', customerPhone: '', customerAddress: '', note: '', referralCode: '' });
      } else {
        setErrorMessage(response.message || 'Có lỗi xảy ra khi đặt hàng.');
      }
    } catch (error) {
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h3 className="text-xl font-bold mb-6 pb-2 border-b">Thông tin giao hàng</h3>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg shadow-sm">
          <p className="font-medium">{successMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg shadow-sm">
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Họ và tên *</label>
          <input 
            type="text" 
            name="customerName"
            required 
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
            placeholder="Nhập họ và tên"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số điện thoại *</label>
          <input 
            type="tel" 
            name="customerPhone"
            required 
            value={formData.customerPhone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
            placeholder="Nhập số điện thoại liên hệ"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Địa chỉ giao hàng *</label>
          <input 
            type="text" 
            name="customerAddress"
            required 
            value={formData.customerAddress}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
            placeholder="Số nhà, đường, phường/xã, quận/huyện..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ghi chú (Tùy chọn)</label>
          <textarea 
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none" 
            rows={3}
            placeholder="Yêu cầu thêm về giờ giao, vị trí..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mã người giới thiệu (Tùy chọn)</label>
          <input 
            type="text" 
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
            placeholder="Nhập mã giới thiệu (nếu có)"
          />
        </div>
        
        <div className="pt-6 mt-6 border-t border-gray-100">
          <div className="flex justify-between items-center font-bold text-xl mb-6">
            <span className="text-gray-800">Tổng thanh toán:</span>
            <span className="text-red-600 text-2xl">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price * quantity)}
            </span>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full font-bold py-4 rounded-xl text-lg transition-all shadow-md
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : 'Xác nhận đặt hàng'}
          </button>
        </div>
      </form>
    </div>
  );
};
