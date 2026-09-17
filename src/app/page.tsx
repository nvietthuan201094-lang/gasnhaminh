"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DISTRICTS_DATA } from "@/lib/districts";
import { trackGoogleAdsPurchase } from "@/lib/tracking";
import { trackInteractionApi } from "@/lib/api";

const HOTLINE = "0888 113 831";
const HOTLINE_TEL = "tel:0888113831";
const ZALO_URL = "https://zalo.me/0888113831";

// ─── GTM & CRM Interaction Tracking Helper ──────────────────────────────────────────
function pushGtmEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: eventName, ...params });

  // Gửi tín hiệu tương tác về Odoo CRM để phát thông báo chuông FCM tới điện thoại nhân viên
  if (eventName === "click_zalo" || eventName === "click_call") {
    trackInteractionApi(eventName as "click_zalo" | "click_call", {
      phone: HOTLINE,
      notes: eventName === "click_zalo" ? "Khách bấm Chat Zalo từ trang chủ" : "Khách bấm Gọi Hotline từ trang chủ",
    });
  }
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-8 lg:px-20 h-[72px] max-w-[1440px] mx-auto">
        <div className="flex flex-col leading-tight">
          <span className="text-[#E02424] font-black text-xl tracking-tight">🔥 GAS NHÀ MÌNH</span>
          <span className="text-[10px] text-[#6B7280] font-medium uppercase tracking-widest">Hết gas, gọi Nhà Mình</span>
        </div>
        <nav className="flex gap-8">
          {[["Bảng giá", "#bang-gia"], ["Cam kết", "#cam-ket"], ["Cửa hàng", "#he-thong-cua-hang"], ["Khu vực giao", "#khu-vuc"]].map(([label, href]) => (
            <a key={href} href={href} className="text-[#111928] font-semibold text-sm hover:text-[#E02424] transition-colors">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE })}
            className="flex items-center gap-1.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold px-4 py-2.5 rounded-lg transition-colors text-sm shadow-sm"
          >
            💬 Nhắn Zalo
          </a>
          <a
            href={HOTLINE_TEL}
            onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })}
            className="flex items-center gap-2 bg-[#E02424] hover:bg-[#B91C1C] text-white font-bold px-5 py-2.5 rounded-lg transition-colors text-sm shadow-sm"
          >
            <PhoneIcon /> Gọi ngay: {HOTLINE}
          </a>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-14">
        <span className="text-[#E02424] font-black text-lg">🔥 GAS NHÀ MÌNH</span>
        <a 
          href={HOTLINE_TEL} 
          onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })} 
          className="flex items-center gap-1.5 bg-[#E02424] text-white rounded-full px-3 py-1.5 text-xs font-bold shadow-sm"
        >
          <PhoneIcon size={14} /> {HOTLINE}
        </a>
      </div>
    </header>
  );
}

function MobileStickyBar({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      {/* Cam kết giao nhanh & kiểm tra bình an toàn */}
      <div className="bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#EF4444] py-1 px-3 text-center flex items-center justify-center gap-2 text-[11px] font-bold text-white tracking-wide">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
        </span>
        <span>⚡ Giao trong 15 phút • Nguyên tem chính hãng • Kiểm tra an toàn miễn phí</span>
      </div>

      {/* Cụm nút hành động tối ưu chuyển đổi */}
      <div className="flex items-center gap-2 px-3 py-2 max-w-lg mx-auto">
        <a
          href={HOTLINE_TEL}
          onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })}
          className="flex flex-col items-center justify-center bg-white border border-red-200 text-[#E02424] active:bg-red-50 rounded-xl px-3 py-1.5 min-w-[62px] transition-all shadow-sm"
          title="Gọi hotline tư vấn"
        >
          <PhoneIcon size={16} />
          <span className="text-[10px] font-bold mt-0.5">Gọi ngay</span>
        </a>

        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE })}
          className="flex flex-col items-center justify-center bg-red-50 border border-red-200 text-[#E02424] active:bg-red-100 rounded-xl px-3 py-1.5 min-w-[62px] transition-all shadow-sm"
          title="Chat Zalo đặt gas"
        >
          <span className="text-sm leading-none">💬</span>
          <span className="text-[10px] font-bold mt-0.5">Zalo</span>
        </a>

        <button
          type="button"
          onClick={onOrderClick}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] active:scale-[0.98] text-white font-black text-sm py-3 px-3 rounded-xl shadow-lg shadow-red-500/30 transition-all uppercase tracking-wide"
        >
          <span>🚀 ĐẶT GAS HỎA TỐC</span>
        </button>
      </div>
    </div>
  );
}

function WatermarkOverlay({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-32 max-w-[130px]",
    md: "w-44 max-w-[185px]",
    lg: "w-56 max-w-[240px]",
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 p-2">
      <img
        src="/watermark-logo.png"
        alt="goodGas STORE"
        className={`${sizeClasses[size]} object-contain opacity-70 group-hover:opacity-90 transition-all duration-300`}
        style={{
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.95)) drop-shadow(0 0 12px rgba(255,255,255,0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
        draggable={false}
      />
    </div>
  );
}

function HeroSection({ tabs, activeCategory, setActiveCategory, selectedProduct, setSelectedProduct, onOrderSuccess }: { tabs: TabItem[], activeCategory: number, setActiveCategory: (i: number) => void, selectedProduct: number, setSelectedProduct: (i: number) => void, onOrderSuccess: () => void }) {
  const [selectedOption, setSelectedOption] = useState<"exchange" | "new">("exchange");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const category = tabs[activeCategory] || tabs[0];
  const product = category.products[selectedProduct] || category.products[0];
  const isDanDung = activeCategory === 0;
  const isCN = activeCategory === 1;
  const isContact = product.exchangePrice.includes("Liên hệ");

  const displayPrice = isDanDung
    ? selectedOption === "exchange" ? product.exchangePrice : (product.newPrice ?? product.exchangePrice)
    : product.exchangePrice;

  function handleCategoryChange(i: number) {
    setActiveCategory(i);
    setSelectedProduct(0);
    setSelectedOption("exchange");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name && phone && address) {
      const { createOrder } = await import("@/lib/api");
      const res = await createOrder({
        productId: product.id?.toString() || "0",
        slug: product.slug,
        quantity: 1,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        note: note + (selectedOption === "new" ? " (Mua trọn bộ)" : " (Chỉ đổi gas)"),
        cylinderAction: selectedOption
      });
      if (res.success) {
        const val = Number(displayPrice.replace(/\D/g, "")) || 0;
        const transactionId = (res as any).orderName || res.orderId || `LP-${Date.now()}`;

        // Fire Google Ads Conversion (AW-18424275416/efNKCO--rewcENjDsNFE) & GA4 Purchase strictly after backend confirmation
        trackGoogleAdsPurchase({
          transactionId,
          value: val,
          currency: "VND",
          items: [
            {
              id: product.id,
              name: product.name,
              category: category.label,
              price: val,
              quantity: 1,
            },
          ],
        });

        onOrderSuccess();
      } else {
        alert(res.message || "Đã có lỗi xảy ra khi đặt hàng.");
      }
    }
  }

  return (
    <section id="hero" className="pt-14 md:pt-[72px] bg-gradient-to-br from-[#fff5f5] to-[#fff]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 w-full pt-4 md:pt-6 pb-12 md:pb-16 grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FFF3CD] text-[#92400E] text-xs md:text-sm font-semibold px-3.5 py-1.5 md:px-4 md:py-2 rounded-full mb-4">
            ⚡ Giao gas trong 15–20 phút tại TP.HCM
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111928] leading-tight mb-4">
            Giao Gas Tận Nhà Siêu Tốc 15 Phút – <span className="text-[#E02424]">Gas Nhà Mình</span>
            <span className="block text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mt-2">
              Đại lý đổi bình gas chính hãng, an toàn tại TP.HCM
            </span>
          </h1>
          <p className="text-[#6B7280] text-base md:text-lg mb-6 leading-relaxed">
            Bình gas chính hãng 100%, nguyên tem chống giả, kiểm định an toàn PCCC. Miễn phí kiểm tra dây van và vệ sinh bếp.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Chuẩn đủ 12kg ruột – Chiết nạp tự động, nguyên tem niêm phong chống giả",
              "Tem niêm phong & màng co chống hàng giả",
              "Kỹ thuật viên kiểm tra rò rỉ gas bằng bọt xà phòng/máy đo chuyên dụng",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#111928] text-sm md:text-base">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-[#0E9F6E] rounded-full flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="relative rounded-2xl overflow-hidden shadow-lg hidden md:block select-none group" onContextMenu={(e) => e.preventDefault()}>
            <img
              src="https://images.unsplash.com/photo-1698034303551-7e0e114be199?w=600&h=340&fit=crop&auto=format"
              alt="Nhân viên giao gas chuyên nghiệp"
              className="w-full object-cover"
              style={{ maxHeight: 220 }}
            />
            <WatermarkOverlay size="lg" />
          </div>
        </div>

        {/* Right — Order Form */}
        <div id="order-form" className="bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-8 bg-[#E02424] rounded-full inline-block"></span>
            <h2 className="text-lg font-black text-[#111928] uppercase tracking-wide">Đặt Giao GAS NHÀ MÌNH</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1 — Category */}
            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2 block">Danh mục sản phẩm</label>
              <div className="grid grid-cols-2 gap-1.5">
                {tabs.map((tab, i) => (
                  <button key={tab.label} type="button" onClick={() => handleCategoryChange(i)}
                    className={`text-xs font-bold px-2 py-2.5 rounded-lg border-2 transition-all leading-tight ${activeCategory === i ? "bg-[#E02424] border-[#E02424] text-white" : "bg-white border-[#E5E7EB] text-[#111928] hover:border-[#E02424]"}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Product */}
            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2 block">Chọn sản phẩm</label>
              <div className="space-y-1.5">
                {category.products.map((p, i) => (
                  <label key={p.id}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${selectedProduct === i ? "border-[#E02424] bg-[#fff5f5]" : "border-[#E5E7EB] hover:border-[#E02424]/40"}`}>
                    <div className="flex items-center gap-2.5">
                      <input type="radio" name="product" checked={selectedProduct === i}
                        onChange={() => setSelectedProduct(i)} className="accent-[#E02424] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#111928] leading-snug">{p.name}</span>
                    </div>
                    <span className={`text-xs font-black flex-shrink-0 ml-2 ${p.exchangePrice.includes("Liên hệ") ? "text-[#6B7280]" : "text-[#E02424]"}`}>
                      {p.exchangePrice.includes("Liên hệ") ? "Báo giá" : p.exchangePrice}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3 — Đổi/Mua mới (chỉ hiện cho Gas Dân Dụng có newPrice) */}
            {isDanDung && product.newPrice && (
              <div>
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2 block">Tùy chọn</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedOption === "exchange" ? "border-[#E02424] bg-[#fff5f5]" : "border-[#E5E7EB]"}`}>
                    <input type="radio" name="buyoption" checked={selectedOption === "exchange"} onChange={() => setSelectedOption("exchange")} className="accent-[#E02424] mb-1" />
                    <span className="text-xs font-semibold text-[#111928]">Chỉ đổi gas</span>
                    <span className="text-xs text-[#6B7280]">(Đã có vỏ)</span>
                    <span className="text-sm font-black text-[#E02424] mt-1">{product.exchangePrice}</span>
                  </label>
                  <label className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedOption === "new" ? "border-[#E02424] bg-[#fff5f5]" : "border-[#E5E7EB]"}`}>
                    <input type="radio" name="buyoption" checked={selectedOption === "new"} onChange={() => setSelectedOption("new")} className="accent-[#E02424] mb-1" />
                    <span className="text-xs font-semibold text-[#111928]">Mua trọn bộ</span>
                    <span className="text-xs text-[#6B7280]">(Chưa có vỏ)</span>
                    <span className="text-sm font-black text-[#E02424] mt-1">{product.newPrice}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Price summary */}
            {!isContact && (
              <div className="flex items-center justify-between bg-[#F9FAFB] rounded-lg px-4 py-2.5 border border-[#E5E7EB]">
                <span className="text-xs text-[#6B7280] font-semibold">Tổng thanh toán</span>
                <span className="text-xl font-black text-[#E02424]">{displayPrice}</span>
              </div>
            )}
            {isContact && (
              <div className="flex items-center gap-2 bg-[#FFF3CD] rounded-lg px-4 py-2.5 border border-[#FCD34D]">
                <span className="text-sm">📞</span>
                <span className="text-xs text-[#92400E] font-semibold">Sản phẩm này cần báo giá – nhân viên sẽ liên hệ ngay sau khi đặt.</span>
              </div>
            )}

            {/* Contact inputs */}
            <div className="space-y-2.5">
              <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Họ và tên *"
                className="w-full border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:border-[#E02424] outline-none transition-colors" />
              <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Số điện thoại của bạn *"
                className="w-full border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:border-[#E02424] outline-none transition-colors" />
              <input required value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="Địa chỉ (Số nhà, Tên đường, Phường/Quận) *"
                className="w-full border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:border-[#E02424] outline-none transition-colors" />
              <input value={note} onChange={e => setNote(e.target.value)} type="text" placeholder="Ghi chú (VD: Giao lầu 2, gọi trước khi đến)"
                className="w-full border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:border-[#E02424] outline-none transition-colors" />
            </div>

            <button type="submit"
              className="w-full bg-[#FF5722] hover:bg-[#E65100] text-white font-black text-base py-4 rounded-xl transition-colors uppercase tracking-wide shadow-lg shadow-orange-200">
              🚀 {isContact ? "GỬI YÊU CẦU BÁO GIÁ" : "GIAO GAS CHO TÔI NGAY"}
            </button>
            <p className="text-center text-xs text-[#6B7280]">Cam kết không phát sinh thêm bất kỳ chi phí nào</p>
          </form>
        </div>
      </div>
    </section>
  );
}

const BASE = "https://placehold.co/220x352/f9fafb/6b7280.png?text=";

export type ProductItem = { id: number; slug: string; name: string; tag: string; tagColor: string; exchangePrice: string; newPrice: string | null; img: string };
export type TabItem = { label: string; products: ProductItem[] };

const DEFAULT_PRICING_TABS: TabItem[] = [
  {
    label: "Gas Dân Dụng 12kg",
    products: [
      { id: 168, slug: "gas-v-gas-xam-12kg", name: "Gas V-Gas xám 12kg", tag: "Bán chạy nhất", tagColor: "bg-[#FF5722]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/168/image_1024" },
      { id: 172, slug: "gas-v-gas-do-12kg", name: "Gas V-Gas đỏ 12 kg", tag: "Chính hãng", tagColor: "bg-[#0E9F6E]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/172/image_1024" },
      { id: 175, slug: "gas-petrolimex-dung-12kg", name: "Gas Petrolimex đứng 12kg", tag: "An toàn tuyệt đối", tagColor: "bg-[#1A56DB]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/175/image_1024" },
      { id: 176, slug: "gas-petrolimex-shell-12kg", name: "Gas Petrolimex shell 12kg", tag: "Van Chụp Shell", tagColor: "bg-[#E02424]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/176/image_1024" },
      { id: 178, slug: "gas-v-gas-pe-12kg", name: "Gas V-Gas-PE 12kg", tag: "Bọc nhựa PE", tagColor: "bg-[#7C3AED]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/178/image_1024" },
      { id: 177, slug: "gas-v-gas-shell-12kg", name: "Gas V-Gas-Shell 12kg", tag: "Van Chụp Shell", tagColor: "bg-[#E02424]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/177/image_1024" },
      { id: 174, slug: "gas-v-gas-vang-12kg", name: "Gas V-Gas vàng 12kg", tag: "Lửa xanh bền", tagColor: "bg-[#F59E0B]", exchangePrice: "485.000đ", newPrice: "735.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/174/image_1024" },
      { id: 169, slug: "gas-tuan-khang-vang-12kg", name: "Gas Tuấn Khang vàng 12kg", tag: "Tiết kiệm", tagColor: "bg-[#10B981]", exchangePrice: "465.000đ", newPrice: "715.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/169/image_1024" },
      { id: 171, slug: "gas-tuan-khang-xanh-12kg", name: "Gas Tuấn Khang xanh 12kg", tag: "Chất lượng cao", tagColor: "bg-[#10B981]", exchangePrice: "465.000đ", newPrice: "715.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/171/image_1024" },
    ],
  },
  {
    label: "Gas Công Nghiệp",
    products: [
      { id: 170, slug: "gas-bo-45kg", name: "Gas bò 45 kg", tag: "Nhà hàng, Quán ăn", tagColor: "bg-[#DC2626]", exchangePrice: "1.730.000đ", newPrice: "2.730.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/170/image_1024" },
      { id: 10, slug: "binh-gas-45kg-saigon-petro", name: "Bình Gas 45kg (Saigon Petro)", tag: "Bếp công nghiệp", tagColor: "bg-[#6B7280]", exchangePrice: "1.730.000đ", newPrice: "2.730.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/170/image_1024" },
      { id: 11, slug: "binh-gas-45kg-dau-khi", name: "Bình Gas 45kg (Gas Dầu Khí)", tag: "Công nghiệp", tagColor: "bg-[#7C3AED]", exchangePrice: "1.730.000đ", newPrice: "2.730.000đ", img: "https://crm.posplus.vn/api/v1/public_image/product.template/170/image_1024" },
      { id: 12, slug: "petrolimex-48kg", name: "Petrolimex 48kg", tag: "Nhà máy, Xưởng", tagColor: "bg-[#1A56DB]", exchangePrice: "Liên hệ báo giá", newPrice: null, img: BASE + "220x245x2/images-(32)-9513.jpg" },
    ],
  },
];

let productsPromise: Promise<any[]> | null = null;
function getProductsPromise() {
  if (!productsPromise) {
    productsPromise = import("@/lib/api").then(m => m.fetchProducts());
  }
  return productsPromise;
}

function usePricingTabs() {
  const [tabs, setTabs] = useState<TabItem[]>(DEFAULT_PRICING_TABS);

  useEffect(() => {
    getProductsPromise().then(data => {
      if (data && data.length > 0) {
        const catMap: Record<string, any[]> = {
          'gas_dan_dung': [],
          'gas_cong_nghiep': []
        };
        data.forEach(p => {
          if (p.landingpageCategory && catMap[p.landingpageCategory]) {
            catMap[p.landingpageCategory].push({
              id: p.id,
              slug: p.slug,
              name: p.name,
              tag: p.tags?.[0] || "",
              tagColor: "bg-[#FF5722]",
              exchangePrice: p.price > 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price) : "Liên hệ báo giá",
              newPrice: p.deposit_price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price + p.deposit_price) : null,
              img: p.image || BASE + "gas-gia-dinh-6965_220x352.jpg"
            });
          }
        });
        
        setTabs([
          { label: "Gas Dân Dụng", products: catMap['gas_dan_dung'].length > 0 ? catMap['gas_dan_dung'] : DEFAULT_PRICING_TABS[0].products },
          { label: "Gas Công Nghiệp", products: catMap['gas_cong_nghiep'].length > 0 ? catMap['gas_cong_nghiep'] : DEFAULT_PRICING_TABS[1].products }
        ]);
      }
    }).catch(console.error);
  }, []);

  return tabs;
}

function ProductCard({ p, onSelect }: { p: ProductItem; onSelect: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col justify-between h-full">
      <div>
        <div className="bg-gradient-to-br from-[#FFF5F5] to-[#f9fafb] aspect-square w-full flex items-center justify-center overflow-hidden relative select-none group" onContextMenu={(e) => e.preventDefault()}>
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <WatermarkOverlay size="md" />
        </div>
        <div className="p-5 pb-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
          <h3 className="font-black text-[#111928] mt-3 mb-3 text-base leading-snug">{p.name}</h3>
          <div className="mb-1">
            <span className="text-[10px] text-[#6B7280] uppercase font-semibold">{p.newPrice ? "Đổi gas" : "Giá"}</span>
            <div className="text-2xl font-black text-[#E02424]">{p.exchangePrice}</div>
          </div>
          {p.newPrice && (
            <div className="mb-2">
              <span className="text-[10px] text-[#6B7280] uppercase font-semibold">Mua mới</span>
              <div className="text-sm font-semibold text-[#6B7280]">{p.newPrice}</div>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 pt-3">
        <button onClick={onSelect}
          className="w-full py-2.5 rounded-lg border-2 border-[#E02424] text-[#E02424] font-bold text-sm hover:bg-[#E02424] hover:text-white transition-all">
          {p.exchangePrice.includes("Liên hệ") ? "Nhận báo giá ngay" : "Chọn loại này"}
        </button>
      </div>
    </div>
  );
}

function PricingSection({ tabs, onSelectProduct }: { tabs: TabItem[], onSelectProduct: (catIdx: number, prodIdx: number) => void }) {
  const [activeTab, setActiveTab] = useState(0);

  const products = tabs[activeTab]?.products || tabs[0].products;

  return (
    <section id="bang-gia" className="bg-[#F9FAFB] py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Giá cập nhật hôm nay</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111928]">Bảng Giá Đổi Gas</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tabs.map((tab, i) => (
            <button key={tab.label} onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${activeTab === i ? "bg-[#E02424] border-[#E02424] text-white shadow-md" : "bg-white border-[#E5E7EB] text-[#111928] hover:border-[#E02424] hover:text-[#E02424]"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} onSelect={() => onSelectProduct(activeTab, i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", icon: "📋", title: "Tiếp nhận & Điều phối", desc: "Nhận đơn online/hotline, định vị kho gas gần nhà bạn nhất để xuất đơn." },
    { num: "02", icon: "🚚", title: "Giao hỏa tốc 15 phút", desc: "Giao nhanh bằng xe chuyên dụng, bình gas luôn được chằng buộc an toàn." },
    { num: "03", icon: "🔧", title: "Lắp đặt & Kiểm tra tem", desc: "Kiểm tra nguyên tem niêm phong màng co chính hãng, lắp đặt van dây đúng tiêu chuẩn PCCC." },
    { num: "04", icon: "✅", title: "Kiểm tra rò rỉ & Bàn giao", desc: "Dùng máy kiểm tra rò rỉ tia khí, dán tem bảo hành và ghi phiếu giao nhận." },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Minh bạch – An toàn – Chuẩn PCCC</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111928]">Quy Trình Giao & Lắp Đặt An Toàn Tại Nhà</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-0.5 bg-[#E5E7EB] z-0" style={{ width: "calc(100% - 80px)", left: "calc(50% + 40px)" }}></div>
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#fff5f5] border-2 border-[#E02424] flex items-center justify-center text-3xl mb-4 shadow-sm">{s.icon}</div>
                <span className="text-xs font-black text-[#E02424] tracking-widest mb-1">BƯỚC {s.num}</span>
                <h3 className="font-black text-[#111928] mb-2 text-base">{s.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCarousel({ reviews }: { reviews: { name: string; location: string; avatar: string; stars: number; tag: string; text: string }[] }) {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total]);

  // Show 3 visible on desktop, 1 on mobile
  const visible = 3;

  return (
    <div className="relative">
      {/* Desktop: show 3 at a time */}
      <div className="hidden md:grid grid-cols-3 gap-5">
        {[0, 1, 2].map((offset) => {
          const r = reviews[(current + offset) % total];
          return (
            <div key={offset} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm flex flex-col transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#FF5722] text-lg">{"★".repeat(r.stars)}</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF3CD] text-[#92400E] px-2 py-1 rounded-full">{r.tag}</span>
              </div>
              <p className="text-[#111928] text-sm leading-relaxed mb-5 flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#F3F4F6]">
                <div className="w-10 h-10 rounded-full bg-[#FFE4E1] flex items-center justify-center font-black text-[#E02424] text-base flex-shrink-0">{r.avatar}</div>
                <div>
                  <div className="font-bold text-[#111928] text-sm">{r.name}</div>
                  <div className="text-[#6B7280] text-xs">{r.location}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: show 1 at a time */}
      <div className="md:hidden">
        {(() => {
          const r = reviews[current];
          return (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#FF5722] text-lg">{"★".repeat(r.stars)}</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF3CD] text-[#92400E] px-2 py-1 rounded-full">{r.tag}</span>
              </div>
              <p className="text-[#111928] text-sm leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#F3F4F6]">
                <div className="w-10 h-10 rounded-full bg-[#FFE4E1] flex items-center justify-center font-black text-[#E02424] text-base flex-shrink-0">{r.avatar}</div>
                <div>
                  <div className="font-bold text-[#111928] text-sm">{r.name}</div>
                  <div className="text-[#6B7280] text-xs">{r.location}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#E02424] w-5" : "bg-[#E5E7EB]"}`} />
        ))}
      </div>

      {/* Prev / Next */}
      <button onClick={() => setCurrent(c => (c - 1 + total) % total)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow flex items-center justify-center text-[#111928] hover:border-[#E02424] hover:text-[#E02424] transition-colors hidden md:flex">
        ‹
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % total)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow flex items-center justify-center text-[#111928] hover:border-[#E02424] hover:text-[#E02424] transition-colors hidden md:flex">
        ›
      </button>
    </div>
  );
}

function TrustSection() {
  const badges = [
    {
      icon: "🏷️",
      title: "Nguyên Tem Niêm Phong & Đủ 12kg Ruột",
      desc: "Bình gas được chiết nạp tự động chuẩn xác đủ 12kg ruột tại nhà máy, nguyên màng co chống giả và dập nổi trọng lượng vỏ rõ ràng trên quai xách.",
    },
    {
      icon: "🛡️",
      title: "100% Bình Chính Hãng & Đạt Chuẩn PCCC",
      desc: "Vỏ bình còn hạn kiểm định an toàn, nguyên vẹn tem chống giả, màng co niêm phong từ các thương hiệu uy tín.",
    },
    {
      icon: "🔍",
      title: "Kiểm Tra Rò Rỉ & Bảo Dưỡng Bếp Miễn Phí",
      desc: "Kỹ thuật viên kiểm tra độ kín van dây bằng thiết bị chuyên dụng, hỗ trợ chỉnh lửa xanh và vệ sinh cụm đầu đốt.",
    },
    {
      icon: "🔄",
      title: "1 Đổi 1 Nhanh Chóng",
      desc: "Đổi ngay bình mới hoàn toàn miễn phí nếu phát hiện lỗi van, xì gas hoặc lửa đỏ do chất lượng khí gas.",
    },
  ];

  const reviews = [
    { name: "Chị Lan Phương", location: "Chung cư Sunrise City, Quận 7", avatar: "L", stars: 5, tag: "Hộ gia đình", text: "Giao rất nhanh, bình còn nguyên tem niêm phong và màng co của hãng, nhân viên kiểm tra van dây tỉ mỉ rồi mới lắp. Rất yên tâm!" },
    { name: "Anh Tuấn Hùng", location: "Quán Cơm Niêu, P.12, Gò Vấp", avatar: "T", stars: 5, tag: "Chủ quán ăn", text: "Quán mình bán ăn trưa hay hết gas đột xuất, gọi bên này tầm 15 phút là có thợ tới thay liền, phục vụ nhiệt tình." },
    { name: "Bác Thanh Bình", location: "Đường Phan Xích Long, Phú Nhuận", avatar: "B", stars: 5, tag: "Khách hàng cá nhân", text: "Thợ giao gas có kiểm tra lại dây dẫn gas cũ của nhà mình bị nứt và báo để thay kịp thời, tác phong rất cẩn thận." },
    { name: "Chị Mai Hương", location: "Chung cư Vinhomes, Bình Thạnh", avatar: "M", stars: 5, tag: "Hộ gia đình", text: "Đặt lúc 11 giờ đêm vẫn giao được, thật sự rất tiện. Bình có tem niêm phong đầy đủ, nhân viên lịch sự." },
    { name: "Anh Quốc Bảo", location: "Nhà hàng Hải Sản, Quận 4", avatar: "Q", stars: 5, tag: "Nhà hàng", text: "Dùng bình 45kg cho bếp công nghiệp, báo giá nhanh, giao đúng hẹn. Sẽ đặt cố định mỗi tuần." },
    { name: "Chị Thu Thảo", location: "Căn hộ The Sun Avenue, Quận 2", avatar: "T", stars: 5, tag: "Khách hàng mới", text: "Lần đầu đặt thử, thợ đến đúng 17 phút. Kiểm tra rò rỉ bằng máy rồi mới về, chuyên nghiệp hơn chỗ cũ nhiều." },
    { name: "Anh Minh Khoa", location: "Khu công nghiệp Tân Bình", avatar: "K", stars: 5, tag: "Doanh nghiệp", text: "Cần gas gấp cho xưởng, gọi hotline có người nghe ngay, nhân viên tư vấn nhiệt tình và giao đúng số lượng yêu cầu." },
  ];

  return (
    <section id="cam-ket" className="py-16 md:py-20 bg-[#F9FAFB]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Tại sao chọn chúng tôi</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111928] mb-3">Cam Kết Chất Lượng & Dịch Vụ An Toàn</h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">Mang lại sự an tâm tuyệt đối cho gian bếp gia đình và cơ sở kinh doanh của bạn.</p>
        </div>

        {/* 4 trust badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {badges.map((b) => (
            <div key={b.title} className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md hover:border-[#E02424]/30 transition-all group">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="font-black text-[#111928] text-sm md:text-base mb-2 leading-snug group-hover:text-[#E02424] transition-colors">{b.title}</h3>
              <p className="text-[#6B7280] text-xs md:text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Reviews carousel */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Đánh giá thực tế</span>
          <h3 className="text-2xl md:text-3xl font-black text-[#111928]">Khách Hàng Nói Gì?</h3>
        </div>
        <ReviewCarousel reviews={reviews} />
      </div>
    </section>
  );
}

function ServiceAreaSection() {
  return (
    <section id="khu-vuc" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Phủ sóng toàn thành phố</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111928]">Mạng Lưới Giao Gas Phủ Sóng TP.HCM</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-[#6B7280] mb-5 text-sm">Giao nhanh trong <strong className="text-[#E02424]">15–20 phút</strong> tại các khu vực (bấm để xem chi tiết trạm giao):</p>
            <div className="flex flex-wrap gap-2">
              {DISTRICTS_DATA.map((d) => (
                <Link
                  key={d.slug}
                  href={`/giao-gas/${d.slug}`}
                  title={`Giao gas ${d.name} siêu tốc 15 phút`}
                  className="flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#E02424] hover:bg-red-50/60 hover:text-[#E02424] transition-all rounded-lg px-3 py-2 text-sm font-semibold text-[#111928]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0E9F6E] inline-block"></span>{d.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[#FFF3CD] rounded-xl border border-[#FCD34D]">
              <p className="text-sm text-[#92400E] font-semibold">📍 Không thấy khu vực của bạn? Liên hệ hotline <a href={HOTLINE_TEL} className="text-[#E02424] underline">{HOTLINE}</a> – chúng tôi hỗ trợ thêm nhiều khu vực!</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg h-72 bg-[#E5E7EB] flex items-center justify-center relative select-none group" onContextMenu={(e) => e.preventDefault()}>
            <img
              src="https://images.unsplash.com/photo-1736960894843-bc9afe9b22c9?w=600&h=288&fit=crop&auto=format"
              alt="Mạng lưới giao gas TPHCM"
              className="w-full h-full object-cover"
            />
            <WatermarkOverlay size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

const STORES_LIST = [
  {
    id: 1,
    branch: "Chi nhánh Quận 8",
    name: "Trạm Gas Chánh Hưng – Quận 8",
    address: "1009 Phạm Thế Hiển, Phường Chánh Hưng, Quận 8, TP.HCM",
    coverage: "Quận 8, Quận 5, Quận 7, Quận 4, Bình Chánh (Trung Sơn, Phạm Hùng)",
    sla: "15 - 20 phút",
    badge: "Kho trực chiến 24/7",
    hotline: HOTLINE,
    hotlineTel: HOTLINE_TEL,
  },
  {
    id: 2,
    branch: "Chi nhánh Tân Phú",
    name: "Trạm Gas Phú Thọ Hòa – Tân Phú",
    address: "36 Nguyễn Văn Huyên, Phường Phú Thọ Hòa, Quận Tân Phú, TP.HCM",
    coverage: "Quận Tân Phú, Tân Bình, Quận 11, Quận 10, Bình Tân",
    sla: "15 - 20 phút",
    badge: "Trung tâm phân phối khu Tây",
    hotline: HOTLINE,
    hotlineTel: HOTLINE_TEL,
  },
  {
    id: 3,
    branch: "Chi nhánh Hóc Môn 1",
    name: "Trạm Gas Bà Điểm – Hóc Môn",
    address: "64A Nguyễn Thị Hai, Xã Bà Điểm, Huyện Hóc Môn, TP.HCM",
    coverage: "Bà Điểm Hóc Môn, Quận 12 (An Sương, Tân Thới Nhất), Bình Tân",
    sla: "15 - 25 phút",
    badge: "Trạm cửa ngõ Tây Bắc",
    hotline: HOTLINE,
    hotlineTel: HOTLINE_TEL,
  },
  {
    id: 4,
    branch: "Chi nhánh Hóc Môn 2",
    name: "Trạm Gas Tân Hiệp – Hóc Môn",
    address: "111/7H Ấp Thới Tây 2, Tân Hiệp 18, Xã Tân Hiệp, Huyện Hóc Môn, TP.HCM",
    coverage: "Tân Hiệp, Thị trấn Hóc Môn, Thới Tam Thôn, Củ Chi giáp ranh",
    sla: "20 - 25 phút",
    badge: "Kho hàng quy mô lớn",
    hotline: HOTLINE,
    hotlineTel: HOTLINE_TEL,
  },
  {
    id: 5,
    branch: "Chi nhánh Quận 6",
    name: "Trạm Gas Cư Xá Bình Phú – Quận 6",
    address: "14R Đường 32B Cư Xá Bình Phú, Phường 10, Quận 6, TP.HCM",
    coverage: "Quận 6, Bình Tân (An Lạc, Tên Lửa), Quận 5 (khu Chợ Lớn), Quận 11",
    sla: "15 - 20 phút",
    badge: "Kho trực chiến Chợ Lớn",
    hotline: HOTLINE,
    hotlineTel: HOTLINE_TEL,
  },
];

function StoresSection({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section id="he-thong-cua-hang" className="py-16 md:py-24 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEE2E2] text-[#E02424] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E02424] animate-pulse"></span>
            Mạng lưới cửa hàng thực tế
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#111928] leading-tight mb-4">
            Hệ Thống 5 Cửa Hàng & Trạm Kho Gas Trực Chiến
          </h2>
          <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
            Mạng lưới trạm kho vật lý đặt tại các vị trí giao thông huyết mạch TP.HCM. Đội ngũ kỹ thuật viên thường trực 24/7, xuất kho giao hỏa tốc 15–20 phút tận nhà, kiểm tra rò rỉ khí gas an toàn miễn phí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {STORES_LIST.map((store) => (
            <div
              key={store.id}
              className="bg-[#F9FAFB] hover:bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#E02424] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-white group-hover:bg-[#FEE2E2] text-[#E02424] border border-[#FECACA] rounded-full text-xs font-bold tracking-wide transition-colors">
                    {store.branch}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#057A55] bg-[#DEF7EC] px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#31C48D] animate-ping"></span>
                    <span>Sẵn sàng giao</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#111928] group-hover:text-[#E02424] transition-colors mb-3">
                  {store.name}
                </h3>

                <div className="space-y-3 text-xs md:text-sm text-[#4B5563] mb-6">
                  <div className="flex items-start gap-2.5">
                    <span className="text-base flex-shrink-0 mt-0.5">📍</span>
                    <span className="leading-snug">
                      <strong className="text-[#111928]">Địa chỉ:</strong> {store.address}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-base flex-shrink-0 mt-0.5">🚚</span>
                    <span className="leading-snug">
                      <strong className="text-[#111928]">Phục vụ nhanh:</strong> {store.coverage}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base flex-shrink-0">⚡</span>
                    <span>
                      <strong className="text-[#111928]">Thời gian giao:</strong>{" "}
                      <span className="text-[#E02424] font-bold">{store.sla}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-2">
                <a
                  href={store.hotlineTel}
                  className="flex-1 py-2.5 px-3 bg-[#E02424] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-xl text-center shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneIcon size={14} /> Gọi Trạm Này
                </a>
                <button
                  type="button"
                  onClick={onOrderClick}
                  className="py-2.5 px-3 bg-white hover:bg-[#F3F4F6] text-[#111928] border border-[#D1D5DB] text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
                >
                  Đặt Giao Tận Bếp
                </button>
              </div>
            </div>
          ))}

          {/* Card cam kết chất lượng */}
          <div className="bg-gradient-to-br from-[#991B1B] via-[#B91C1C] to-[#E02424] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl mb-4">
                🛡️
              </div>
              <h3 className="text-lg font-bold mb-3">Cam Kết Pháp Lý & An Toàn</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-4">
                Tất cả 5 cửa hàng và trạm chiết nạp liên kết đều đáp ứng 100% tiêu chuẩn phòng cháy chữa cháy (PCCC) và giấy phép kinh doanh khí dầu mỏ hóa lỏng (LPG) theo quy định Nhà nước.
              </p>
              <ul className="space-y-2 text-xs text-white/90">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">✓</span>
                  <span>Bình gas chính hãng nguyên tem chống giả</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">✓</span>
                  <span>Chiết nạp tự động đủ 12kg ruột</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">✓</span>
                  <span>Kỹ thuật viên thử rò rỉ khí gas miễn phí</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-white/20 mt-4">
              <div className="text-[11px] text-white/70">Tổng đài điều phối hỏa tốc:</div>
              <a href={HOTLINE_TEL} className="text-xl font-black text-white hover:underline flex items-center gap-2 mt-0.5">
                <PhoneIcon size={18} /> {HOTLINE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "Thời gian giao gas tại TP.HCM mất bao lâu?",
      a: "Nhờ mạng lưới trạm phân phối rộng khắp các quận huyện, thời gian giao gas trung bình từ 15–20 phút kể từ lúc tiếp nhận đơn hàng hoặc cuộc gọi hotline."
    },
    {
      q: "Gas Nhà Mình cung cấp những loại bình gas nào?",
      a: "Chúng tôi cung cấp đầy đủ bình gas chính hãng 100%: V-Gas (xám, đỏ, vàng, PE, Shell), Petrolimex (van đứng, van chụp shell), Tuấn Khang 12kg và bình gas bò 45kg chuyên dụng cho quán ăn, nhà hàng."
    },
    {
      q: "Tôi có được cân đối chứng kiểm tra trọng lượng bình gas không? Làm sao biết bình đủ 12kg ruột?",
      a: "Bình gas 12kg gia đình đã được chiết nạp tự động chuẩn xác đủ 12kg ruột tại nhà máy của hãng và niêm phong màng co nhiệt chống giả. Trọng lượng vỏ bình được dập nổi rõ ràng trên quai xách (ví dụ: vỏ 13.5kg + 12kg nước gas = 25.5kg). Để đảm bảo giao hỏa tốc 15 phút, nhân viên không mang theo cân cồng kềnh mà sẽ cùng quý khách kiểm tra nguyên vẹn tem màng co, hạn kiểm định vỏ bình và thử rò rỉ khí gas an toàn. Nếu gia đình có sẵn cân tại nhà, quý khách hoàn toàn có thể kiểm tra đối chứng trước khi nhận."
    },
    {
      q: "Quy trình kiểm tra an toàn khi đổi bình gas như thế nào?",
      a: "Mọi bình gas phân phối qua Gas Nhà Mình đều là hàng chính hãng từ nhà sản xuất uy tín, có tem kiểm định an toàn PCCC và nguyên màng co niêm phong. Khi giao gas, kỹ thuật viên sẽ hỗ trợ kiểm tra độ kín của van dây, kiểm tra rò rỉ khí gas bằng máy dò/dung dịch chuyên dụng và vệ sinh bếp miễn phí trước khi bàn giao."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#F9FAFB]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Hỏi đáp thường gặp</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111928]">Câu Hỏi Về Dịch Vụ Giao Gas & Đổi Gas</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm hover:border-[#E02424] transition-all">
              <h3 className="text-lg font-bold text-[#111928] mb-2 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FEE2E2] text-[#E02424] text-sm flex items-center justify-center flex-shrink-0 mt-0.5">?</span>
                {faq.q}
              </h3>
              <p className="text-[#6B7280] text-sm md:text-base leading-relaxed pl-9">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D1117] text-white py-12 pb-20 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-[#E02424] font-black text-2xl mb-3">🔥 GAS NHÀ MÌNH</div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Kênh đặt gas chính hãng uy tín tại TP.HCM. Giao hỏa tốc 15–20 phút, nguyên tem chống giả, hỗ trợ kiểm tra an toàn tận nơi.
            </p>
            <div className="space-y-2 text-xs text-white/70">
              <div>☎️ Hotline: <a href={HOTLINE_TEL} className="text-[#FF5722] font-bold text-sm">{HOTLINE}</a></div>
              <div>🕐 Hoạt động: 24/7 kể cả Lễ & Tết</div>
              <div>⚡ Phục vụ: Giao hỏa tốc tất cả các quận huyện TP.HCM</div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider text-[#FF5722]">Hệ thống 5 Cửa Hàng & Trạm Kho Trực Chiến</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-white/70">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-[#FF5722]">📍</span> Chi nhánh Quận 8
                </div>
                <div>1009 Phạm Thế Hiển, P. Chánh Hưng, Q.8</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-[#FF5722]">📍</span> Chi nhánh Tân Phú
                </div>
                <div>36 Nguyễn Văn Huyên, P. Phú Thọ Hòa, Q. Tân Phú</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-[#FF5722]">📍</span> Chi nhánh Bà Điểm
                </div>
                <div>64A Nguyễn Thị Hai, Xã Bà Điểm, Hóc Môn</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-[#FF5722]">📍</span> Chi nhánh Tân Hiệp
                </div>
                <div>111/7H Ấp Thới Tây 2, Tân Hiệp 18, Hóc Môn</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 sm:col-span-2">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-[#FF5722]">📍</span> Chi nhánh Quận 6 (Cư Xá Bình Phú)
                </div>
                <div>14R Đường 32B Cư Xá Bình Phú, Phường 10, Quận 6</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} GAS NHÀ MÌNH. Chuỗi cửa hàng và trạm phân phối gas chính hãng tại TP. Hồ Chí Minh.
        </div>
      </div>
    </footer>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none"><path d="M3 14L13 24L33 3" stroke="#0E9F6E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 className="text-2xl font-black text-[#111928] mb-3">ĐẶT HÀNG THÀNH CÔNG!</h3>
        <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
          Cửa hàng gần nhất đang chuẩn bị bình gas và xuất kho. Nhân viên sẽ liên hệ bạn trong vòng <strong className="text-[#111928]">1–2 phút</strong>.
        </p>
        <a href={HOTLINE_TEL}
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#E02424] text-[#E02424] font-bold rounded-xl mb-3 hover:bg-[#E02424] hover:text-white transition-all text-sm">
          <PhoneIcon size={16} /> Cần gấp? Bấm gọi Hotline ngay
        </a>
        <button onClick={onClose} className="text-sm text-[#6B7280] hover:text-[#111928] transition-colors">Đóng</button>
      </div>
    </div>
  );
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function FloatingContactButtons() {
  return (
    <div className="hidden md:flex fixed bottom-8 right-6 z-40 flex-col gap-2.5 items-end">
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE })}
        className="flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        title="Chat Zalo tư vấn giao gas nhanh"
      >
        <span className="text-lg leading-none">💬</span>
        <span className="text-xs md:text-sm tracking-wide">Nhắn Zalo</span>
      </a>
    </div>
  );
}

export default function App() {
  const tabs = usePricingTabs();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  function scrollToForm() {
    const el = document.getElementById("order-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const phoneInput = el.querySelector("input[type='tel']") as HTMLInputElement | null;
      if (phoneInput) {
        setTimeout(() => phoneInput.focus(), 450);
      }
    }
  }

  function handleProductSelect(catIdx: number, prodIdx: number) {
    setActiveCategory(catIdx);
    setSelectedProduct(prodIdx);
    scrollToForm();
  }

  return (
    <div className="min-h-screen bg-white text-[#111928]">
      <Header />
      <HeroSection 
        tabs={tabs} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        selectedProduct={selectedProduct} 
        setSelectedProduct={setSelectedProduct} 
        onOrderSuccess={() => setShowSuccess(true)} 
      />
      <PricingSection tabs={tabs} onSelectProduct={handleProductSelect} />
      <ProcessSection />
      <TrustSection />
      <ServiceAreaSection />
      <StoresSection onOrderClick={scrollToForm} />
      <FaqSection />
      <Footer />
      <MobileStickyBar onOrderClick={scrollToForm} />
      <FloatingContactButtons />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

