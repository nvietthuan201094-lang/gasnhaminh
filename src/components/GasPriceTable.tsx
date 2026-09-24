'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SEO_PRODUCTS, SeoProductItem, HOTLINE_DISPLAY, HOTLINE_TEL, ZALO_URL } from '@/lib/districts';
import { fetchDynamicGasPrices } from '@/lib/api';

interface GasPriceTableProps {
  onSelectProduct?: (productSlug: string, isExchange: boolean) => void;
  brandName?: string;
  showDetailLink?: boolean;
  initialProducts?: SeoProductItem[];
}

export default function GasPriceTable({
  onSelectProduct,
  brandName = 'Gas Nhà Mình',
  showDetailLink = true,
  initialProducts,
}: GasPriceTableProps) {
  const [products, setProducts] = useState<SeoProductItem[]>(initialProducts || SEO_PRODUCTS);
  const [filterCategory, setFilterCategory] = useState<'all' | '12kg' | '45kg'>('all');
  const [isLoading, setIsLoading] = useState(!initialProducts);

  useEffect(() => {
    // Tự động lấy động bảng giá từ Backend CRM Gas Nhà Mình
    fetchDynamicGasPrices()
      .then((dynamicData) => {
        if (dynamicData && dynamicData.length > 0) {
          setProducts(dynamicData);
        }
      })
      .catch((err) => {
        console.error('Không thể tải bảng giá từ CRM:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filterCategory === '12kg') return p.weight === '12kg';
    if (filterCategory === '45kg') return p.weight === '45kg';
    return true;
  });

  const currentDateStr = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const handleOrder = (slug: string, isExchange: boolean) => {
    if (onSelectProduct) {
      onSelectProduct(slug, isExchange);
    } else {
      const formEl = document.getElementById('dat-hang') || document.getElementById('order-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `tel:0888113831`;
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header Bảng Giá */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs md:text-sm font-bold mb-3 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span>CẬP NHẬT HÔM NAY: {currentDateStr} • ÁP DỤNG BẢNG GIÁ CHÍNH HÃNG</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          Bảng Giá Gas Hôm Nay Mới Nhất 2026
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Báo giá đổi bình gas 12kg gia đình và gas bò 45kg nhà hàng. Đầy đủ tem niêm phong chống giả, cân gas tại chỗ, hỗ trợ giao siêu tốc 15 phút tại 21 quận huyện TP.HCM.
        </p>

        {/* Bộ lọc nhanh danh mục */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${
              filterCategory === 'all'
                ? 'bg-[#FF5722] text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
            }`}
          >
            Tất cả bình gas ({SEO_PRODUCTS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('12kg')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${
              filterCategory === '12kg'
                ? 'bg-[#FF5722] text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
            }`}
          >
            Bình 12kg gia đình
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('45kg')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${
              filterCategory === '45kg'
                ? 'bg-[#FF5722] text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
            }`}
          >
            Bình bò 45kg công nghiệp
          </button>
        </div>
      </div>

      {/* Bảng Dữ Liệu Desktop / Tablet */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600 font-bold">
                <th className="py-4 px-4 w-16 text-center">STT</th>
                <th className="py-4 px-4">Loại Bình Gas & Thương Hiệu</th>
                <th className="py-4 px-4">Quy Cách & Loại Van</th>
                <th className="py-4 px-4 text-right">
                  <span className="text-[#FF5722]">Giá Đổi Gas (Ruột)</span>
                  <span className="block text-[10px] text-gray-400 font-normal">Đã có sẵn vỏ bình</span>
                </th>
                <th className="py-4 px-4 text-right">
                  <span className="text-gray-900">Mua Mới Trọn Bộ</span>
                  <span className="block text-[10px] text-gray-400 font-normal">Ruột + Cọc vỏ bình</span>
                </th>
                <th className="py-4 px-4 text-center">Cam Kết Chất Lượng</th>
                <th className="py-4 px-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((p, idx) => (
                <tr key={p.id} className="hover:bg-orange-50/40 transition-colors group">
                  <td className="py-3.5 px-4 text-center text-gray-400 font-medium">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-[#FF5722] transition-colors">
                          {p.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {p.brand}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            {p.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-xs font-medium text-gray-700">{p.valveType}</div>
                    <div className="text-[11px] text-gray-400 font-mono mt-0.5">Ruột: {p.weight} chuẩn</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="text-lg font-black text-[#FF5722]">{p.price}</div>
                    <div className="text-[10px] text-emerald-600 font-medium">✓ Đã có VAT & Ship</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="text-base font-bold text-gray-800">{p.newPrice}</div>
                    <div className="text-[10px] text-gray-400 font-normal">
                      Cọc: {p.weight === '45kg' ? '1.000.000đ' : '250.000đ'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      ✓ Đủ ký • Tem chống giả
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOrder(p.slug, true)}
                        className="bg-[#FF5722] hover:bg-[#E64A19] active:scale-95 text-white font-bold text-xs px-3 py-2 rounded-lg transition-all shadow-sm shadow-orange-500/20 whitespace-nowrap"
                      >
                        Đổi gas 15P
                      </button>
                      <a
                        href={HOTLINE_TEL}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
                        title={`Gọi hotline giao gas ${p.name}`}
                      >
                        📞
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Giao Diện Thẻ Mobile */}
      <div className="grid grid-cols-1 gap-3 md:hidden mb-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between"
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-white bg-[#FF5722] px-2 py-0.5 rounded-full">
                    {p.brand}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {p.weight}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                  {p.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                  {p.valveType}
                </p>
              </div>
            </div>

            {/* Khung Giá 2 Cột */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 bg-gray-50/70 p-2 rounded-lg">
              <div>
                <span className="text-[10px] text-gray-500 block font-semibold">
                  Giá Đổi Ruột:
                </span>
                <span className="text-base font-black text-[#FF5722]">
                  {p.price}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block font-semibold">
                  Mua Bình Mới:
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {p.newPrice}
                </span>
              </div>
            </div>

            {/* Nút Hành Động 1 Chạm */}
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => handleOrder(p.slug, true)}
                className="flex-1 bg-[#FF5722] active:bg-[#E64A19] text-white font-bold text-xs py-2.5 rounded-lg shadow-sm text-center"
              >
                Đổi gas 15 phút
              </button>
              <a
                href={HOTLINE_TEL}
                className="bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs px-3 py-2.5 rounded-lg flex items-center justify-center gap-1"
              >
                📞 Gọi
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Thông tin lưu ý và Link chi tiết */}
      <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs md:text-sm text-gray-700 space-y-1">
          <p className="font-bold text-orange-900 flex items-center gap-1.5">
            <span>🛡️</span> Chính sách giá gas chính hãng {brandName}:
          </p>
          <p>
            • Giá đổi gas đã bao gồm VAT, chi phí giao tận nhà, công lắp đặt và kiểm tra rò rỉ an toàn miễn phí.
          </p>
          <p>
            • Đổi ngang miễn phí giữa tất cả các loại vỏ bình gas 12kg hợp chuẩn trên thị trường.
          </p>
        </div>

        {showDetailLink && (
          <Link
            href="/bang-gia"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-white bg-[#FF5722] hover:bg-[#E64A19] px-5 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap"
          >
            <span>Xem trang Bảng Giá Chi Tiết</span>
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
