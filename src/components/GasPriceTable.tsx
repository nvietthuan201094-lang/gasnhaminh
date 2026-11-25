'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SEO_PRODUCTS, SeoProductItem, HOTLINE_DISPLAY, HOTLINE_TEL, ZALO_URL } from '@/lib/districts';
import { fetchDynamicGasPrices, trackInteractionApi } from '@/lib/api';

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
  const [filterCategory, setFilterCategory] = useState<'primary' | 'all' | '45kg'>('primary');

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      return;
    }
    fetchDynamicGasPrices()
      .then((dynamicData) => {
        if (dynamicData && dynamicData.length > 0) {
          setProducts(dynamicData);
        }
      })
      .catch((err) => {
        console.error('Không thể tải bảng giá:', err);
      });
  }, [initialProducts]);

  const filteredProducts = products.filter((p) => {
    if (filterCategory === 'primary') return p.isPrimaryDisplay !== false;
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
        window.location.href = `/${slug}`;
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header Bảng Giá */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs md:text-sm font-bold mb-3 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span>NIÊM YẾT HÔM NAY ({currentDateStr}) • TẶNG GÓI BẢO DƯỠNG BẾP &amp; ĐO RÒ RỈ 0Đ</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Bảng Giá Đổi Bình Gas Gia Đình &amp; Chung Cư Hôm Nay
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          Gom gọn 2 dòng V-Gas an toàn chuẩn PCCC giúp người nội trợ chọn trong 5 giây (tiết kiệm <strong>65.000đ/bình</strong> so với Petrolimex). Thợ mang <strong>cân móc điện tử 50kg</strong> cân đủ ký và đo máy dò khí gas tại bếp mới thu tiền.
        </p>

        {/* Bộ lọc nhanh danh mục */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <button
            type="button"
            onClick={() => setFilterCategory('primary')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === 'primary'
                ? 'bg-[#DC2626] text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300'
            }`}
          >
            🏠 6 Lựa chọn chuẩn bếp gia đình
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#DC2626] text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300'
            }`}
          >
            Xem đủ {products.length} màu vỏ (Có vỏ bọc nhựa PE êm sàn)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('45kg')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === '45kg'
                ? 'bg-[#DC2626] text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300'
            }`}
          >
            Bình bò 45kg nhà hàng
          </button>
        </div>
      </div>

      {/* Dải Nhãn Xanh "Đổi Ngang Vỏ 0đ" & "Không Sợ Nhầm Loại Van" */}
      <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-emerald-50 border-2 border-emerald-300/80 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-xl leading-none mt-0.5">🔄</span>
          <div className="text-xs md:text-sm text-emerald-950 leading-snug">
            <strong className="font-black text-emerald-800 uppercase">Đổi ngang vỏ miễn phí 0đ:</strong> Bếp nhà mình đang dùng vỏ{" "}
            <strong>Saigon Petro, Petrolimex, Gia Đình, Total...</strong> đều đổi ngang sang V-Gas 530.000đ —{" "}
            <span className="underline font-bold">KHÔNG thu cọc vỏ 250.000đ!</span>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-xl leading-none mt-0.5">🔧</span>
          <div className="text-xs md:text-sm text-amber-950 leading-snug">
            <strong className="font-black text-amber-900">Không rành loại van bếp ở nhà?</strong> Ông bà hoặc chị em cứ yên tâm đặt — thợ Gas Nhà Mình mang sẵn cả 2 chuẩn van tới lắp vừa khít 100%.
          </div>
        </div>
      </div>

      {/* Bảng Dữ Liệu Desktop / Tablet */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-600 font-bold">
                <th className="py-4 px-4">Loại Bình Gas &amp; Thương Hiệu</th>
                <th className="py-4 px-4">Quy Cách Van An Toàn</th>
                <th className="py-4 px-4 text-right">
                  <span className="text-[#DC2626]">Giá Đổi Ruột Gia Đình</span>
                  <span className="block text-[10px] text-emerald-700 font-semibold">Đổi ngang mọi vỏ hãng khác 0đ</span>
                </th>
                <th className="py-4 px-4 text-right">
                  <span className="text-slate-700">Chưa Có Vỏ Bình</span>
                  <span className="block text-[10px] text-slate-400 font-normal">Chỉ khi lắp bếp mới lần đầu</span>
                </th>
                <th className="py-4 px-4 text-center">Gói Chăm Sóc Bếp Đi Kèm</th>
                <th className="py-4 px-4 text-center">Đặt Giao</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.map((p) => {
                const isBestChoice = p.slug === 'gas-v-gas-xam-12kg' || p.slug === 'gas-v-gas-shell-12kg';
                return (
                  <tr
                    key={p.id}
                    className={`transition-colors group ${
                      p.slug === 'gas-v-gas-xam-12kg' ? 'bg-red-50/40 hover:bg-red-50/70' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/${p.slug}`}
                          className="w-13 h-13 rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center hover:border-red-400 transition-colors"
                          title={`Xem chi tiết ${p.name}`}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </Link>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isBestChoice
                                  ? 'bg-[#DC2626] text-white'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {p.tag}
                            </span>
                            {p.slug === 'gas-v-gas-xam-12kg' && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                Tiết kiệm 65.000đ/bình
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/${p.slug}`}
                            className="font-black text-slate-900 group-hover:text-[#DC2626] hover:underline transition-colors block text-base"
                          >
                            {p.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-xs font-bold text-slate-800">{p.valveType}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Chuẩn {p.weight} • Vỏ còn hạn PCCC</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {p.originalPrice && (
                        <span className="text-xs text-slate-400 line-through mr-1.5 font-semibold">
                          {p.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-black text-[#DC2626]">{p.price}</span>
                      <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        ✓ Đã gồm phí vào hầm chung cư
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-sm font-semibold text-slate-600">{p.newPrice}</div>
                      <div className="text-[10px] text-slate-400">(Có phiếu thu cọc vỏ)</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        ⚖️ Cân điện tử • Vệ sinh bếp 0đ
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOrder(p.slug, true)}
                          className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-xs whitespace-nowrap cursor-pointer"
                        >
                          Đặt giao 15P
                        </button>
                        <a
                          href={ZALO_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackInteractionApi('click_zalo', {
                              phone: HOTLINE_DISPLAY,
                              notes: `Khách bấm đặt Zalo mã ${p.name}`,
                            })
                          }
                          className="bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 font-bold text-xs px-2.5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                          title="Gửi vị trí Zalo nhận gói vệ sinh bếp miễn phí"
                        >
                          📍 Zalo
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Giao Diện Thẻ Mobile */}
      <div className="grid grid-cols-1 gap-3 md:hidden mb-5">
        {filteredProducts.map((p) => {
          const isBestChoice = p.slug === 'gas-v-gas-xam-12kg';
          return (
            <div
              key={p.id}
              className={`rounded-2xl p-4 shadow-xs flex flex-col justify-between ${
                isBestChoice
                  ? 'bg-red-50/40 border-2 border-[#DC2626]'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex gap-3">
                <Link
                  href={`/${p.slug}`}
                  className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold text-white bg-[#DC2626] px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Đổi vỏ khác hãng 0đ
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug">
                    <Link href={`/${p.slug}`} className="hover:text-[#DC2626]">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-0.5">{p.valveType}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/80">
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase">
                    Giá đổi ruột (Đã có vỏ bất kỳ):
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-[#DC2626]">{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        {p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Chưa có vỏ:</span>
                  <span className="text-xs font-semibold text-slate-600">{p.newPrice}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => handleOrder(p.slug, true)}
                  className="flex-1 bg-[#DC2626] text-white font-black text-xs py-3 rounded-xl shadow-xs text-center cursor-pointer"
                >
                  ⚡ Đặt 1 Chạm (Gọi lại 30s)
                </button>
                <a
                  href={HOTLINE_TEL}
                  onClick={() =>
                    trackInteractionApi('click_call', {
                      phone: HOTLINE_DISPLAY,
                      notes: `Khách bấm gọi từ bảng giá mobile (${p.name})`,
                    })
                  }
                  className="bg-emerald-600 text-white font-bold text-xs px-3.5 py-3 rounded-xl flex items-center justify-center gap-1"
                >
                  📞 Gọi
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filterCategory === 'primary' && (
        <div className="text-center mb-5">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className="text-xs md:text-sm font-bold text-[#DC2626] hover:text-[#B91C1C] underline cursor-pointer"
          >
            + Bấm xem thêm bình V-Gas Bọc Nhựa PE êm sàn chung cư, V-Gas Đỏ, Vàng &amp; Tuấn Khang Xanh →
          </button>
        </div>
      )}

      {/* Khung Gói Chăm Sóc Bếp Gia Đình Miễn Phí */}
      <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-xs md:text-sm text-slate-700 space-y-1.5">
          <p className="font-black text-red-950 flex items-center gap-1.5">
            <span>🛡️</span> Đặc quyền Chăm Sóc Gian Bếp Gia Đình &amp; Chung Cư tại {brandName}:
          </p>
          <p>
            • Tặng gói <strong>Đo rò rỉ bằng máy chuyên dụng + Thay gioăng cao su + Vệ sinh họng bếp chỉnh lửa xanh 0đ</strong> mỗi lần đổi bình.
          </p>
          <p>
            • Tặng <strong>Nam châm tủ lạnh / Tem bảo hành {brandName}</strong> ghi ngày lắp: nhắn Zalo số cũ giảm ngay <strong>15.000đ</strong> cho bình kế tiếp.
          </p>
        </div>

        {showDetailLink && (
          <Link
            href="/bang-gia"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-white bg-[#DC2626] hover:bg-[#B91C1C] px-5 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap"
          >
            <span>Bảng giá &amp; Cách tính tiền</span>
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
