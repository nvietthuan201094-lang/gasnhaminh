'use client';

import React, { useState, useEffect } from 'react';
import { createOrder, trackInteractionApi } from '@/lib/api';
import { trackGoogleAdsPurchase } from '@/lib/tracking';
import { HOTLINE_DISPLAY, HOTLINE_TEL, ZALO_URL } from '@/lib/districts';
import { Product } from '@/types/order';

interface CheckoutFormProps {
  product: Product;
  quantity: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ product, quantity }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);

  const [formData, setFormData] = useState({
    customerPhone: '',
    customerName: '',
    customerAddress: '',
    note: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedPhone = localStorage.getItem('gas_customer_phone') || '';
        const savedName = localStorage.getItem('gas_customer_name') || '';
        if (savedPhone || savedName) {
          setFormData((prev) => ({ ...prev, customerPhone: savedPhone, customerName: savedName }));
        }
      } catch (_) {}
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = formData.customerPhone.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 11) {
      setErrorMessage('Vui lòng nhập số điện thoại hợp lệ (9–11 số) để Gas Nhà Mình gọi xác nhận trong 30 giây.');
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await createOrder({
        customerPhone: formData.customerPhone.trim(),
        customerName: formData.customerName.trim() || 'Gia đình đặt nhanh 1 chạm',
        customerAddress: formData.customerAddress.trim() || 'Xác nhận địa chỉ căn hộ/nhà phố qua SĐT trong 30 giây',
        note: formData.note.trim() || 'Đặt nhanh 1 chạm (Kèm gói cân điện tử & vệ sinh họng bếp 0đ)',
        productId: product.id,
        slug: product.slug,
        quantity,
      });

      if (response.success) {
        setSuccessMessage(
          `Đã tiếp nhận! Mã đơn: ${response.orderName || response.orderId}. Nhân viên chăm sóc bếp đang gọi lại cho gia đình trong 30 giây!`
        );

        trackGoogleAdsPurchase({
          transactionId: response.orderId || String(Date.now()),
          value: (product.price || 0) * quantity,
          currency: 'VND',
          items: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity,
            },
          ],
        });

        setFormData((prev) => ({ ...prev, customerAddress: '', note: '' }));
      } else {
        setErrorMessage(response.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng bấm gọi 0888 113 831.');
      }
    } catch {
      setErrorMessage('Không thể kết nối máy chủ. Vui lòng bấm gọi 0888 113 831 để giao ngay 15 phút.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-red-200 rounded-2xl shadow-md bg-white">
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
        <h3 className="text-lg sm:text-xl font-black text-slate-900">Đặt 1 Chạm — Gọi Xác Nhận Trong 30 Giây</h3>
        <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
          🛡️ Chuẩn PCCC
        </span>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
        <strong>🔄 Đang dùng vỏ Saigon Petro, Petrolimex, Gia Đình...?</strong> Đổi ngang miễn phí <strong>0đ</strong> — Không thu cọc vỏ! Tặng kèm vệ sinh họng bếp &amp; đo máy dò khí gas.
      </div>

      {successMessage && (
        <div className="mb-5 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl">
          <p className="font-bold text-sm">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl">
          <p className="font-semibold text-xs sm:text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Chỉ cần nhập Số Điện Thoại gia đình nhận gas *
          </label>
          <input
            type="tel"
            name="customerPhone"
            inputMode="tel"
            required
            value={formData.customerPhone}
            onChange={handleChange}
            className="w-full border-2 border-red-300 focus:border-[#DC2626] p-3.5 rounded-xl text-base font-bold text-slate-900 outline-none transition-colors"
            placeholder="Nhập SĐT nhận gas (VD: 0909 123 456)"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowOptionalDetails((v) => !v)}
          className="text-xs font-bold text-[#DC2626] hover:underline cursor-pointer"
        >
          {showOptionalDetails
            ? '− Ẩn bớt thông tin phụ'
            : '+ Nhập sẵn tên chung cư / địa chỉ / dặn dò cho thợ (Không bắt buộc)'}
        </button>

        {showOptionalDetails && (
          <div className="space-y-3 pt-1 border-t border-slate-100">
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border border-slate-300 p-3 rounded-xl text-sm outline-none focus:border-[#DC2626]"
              placeholder="Tên người nhận (Tùy chọn)"
            />
            <input
              type="text"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              className="w-full border border-slate-300 p-3 rounded-xl text-sm outline-none focus:border-[#DC2626]"
              placeholder="Tên chung cư / Số nhà, đường, phường (Tùy chọn)"
            />
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full border border-slate-300 p-3 rounded-xl text-sm outline-none focus:border-[#DC2626]"
              placeholder="Dặn thợ (VD: Vào hầm sảnh B, nhà có ông bà lớn tuổi...)"
            />
          </div>
        )}

        <div className="pt-3 border-t border-slate-100">
          <div className="flex justify-between items-center font-bold mb-4">
            <span className="text-sm text-slate-600">Giá đổi ruột trọn gói:</span>
            <span className="text-[#DC2626] text-2xl font-black">
              {new Intl.NumberFormat('vi-VN').format(product.price * quantity)}đ
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-black py-4 rounded-xl text-base uppercase tracking-wide transition-all shadow-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? 'Đang kết nối chi nhánh gần nhất...' : '⚡ GỌI LẠI TRONG 30 GIÂY — GIAO TẬN BẾP'}
          </button>

          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackInteractionApi('click_zalo', {
                  phone: HOTLINE_DISPLAY,
                  customerPhone: formData.customerPhone,
                  notes: `Khách bấm Gửi Định Vị Zalo từ trang ${product.name}`,
                })
              }
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#DC2626] font-bold text-xs text-center"
            >
              📍 Gửi Định Vị Zalo
            </a>
            <a
              href={HOTLINE_TEL}
              onClick={() =>
                trackInteractionApi('click_call', {
                  phone: HOTLINE_DISPLAY,
                  customerPhone: formData.customerPhone,
                  notes: `Khách bấm Gọi thẳng từ trang ${product.name}`,
                })
              }
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center"
            >
              📞 Gọi {HOTLINE_DISPLAY}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
