"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DISTRICTS_DATA, SEO_PRODUCTS } from "@/lib/districts";
import { GUIDES_DATA } from "@/lib/guides";
import { createProductSchema } from "@/lib/seo-schema";
import { trackGoogleAdsPurchase } from "@/lib/tracking";
import { trackInteractionApi } from "@/lib/api";
import { WATERMARK_LOGO_SRC } from "@/lib/watermark";
import GasPriceTable from "@/components/GasPriceTable";

const HOTLINE = "0888 113 831";
const HOTLINE_TEL = "tel:0888113831";
const ZALO_URL = "https://zalo.me/0888113831";

function pushGtmEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: eventName, ...params });

  if (eventName === "click_zalo" || eventName === "click_call") {
    trackInteractionApi(eventName as "click_zalo" | "click_call", {
      phone: HOTLINE,
      customerPhone: (params.customerPhone as string) || undefined,
      notes:
        (params.notes as string) ||
        (eventName === "click_zalo"
          ? "Khách bấm Gửi Định Vị / Chat Zalo từ trang chủ Gas Nhà Mình"
          : "Khách bấm Gọi Hotline từ trang chủ Gas Nhà Mình"),
    });
  }
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="hidden md:flex items-center justify-between px-8 lg:px-20 h-[72px] max-w-[1440px] mx-auto">
        <a href="#hero" className="flex items-center gap-3 py-1 hover:opacity-95 transition-opacity">
          <img src="/logo.png" alt="Gas Nhà Mình - Chăm Sóc Gian Bếp Gia Đình & Chung Cư" className="h-[54px] w-auto object-contain" />
          <div className="hidden xl:block pl-3 border-l border-slate-200">
            <div className="text-xs font-black text-[#DC2626] uppercase tracking-wider">Chuyên Gia Bếp Gia Đình &amp; Chung Cư</div>
            <div className="text-[11px] text-slate-500 font-semibold">Đo rò rỉ bằng máy • Vệ sinh bếp 0đ</div>
          </div>
        </a>
        <nav className="flex gap-6">
          {[
            ["Bảng giá 530K", "#bang-gia"],
            ["3 Không nhận bình", "#ba-khong"],
            ["Chăm sóc chung cư", "#cham-soc-bep"],
            ["Khu vực <2km", "#khu-vuc"],
            ["Cẩm nang", "/cam-nang"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-slate-800 font-semibold text-sm hover:text-[#DC2626] transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE, notes: "Khách bấm Gửi Định Vị Zalo trên Header" })}
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 font-bold px-3.5 py-2.5 rounded-xl transition-colors text-xs lg:text-sm"
          >
            📍 Gửi Vị Trí Zalo
          </a>
          <a
            href={HOTLINE_TEL}
            onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })}
            className="flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black px-4 py-2.5 rounded-xl transition-colors text-xs lg:text-sm shadow-xs"
          >
            <PhoneIcon size={16} /> {HOTLINE}
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-14">
        <a href="#hero" className="flex items-center py-1">
          <img src="/logo.png" alt="Gas Nhà Mình" className="h-10 w-auto object-contain" />
        </a>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
            Chuẩn PCCC
          </span>
          <a
            href={HOTLINE_TEL}
            onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })}
            className="flex items-center gap-1 bg-[#DC2626] text-white rounded-full px-3 py-1.5 text-xs font-black shadow-xs"
          >
            <PhoneIcon size={13} /> {HOTLINE}
          </a>
        </div>
      </div>
    </header>
  );
}

function MobileStickyBar({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(15,23,42,0.12)]">
      <div className="bg-[#B91C1C] py-1 px-3 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-white">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
        <span>⚖️ Cân điện tử tại bếp • Đo rò rỉ &amp; Vệ sinh bếp 0đ</span>
      </div>

      <div className="flex items-center gap-2 px-2.5 py-2 max-w-lg mx-auto">
        <a
          href={HOTLINE_TEL}
          onClick={() => pushGtmEvent("click_call", { phone: HOTLINE, notes: "Khách bấm Gọi từ thanh đáy Mobile" })}
          className="flex flex-col items-center justify-center bg-white border border-red-200 text-[#DC2626] rounded-xl px-2.5 py-1.5 min-w-[60px]"
        >
          <PhoneIcon size={15} />
          <span className="text-[10px] font-bold mt-0.5">Gọi 15P</span>
        </a>

        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE, notes: "Khách bấm Gửi Định Vị Zalo thanh đáy Mobile" })}
          className="flex flex-col items-center justify-center bg-red-50 border border-red-200 text-[#DC2626] rounded-xl px-2.5 py-1.5 min-w-[84px]"
        >
          <span className="text-xs leading-none">📍</span>
          <span className="text-[10px] font-bold mt-0.5">Gửi Vị Trí Zalo</span>
        </a>

        <button
          type="button"
          onClick={onOrderClick}
          className="flex-1 flex items-center justify-center gap-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs sm:text-sm py-3 px-3 rounded-xl shadow-md shadow-red-500/25 uppercase tracking-wide cursor-pointer"
        >
          <span>⚡ ĐẶT 1 CHẠM (530K)</span>
        </button>
      </div>
    </div>
  );
}

function WatermarkOverlay({
  type = "product",
  hotline = HOTLINE,
  hotlineTel = HOTLINE_TEL,
}: {
  type?: "product" | "banner";
  size?: string;
  hotline?: string;
  hotlineTel?: string;
}) {
  if (type === "banner") {
    return (
      <>
        <div className="absolute top-3 left-3 z-10 pointer-events-none select-none">
          <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-md border border-slate-200 flex items-center">
            <img src={WATERMARK_LOGO_SRC} alt="Gas Nhà Mình" className="h-6 w-auto object-contain" draggable={false} />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <a
            href={hotlineTel}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg"
          >
            <PhoneIcon size={13} />
            <span>GỌI GAS NHÀ MÌNH: {hotline}</span>
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none select-none">
        <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-xs border border-slate-100 flex items-center">
          <img src={WATERMARK_LOGO_SRC} alt="Gas Nhà Mình" className="h-5 sm:h-6 w-auto object-contain" draggable={false} />
        </div>
      </div>
      <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none select-none">
        <span className="inline-flex items-center gap-1 bg-emerald-50/95 text-[#057A55] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
          🛡️ Chuẩn PCCC • Đủ Ký
        </span>
      </div>
      <div className="absolute bottom-2.5 right-2.5 z-10">
        <a
          href={hotlineTel}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md tracking-tight"
        >
          <PhoneIcon size={11} />
          <span>{hotline}</span>
        </a>
      </div>
      <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none select-none">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100/95 border border-amber-200 px-1.5 py-0.5 rounded">
          🏠 Bếp Gia Đình
        </span>
      </div>
    </>
  );
}

export type ProductItem = {
  id: number;
  slug: string;
  name: string;
  valveNote: string;
  tag: string;
  tagColor: string;
  exchangePrice: string;
  originalPrice?: string;
  newPrice: string | null;
  img: string;
};
export type TabItem = { label: string; products: ProductItem[] };

const ID_BY_SLUG: Record<string, number> = {
  "gas-v-gas-xam-12kg": 168,
  "gas-v-gas-do-12kg": 172,
  "gas-v-gas-vang-12kg": 174,
  "gas-v-gas-xanh-den-12kg": 173,
  "gas-v-gas-pe-12kg": 178,
  "gas-v-gas-shell-12kg": 177,
  "gas-petrolimex-dung-12kg": 175,
  "gas-petrolimex-shell-12kg": 176,
  "gas-tuan-khang-vang-12kg": 169,
  "gas-tuan-khang-xanh-12kg": 171,
  "gas-bo-45kg": 170,
};

function buildTabsFromSeoProducts(list = SEO_PRODUCTS): TabItem[] {
  const primary12kg = list
    .filter((p) => p.category !== "cong-nghiep" && p.isPrimaryDisplay !== false)
    .map((p) => ({
      id: ID_BY_SLUG[p.slug] || 168,
      slug: p.slug,
      name: p.name,
      valveNote: p.valveType,
      tag: p.tag,
      tagColor:
        p.slug === "gas-v-gas-xam-12kg" || p.slug === "gas-v-gas-shell-12kg"
          ? "bg-[#DC2626]"
          : p.brand.includes("Tuấn Khang")
            ? "bg-[#059669]"
            : "bg-[#1D4ED8]",
      exchangePrice: p.price,
      originalPrice: p.originalPrice,
      newPrice: p.newPrice || null,
      img: p.image || `https://crm.gasnhaminh.com/api/v1/public_image/product.template/${ID_BY_SLUG[p.slug] || 168}/image_1024`,
    }));

  const congNghiep = list
    .filter((p) => p.category === "cong-nghiep")
    .map((p) => ({
      id: ID_BY_SLUG[p.slug] || 170,
      slug: p.slug,
      name: p.name,
      valveNote: p.valveType,
      tag: p.tag,
      tagColor: "bg-[#B91C1C]",
      exchangePrice: p.price,
      originalPrice: p.originalPrice,
      newPrice: p.newPrice || null,
      img: p.image || `https://crm.gasnhaminh.com/api/v1/public_image/product.template/${ID_BY_SLUG[p.slug] || 170}/image_1024`,
    }));

  return [
    { label: "Bình 12kg Hộ Gia Đình & Chung Cư", products: primary12kg },
    { label: "Bình 45kg Bếp Ăn Tập Thể & Nhà Hàng", products: congNghiep },
  ];
}

function usePricingTabs() {
  const [tabs, setTabs] = useState<TabItem[]>(() => buildTabsFromSeoProducts(SEO_PRODUCTS));

  useEffect(() => {
    import("@/lib/api")
      .then((m) => m.fetchDynamicGasPrices())
      .then((products) => {
        if (products && products.length > 0) {
          setTabs(buildTabsFromSeoProducts(products));
        }
      })
      .catch(console.error);
  }, []);

  return tabs;
}

function HeroSection({
  onOrderSuccess,
  onScrollToPricing,
}: {
  onOrderSuccess: () => void;
  onScrollToPricing: () => void;
}) {
  const [quickPhone, setQuickPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("gas_customer_phone");
        if (saved) setQuickPhone(saved);
      } catch (_) {}
    }
  }, []);

  async function handleHeroQuickSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = quickPhone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 11) {
      setErrorMsg("Vui lòng nhập SĐT hợp lệ (9–11 chữ số) để nhân viên gọi xác nhận trong 30 giây.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);
    try {
      const { createOrder } = await import("@/lib/api");
      const res = await createOrder({
        productId: "168",
        slug: "gas-v-gas-xam-12kg",
        quantity: 1,
        customerName: "Gia đình đặt 1 chạm (Hero Gas Nhà Mình)",
        customerPhone: quickPhone.trim(),
        customerAddress: "Xác nhận địa chỉ căn hộ/nhà phố qua SĐT trong 30 giây",
        note: "Đặt 1 chạm V-Gas 12kg 530.000đ + Tặng gói đo rò rỉ bằng máy & vệ sinh bếp 0đ",
        cylinderAction: "exchange",
      });
      if (res.success) {
        trackGoogleAdsPurchase({
          transactionId: (res as any).orderName || res.orderId || `HERO-GNM-${Date.now()}`,
          value: 530000,
          currency: "VND",
          items: [{ id: 168, name: "Gas V-Gas 12kg Van Phổ Thông", category: "Gas 12kg", price: 530000, quantity: 1 }],
        });
        onOrderSuccess();
      } else {
        setErrorMsg(res.message || "Không gửi được yêu cầu. Vui lòng bấm gọi 0888 113 831.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối mạng. Vui lòng bấm gọi 0888 113 831 để được hỗ trợ ngay!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="hero" className="pt-16 md:pt-[82px] bg-gradient-to-b from-[#FFF5F5] via-white to-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 pt-5 md:pt-8 pb-8 md:pb-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-red-100/80 text-[#991B1B] text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full mb-4 w-fit border border-red-200">
              <span>🛡️</span> Chăm Sóc Bếp Gia Đình &amp; Chung Cư — 5 Chi Nhánh + 30+ Trạm Liên Kết (&lt;2km)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[43px] font-black text-slate-900 leading-[1.15] mb-3 tracking-tight">
              Đổi Gas An Toàn Chuẩn PCCC Tận Căn Hộ —{" "}
              <span className="text-[#DC2626]">V-Gas 12kg 530.000đ!</span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5 max-w-2xl">
              Thợ đồng phục lịch sự, rành quy trình vào hầm thang máy chung cư &amp; lễ phép khi nhà chỉ có ông bà lớn tuổi.{" "}
              <strong className="text-emerald-700">Đổi ngang mọi vỏ hãng cũ 0đ</strong> + tặng gói{" "}
              <strong className="text-slate-900">Đo rò rỉ bằng máy chuyên dụng &amp; Vệ sinh họng bếp lửa xanh miễn phí!</strong>
            </p>

            {/* Khung Đặt Nhanh 1 Chạm Cho Gia Đình & Cư Dân Chung Cư */}
            <div className="bg-white rounded-2xl border-2 border-[#DC2626]/30 shadow-lg p-4 sm:p-5 mb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                  🏠 Đặt Nhanh 1 Chạm (Tặng Gói Bảo Dưỡng Bếp 0đ)
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Cân móc điện tử 50kg tại bếp
                </span>
              </div>

              <form onSubmit={handleHeroQuickSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="tel"
                  inputMode="tel"
                  required
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  placeholder="Nhập SĐT gia đình nhận gas (VD: 0909...)"
                  className="flex-1 border-2 border-slate-200 focus:border-[#DC2626] rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-900 outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md shadow-red-500/25 uppercase tracking-wide whitespace-nowrap cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Đang kết nối..." : "⚡ GỌI LẠI TRONG 30 GIÂY"}
                </button>
              </form>

              {errorMsg && <p className="text-xs font-semibold text-red-600 mt-2">{errorMsg}</p>}

              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE, customerPhone: quickPhone, notes: "Khách bấm Gửi Định Vị Zalo trong Hero Gas Nhà Mình" })}
                  className="font-bold text-[#DC2626] hover:underline inline-flex items-center gap-1"
                >
                  📍 Gửi Vị Trí Căn Hộ / Nhà Phố Qua Zalo (Khỏi gõ địa chỉ) →
                </a>
                <button
                  type="button"
                  onClick={onScrollToPricing}
                  className="font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Xem bảng giá V-Gas Van Chụp / Petrolimex ↓
                </button>
              </div>
            </div>

            {/* 4 Tiêu chuẩn gia đình kỹ tính */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black flex-shrink-0">📟</span>
                <span className="text-xs font-bold text-slate-800">Máy dò rò rỉ chuyên dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black flex-shrink-0">⚖️</span>
                <span className="text-xs font-bold text-slate-800">Cân điện tử đủ 12kg ruột</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center text-xs font-black flex-shrink-0">🏢</span>
                <span className="text-xs font-bold text-slate-800">Rành thủ tục hầm chung cư</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-black flex-shrink-0">✨</span>
                <span className="text-xs font-bold text-slate-800">Vệ sinh họng bếp lửa xanh</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white select-none group" onContextMenu={(e) => e.preventDefault()}>
              <img
                src="/hero_gasnhaminh.jpg"
                alt="Kỹ thuật viên Gas Nhà Mình giao lắp an toàn và bảo dưỡng bếp gia đình tại TP.HCM"
                fetchPriority="high"
                className="w-full h-[300px] sm:h-[380px] lg:h-[430px] object-cover object-center"
              />
              <WatermarkOverlay type="banner" />
            </div>
          </div>
        </div>

        {/* 3 Đặc Quyền Gian Bếp Gia Đình & Chung Cư */}
        <div id="cham-soc-bep" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-start gap-3.5 bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-[#DC2626] flex items-center justify-center text-lg flex-shrink-0">
              🏢
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm md:text-base">Chuẩn Mực Chung Cư &amp; Người Lớn Tuổi</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Thợ tự đăng ký bảo vệ, có xe đẩy chuyên dụng vào thang hàng, ăn nói lễ phép, hướng dẫn khóa van tận tình.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg flex-shrink-0">
              📟
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm md:text-base">Đo Máy Dò Khí &amp; Chỉnh Lửa Xanh 0đ</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Kiểm tra độ kín cổ van – dây dẫn bằng thiết bị dò khí, thay gioăng mới và vệ sinh họng bếp không đen nồi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg flex-shrink-0">
              ⚖️
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm md:text-base">Cân Điện Tử Đối Chứng &amp; Đổi Vỏ 0đ</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Móc cân điện tử 50kg kiểm tra đủ <strong>[Vỏ + 12kg ruột]</strong> tại chỗ. Đổi ngang mọi vỏ hãng cũ miễn phí.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderSection({
  tabs,
  activeCategory,
  setActiveCategory,
  selectedProduct,
  setSelectedProduct,
  onOrderSuccess,
}: {
  tabs: TabItem[];
  activeCategory: number;
  setActiveCategory: (i: number) => void;
  selectedProduct: number;
  setSelectedProduct: (i: number) => void;
  onOrderSuccess: () => void;
}) {
  const [selectedOption, setSelectedOption] = useState<"exchange" | "new">("exchange");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedPhone = localStorage.getItem("gas_customer_phone");
        if (savedPhone) setPhone(savedPhone);
        const savedName = localStorage.getItem("gas_customer_name");
        if (savedName) setName(savedName);
      } catch (_) {}
    }
  }, []);

  const category = tabs[activeCategory] || tabs[0];
  const product = category?.products[selectedProduct] || category?.products[0];
  const isDanDung = activeCategory === 0;

  const displayPrice = isDanDung
    ? selectedOption === "exchange"
      ? product?.exchangePrice
      : product?.newPrice ?? product?.exchangePrice
    : product?.exchangePrice;

  function handleDropdownChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [cStr, pStr] = e.target.value.split("-");
    const c = parseInt(cStr, 10);
    const p = parseInt(pStr, 10);
    if (!isNaN(c) && !isNaN(p)) {
      setActiveCategory(c);
      setSelectedProduct(p);
      setSelectedOption("exchange");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 11 || submitting || isSubmittingRef.current) {
      if (digits.length < 9 || digits.length > 11) {
        alert("Vui lòng nhập số điện thoại hợp lệ (9–11 số) để Gas Nhà Mình gọi lại trong 30 giây!");
      }
      return;
    }
    isSubmittingRef.current = true;
    setSubmitting(true);
    try {
      const { createOrder } = await import("@/lib/api");
      const res = await createOrder({
        productId: product?.id?.toString() || "168",
        slug: product?.slug || "gas-v-gas-xam-12kg",
        quantity: 1,
        customerName: name.trim() || "Gia đình đặt nhanh 1 chạm",
        customerPhone: phone.trim(),
        customerAddress: address.trim() || "Xác nhận địa chỉ căn hộ/nhà phố qua SĐT trong 30 giây",
        note: `${note.trim()} (${selectedOption === "new" ? "Mua trọn bộ kèm vỏ" : "Đổi ruột + Gói bảo dưỡng bếp 0đ"})`.trim(),
        cylinderAction: selectedOption,
      });

      if (res.success) {
        const val = Number((displayPrice || "0").replace(/\D/g, "")) || 530000;
        const transactionId = (res as any).orderName || res.orderId || `GNM-${Date.now()}`;

        trackGoogleAdsPurchase({
          transactionId,
          value: val,
          currency: "VND",
          items: [
            {
              id: product?.id || 168,
              name: product?.name || "Gas V-Gas 12kg",
              category: category?.label || "Gas",
              price: val,
              quantity: 1,
            },
          ],
        });

        onOrderSuccess();
      } else {
        alert(res.message || "Đã có lỗi xảy ra. Vui lòng gọi 0888 113 831 để giao ngay.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối mạng. Vui lòng bấm gọi 0888 113 831 để được hỗ trợ ngay!");
    } finally {
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  }

  const selectedKey = `${activeCategory}-${selectedProduct}`;

  return (
    <section id="order-form" className="py-14 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Cột Trái: Form Đặt Hàng 1 Chạm Cho Gia Đình */}
          <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl border-2 border-red-200 p-6 md:p-8">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="bg-[#DC2626] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                🏠 Đặt 1 chạm — Gọi lại 30 giây
              </span>
              <span className="text-xs font-bold text-emerald-700">+ Tặng vệ sinh bếp 0đ</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1.5">
              Đặt Đổi Bình Gas &amp; Bảo Dưỡng Bếp
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mb-5">
              Chỉ cần để lại <strong>Số Điện Thoại</strong> — Nhân viên chi nhánh gần nhà nhất sẽ gọi xác nhận nhẹ nhàng trong 30 giây!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <label className="text-xs md:text-sm font-bold text-slate-900 mb-2 block">
                  1. Chọn loại bình gas gia đình (Gom gọn dễ chọn):
                </label>

                <div className="relative">
                  <select
                    value={selectedKey}
                    onChange={handleDropdownChange}
                    className="w-full bg-white border-2 border-slate-200 rounded-xl px-3.5 py-3 text-sm md:text-base font-bold text-slate-900 focus:border-[#DC2626] outline-none appearance-none cursor-pointer pr-9"
                  >
                    {tabs.map((tab, cIdx) => (
                      <optgroup key={tab.label} label={tab.label}>
                        {tab.products.map((p, pIdx) => (
                          <option key={p.id} value={`${cIdx}-${pIdx}`}>
                            {p.name} — {p.exchangePrice}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    ▼
                  </div>
                </div>

                <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 rounded-lg px-2.5 py-1.5 mt-2 font-medium">
                  🔧 <strong>Không rành loại van?</strong> Thợ Gas Nhà Mình mang sẵn cả van phổ thông &amp; van chụp tự ngắt lắp vừa 100%!
                </p>
              </div>

              {isDanDung && product?.newPrice && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOption("exchange")}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs md:text-sm font-bold cursor-pointer ${
                      selectedOption === "exchange"
                        ? "border-[#DC2626] bg-red-50 text-[#DC2626]"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    🔄 Đổi ruột (Đã có vỏ bất kỳ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOption("new")}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs md:text-sm font-bold cursor-pointer ${
                      selectedOption === "new"
                        ? "border-[#DC2626] bg-red-50 text-[#DC2626]"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    📦 Lắp mới (Chưa có vỏ)
                  </button>
                </div>
              )}

              <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {selectedOption === "exchange" ? "Giá niêm yết trọn gói:" : "Tổng mua mới (gồm cọc vỏ):"}
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl md:text-3xl font-black text-[#DC2626]">{displayPrice}</span>
                      {selectedOption === "exchange" && product?.originalPrice && (
                        <span className="text-sm text-slate-400 line-through font-semibold">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg text-right">
                    {selectedOption === "exchange" ? "Đổi vỏ khác hãng 0đ" : "Có phiếu hoàn cọc 100%"}
                  </span>
                </div>
                {selectedOption === "exchange" && (
                  <p className="text-xs text-emerald-950 font-semibold mt-2 pt-2 border-t border-emerald-200/80">
                    ✓ Bếp đang dùng vỏ <strong>Saigon Petro, Petrolimex, Gia Đình...</strong> đổi ngang miễn phí 0đ — Tặng vệ sinh họng bếp &amp; đo máy dò khí gas!
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs md:text-sm font-bold text-slate-900 mb-1.5 block">
                  2. Nhập Số Điện Thoại gia đình nhận gas *:
                </label>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  placeholder="Nhập SĐT của bạn (VD: 0909 123 456)"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPhone(val);
                    if (typeof window !== "undefined" && val.trim().length >= 9) {
                      try {
                        localStorage.setItem("gas_customer_phone", val.trim());
                      } catch (_) {}
                    }
                  }}
                  className="w-full border-2 border-red-300 focus:border-[#DC2626] rounded-xl px-4 py-3.5 text-base font-bold text-slate-900 outline-none"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowMoreFields((v) => !v)}
                  className="text-xs font-bold text-[#DC2626] hover:underline cursor-pointer"
                >
                  {showMoreFields
                    ? "− Thu gọn ô địa chỉ"
                    : "+ Nhập trước tên chung cư / địa chỉ / dặn dò thợ (Không bắt buộc)"}
                </button>

                {showMoreFields && (
                  <div className="space-y-3 mt-3 pt-3 border-t border-slate-100">
                    <input
                      type="text"
                      placeholder="Tên anh/chị hoặc cô/chú nhận gas (Tùy chọn)"
                      value={name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setName(val);
                        if (typeof window !== "undefined" && val.trim().length >= 2) {
                          try {
                            localStorage.setItem("gas_customer_name", val.trim());
                          } catch (_) {}
                        }
                      }}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#DC2626]"
                    />
                    <input
                      type="text"
                      placeholder="Tên chung cư / Số nhà, đường, phường (Tùy chọn)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#DC2626]"
                    />
                    <input
                      type="text"
                      placeholder="Dặn thợ (VD: Vào hầm chung cư sảnh A, nhà có ông bà lớn tuổi...)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#DC2626]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-base md:text-lg py-4 px-6 rounded-2xl shadow-lg shadow-red-500/25 uppercase tracking-wide cursor-pointer disabled:opacity-70"
              >
                {submitting ? "Đang kết nối chi nhánh..." : "⚡ GỌI LẠI TRONG 30 GIÂY — GIAO TẬN BẾP"}
              </button>

              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushGtmEvent("click_zalo", {
                    phone: HOTLINE,
                    customerPhone: phone,
                    notes: "Khách bấm Gửi Định Vị Zalo trong OrderSection Gas Nhà Mình",
                  })
                }
                className="w-full py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#DC2626] font-bold text-xs md:text-sm flex items-center justify-center gap-2"
              >
                <span>📍</span> Gửi Định Vị Căn Hộ / Nhà Phố Qua Zalo
              </a>
            </form>
          </div>

          {/* Cột Phải: Cam kết 3 KHÔNG & Tổng Đài Bảo Vệ Gia Đình */}
          <div id="ba-khong" className="lg:col-span-6 space-y-6">
            <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 md:p-7">
              <div className="inline-flex items-center gap-1.5 bg-amber-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full mb-3 tracking-wider">
                ✓ An tâm tuyệt đối cho người nội trợ
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
                Cam Kết &ldquo;3 KHÔNG&rdquo; Khi Nhận Bình Tại Gian Bếp Gia Đình
              </h3>

              <div className="space-y-3.5">
                <div className="bg-white rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    01
                  </span>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Bật thử lửa đỏ / đen đáy nồi → KHÔNG NHẬN:</strong>{" "}
                    Thợ vệ sinh họng bếp miễn phí, chỉnh gió bật thử ngọn lửa xanh đều trước mặt gia đình mới bàn giao.
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    02
                  </span>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Màng co rách / Cân thiếu ký / Vỏ quá hạn PCCC → KHÔNG NHẬN:</strong>{" "}
                    Thợ mang sẵn <strong>cân móc điện tử cầm tay 50kg</strong> cân đối chiếu công khai <code>[Vỏ bình + 12kg ruột]</code>.
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    03
                  </span>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Đòi phí gửi xe hầm chung cư / phí vác lầu → KHÔNG TRẢ TIỀN:</strong>{" "}
                    Giá 530.000đ đã trọn gói giao lên tận căn hộ tầng cao hoặc nhà phố nhiều lầu.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-amber-200/80 text-center">
                <div className="bg-white/90 rounded-xl p-2.5 border border-amber-200/60">
                  <div className="text-lg">🏷️</div>
                  <div className="text-[11px] font-bold text-slate-900 mt-1">Tem Chống Giả QR</div>
                  <div className="text-[10px] text-slate-500">Hạn vỏ PCCC rõ ràng</div>
                </div>
                <div className="bg-white/90 rounded-xl p-2.5 border border-amber-200/60">
                  <div className="text-lg">⚖️</div>
                  <div className="text-[11px] font-bold text-slate-900 mt-1">Móc Cân Điện Tử</div>
                  <div className="text-[10px] text-slate-500">Chuẩn Vỏ + 12kg ruột</div>
                </div>
                <div className="bg-white/90 rounded-xl p-2.5 border border-amber-200/60">
                  <div className="text-lg">📟</div>
                  <div className="text-[11px] font-bold text-slate-900 mt-1">Máy Dò Rò Rỉ Khí</div>
                  <div className="text-[10px] text-slate-500">An toàn tuyệt đối</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-7">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block mb-1.5">
                Bảo vệ gia đình suốt quá trình nấu nướng
              </span>
              <h3 className="text-lg md:text-xl font-black mb-3">
                Vì Sao Các Gia Đình &amp; Cư Dân Chung Cư Chọn Đặt Qua Gas Nhà Mình?
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-black mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Khóa cứng giá niêm yết 530.000đ:</strong> Trạm liên kết giao tới thu đúng giá hệ thống, ông bà lớn tuổi ở nhà nhận bình không bao giờ lo bị hét giá.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-black mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Bảo hành kép 1 đầu mối ({HOTLINE}):</strong> Lưu lịch sử ngày thay dây/gioăng theo SĐT gia đình. Khi bếp bật khó cháy hay nghi có mùi gas, gọi 1 số duy nhất — kỹ thuật có mặt kiểm tra miễn phí trong 15 phút.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-black mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Tặng Nam Châm Tủ Lạnh chính chủ:</strong> Ghi rõ ngày lắp đặt, nhắn lại Zalo số cũ giảm ngay <strong>15.000đ</strong> cho bình kế tiếp sau 2 tháng.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onSelect }: { p: ProductItem; onSelect: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-shadow group flex flex-col justify-between h-full">
      <div>
        <Link
          href={`/${p.slug}`}
          className="bg-gradient-to-br from-[#FFF5F5] to-[#F8FAFC] aspect-square w-full flex items-center justify-center overflow-hidden relative select-none block"
          onContextMenu={(e) => e.preventDefault()}
          title={`Xem chi tiết ${p.name}`}
        >
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <WatermarkOverlay size="md" />
        </Link>
        <div className="p-5 pb-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${p.tagColor}`}>
            {p.tag}
          </span>
          <h3 className="font-black text-slate-900 mt-3 mb-1 text-base leading-snug">
            <Link href={`/${p.slug}`} className="hover:text-[#DC2626] transition-colors">
              {p.name}
            </Link>
          </h3>
          <p className="text-xs text-slate-500 mb-3">{p.valveNote}</p>
          <div className="mb-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Giá đổi ruột (Đổi vỏ khác hãng 0đ)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#DC2626]">{p.exchangePrice}</span>
              {p.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-semibold">{p.originalPrice}</span>
              )}
            </div>
          </div>
          {p.newPrice && (
            <div className="mb-2 text-xs text-slate-500">
              Chưa có vỏ bình: <strong className="text-slate-700">{p.newPrice}</strong>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 pt-3 space-y-2">
        <button
          type="button"
          onClick={onSelect}
          className="w-full py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-sm shadow-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>🏠</span> ĐẶT GIAO &amp; VỆ SINH BẾP
        </button>
        <Link href={`/${p.slug}`} className="block text-center text-xs font-bold text-[#DC2626] hover:underline py-1">
          Xem thông số an toàn bình →
        </Link>
      </div>
    </div>
  );
}

function PricingSection({
  tabs,
  onSelectProduct,
}: {
  tabs: TabItem[];
  onSelectProduct: (catIdx: number, prodIdx: number) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const products = tabs[activeTab]?.products || tabs[0].products;

  const handleSelectFromTable = (productSlug: string) => {
    for (let c = 0; c < tabs.length; c++) {
      const pIdx = tabs[c].products.findIndex((p) => p.slug === productSlug);
      if (pIdx !== -1) {
        onSelectProduct(c, pIdx);
        return;
      }
    }
    onSelectProduct(0, 0);
  };

  return (
    <section id="bang-gia" className="bg-[#F8FAFC] py-16 md:py-20 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <GasPriceTable brandName="Gas Nhà Mình" onSelectProduct={handleSelectFromTable} showDetailLink={true} />

        <div className="mt-14 pt-12 border-t border-slate-200">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2 block">
              Tuyển chọn an toàn cho gian bếp
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              Các Dòng Bình Chính Hãng Gia Đình Tin Dùng Nhất
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all cursor-pointer ${
                  activeTab === i
                    ? "bg-[#DC2626] border-[#DC2626] text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-800 hover:border-[#DC2626]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} p={p} onSelect={() => onSelectProduct(activeTab, i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: "🏢",
      title: "Đăng ký hầm chung cư / Vào nhà lễ phép",
      desc: "Kỹ thuật viên mặc đồng phục, tự làm thủ tục sảnh bảo vệ và dùng xe đẩy êm ái lên tận căn hộ trong 15 phút.",
    },
    {
      num: "02",
      icon: "⚖️",
      title: "Cân móc điện tử 50kg đối chứng",
      desc: "Kiểm tra màng co QR, hạn đăng kiểm trên quai bình và móc cân điện tử đủ [Vỏ + 12kg ruột] ngay trước mặt gia đình.",
    },
    {
      num: "03",
      icon: "📟",
      title: "Đo máy dò rò rỉ & Thay gioăng 0đ",
      desc: "Dùng máy dò khí gas chuyên dụng kiểm tra kỹ cổ van điều áp và đường ống dẫn gas chống chuột.",
    },
    {
      num: "04",
      icon: "✨",
      title: "Vệ sinh họng bếp & Chỉnh lửa xanh",
      desc: "Làm sạch mâm chia lửa, bật thử hai bếp cháy xanh đều không đen đáy nồi rồi mới dán tem bảo hành và nhận tiền.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2 block">
            Tỉ mỉ từng chi tiết – An tâm cả nhà
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Quy Trình 4 Bước Chăm Sóc Gian Bếp Chuẩn PCCC
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-[#DC2626] flex items-center justify-center text-2xl mb-4">
                {s.icon}
              </div>
              <span className="text-xs font-black text-[#DC2626] tracking-widest mb-1">BƯỚC {s.num}</span>
              <h3 className="font-black text-slate-900 mb-2 text-base">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCarousel({
  reviews,
}: {
  reviews: { name: string; location: string; avatar: string; stars: number; tag: string; text: string }[];
}) {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="relative">
      <div className="hidden md:grid grid-cols-3 gap-5">
        {[0, 1, 2].map((offset) => {
          const r = reviews[(current + offset) % total];
          return (
            <div key={offset} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-500 text-lg">{"★".repeat(r.stars)}</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#DC2626] px-2.5 py-1 rounded-full">
                  {r.tag}
                </span>
              </div>
              <p className="text-slate-800 text-sm leading-relaxed mb-5 flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-black text-[#DC2626] text-base flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-slate-500 text-xs">{r.location}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:hidden">
        {(() => {
          const r = reviews[current];
          return (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-500 text-lg">{"★".repeat(r.stars)}</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#DC2626] px-2.5 py-1 rounded-full">
                  {r.tag}
                </span>
              </div>
              <p className="text-slate-800 text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-black text-[#DC2626] text-base flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-slate-500 text-xs">{r.location}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? "bg-[#DC2626] w-6" : "bg-slate-300 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
}

function TrustSection() {
  const reviews = [
    {
      name: "Chị Lan Phương",
      location: "Chung cư Sunrise City, Quận 7",
      avatar: "L",
      stars: 5,
      tag: "Căn hộ chung cư",
      text: "Thợ tự đăng ký sảnh bảo vệ mang bình lên tận căn hộ, móc cân điện tử đủ ký rồi dùng máy dò kiểm tra van dây rất kỹ mới về.",
    },
    {
      name: "Bác Thanh Bình",
      location: "Đường Phan Xích Long, Phú Nhuận",
      avatar: "B",
      stars: 5,
      tag: "Người lớn tuổi",
      text: "Nhà chỉ có hai ông bà già, cháu giao gas ăn nói lễ phép, tháo họng bếp ra vệ sinh sạch muội đen giúp lửa cháy xanh hẳn lên.",
    },
    {
      name: "Chị Mai Hương",
      location: "Chung cư Vinhomes Central Park, Bình Thạnh",
      avatar: "M",
      stars: 5,
      tag: "Đổi vỏ khác hãng 0đ",
      text: "Bếp cũ đang dùng vỏ hãng khác đổi ngang sang V-Gas 530k không mất tiền cọc vỏ, rẻ hơn đại lý cũ gần 70 ngàn mà dịch vụ chu đáo hơn nhiều.",
    },
    {
      name: "Anh Hoàng Nam",
      location: "KDC Him Lam, Chánh Hưng, Quận 8",
      avatar: "H",
      stars: 5,
      tag: "Hộ gia đình",
      text: "Để lại SĐT 30 giây là tổng đài gọi xác nhận, tầm 12 phút thợ đã gõ cửa. Cân bình đối chứng chuẩn 12kg ruột, có dán nam châm nhắc lịch.",
    },
    {
      name: "Cô Mỹ Hạnh",
      location: "Đường Nguyễn Oanh, Gò Vấp",
      avatar: "H",
      stars: 5,
      tag: "Nhà phố gia đình",
      text: "Ưng nhất là cam kết bật thử lửa xanh mới trả tiền. Bình mới sạch sẽ, hạn kiểm định vỏ còn xa nên nấu nướng cho cháu nhỏ rất yên tâm.",
    },
  ];

  return (
    <section id="cam-ket" className="py-16 md:py-20 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2 block">
            Phản hồi từ các gia đình &amp; chung cư
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900">
            Sự An Tâm Của Người Nội Trợ Là Thước Đo Số 1
          </h2>
        </div>
        <ReviewCarousel reviews={reviews} />
      </div>
    </section>
  );
}

function CoverageMapCard() {
  const primaryHubs = [
    { name: "CN Quận 8", x: 210, y: 245 },
    { name: "CN Tân Phú", x: 145, y: 150 },
    { name: "CN Quận 6", x: 145, y: 215 },
    { name: "CN Bà Điểm", x: 110, y: 100 },
    { name: "CN Tân Hiệp", x: 75, y: 45 },
  ];

  const partnerNodes = [
    { name: "Trạm Gò Vấp", x: 245, y: 82 },
    { name: "Trạm Bình Thạnh", x: 305, y: 122 },
    { name: "Trạm Thủ Đức", x: 390, y: 138 },
    { name: "Trạm Quận 7", x: 305, y: 255 },
    { name: "Trạm Phú Nhuận/Q.3", x: 255, y: 175 },
    { name: "Trạm Quận 12", x: 190, y: 78 },
  ];

  return (
    <div className="bg-[#0B1528] rounded-3xl border border-slate-700/60 shadow-xl p-4 sm:p-6 text-white flex flex-col justify-between overflow-hidden relative select-none">
      <div className="flex items-center justify-between mb-2 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Xuất bình từ trạm cách nhà bạn &lt; 2km
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white mt-1">
            5 Chi Nhánh + 30+ Đại Lý Liên Kết Phủ Khắp Chung Cư TP.HCM
          </h3>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/10">
          ⚡ 15 Phút
        </span>
      </div>

      <div className="relative w-full aspect-[500/310] bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden my-2">
        <svg viewBox="0 0 500 310" className="w-full h-full">
          <defs>
            <pattern id="map-grid-gnm" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid-gnm)" />
          <path
            d="M 360 0 C 330 40, 360 90, 320 140 C 290 180, 320 220, 290 270 C 270 300, 290 310, 300 310"
            fill="none"
            stroke="#DC2626"
            strokeOpacity="0.22"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <g stroke="#F87171" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.45">
            <line x1="145" y1="150" x2="255" y2="175" />
            <line x1="255" y1="175" x2="305" y2="122" />
            <line x1="305" y1="122" x2="390" y2="138" />
            <line x1="210" y1="245" x2="305" y2="255" />
            <line x1="110" y1="100" x2="190" y2="78" />
            <line x1="190" y1="78" x2="245" y2="82" />
            <line x1="245" y1="82" x2="305" y2="122" />
            <line x1="145" y1="150" x2="145" y2="215" />
            <line x1="145" y1="215" x2="210" y2="245" />
            <line x1="75" y1="45" x2="110" y2="100" />
          </g>

          {partnerNodes.map((n, idx) => (
            <g key={idx}>
              <circle cx={n.x} cy={n.y} r="24" fill="rgba(16,185,129,0.14)" />
              <circle cx={n.x} cy={n.y} r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x={n.x} y={n.y - 9} textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="700">
                {n.name}
              </text>
            </g>
          ))}

          {primaryHubs.map((h, i) => (
            <g key={i}>
              <circle cx={h.x} cy={h.y} r="30" fill="rgba(239,68,68,0.18)" />
              <circle cx={h.x} cy={h.y} r="5.5" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.5" />
              <text x={h.x} y={h.y + 15} textAnchor="middle" fill="#F8FAFC" fontSize="8.5" fontWeight="800">
                📍 {h.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2 text-[10px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span> 5 Chi nhánh trung tâm
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 30+ Đại lý chuẩn PCCC liên kết
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 my-2 text-center">
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-2">
          <div className="text-sm sm:text-base font-black text-amber-400">&lt; 2km</div>
          <div className="text-[10px] text-slate-400">Kho cách nhà bạn</div>
        </div>
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-2">
          <div className="text-sm sm:text-base font-black text-emerald-400">35+ Điểm</div>
          <div className="text-[10px] text-slate-400">Chi nhánh &amp; liên kết</div>
        </div>
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-2">
          <div className="text-sm sm:text-base font-black text-red-400">Máy Dò Gas</div>
          <div className="text-[10px] text-slate-400">Kiểm định 100% đơn</div>
        </div>
      </div>

      <a
        href={HOTLINE_TEL}
        onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs sm:text-sm tracking-wide shadow-md mt-1"
      >
        <PhoneIcon size={16} />
        <span>GỌI TRẠM CHĂM SÓC BẾP GẦN NHẤT: {HOTLINE}</span>
      </a>
    </div>
  );
}

function ServiceAreaSection() {
  return (
    <section id="khu-vuc" className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2 block">
            Mạng lưới liên kết sát từng khu dân cư
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            Điều Phối Hơn 30 Cửa Hàng Đại Lý Chuẩn PCCC Khắp 22 Quận Huyện &amp; TP. Thủ Đức
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Dù gia đình bạn ở khu căn hộ Quận 7, Bình Thạnh, Thảo Điền – Thủ Đức, Phú Nhuận hay Gò Vấp, bình gas luôn được xuất từ điểm liên kết <strong>cách nhà dưới 2km</strong> để giao kịp bữa cơm trong 15 phút.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-slate-600 mb-4 text-sm font-semibold">
                Chọn khu vực của gia đình bạn để xem trạm phụ trách:
              </p>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS_DATA.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/giao-gas/${d.slug}`}
                    title={`Đổi gas gia đình ${d.name} giao ${d.slaMinutes} phút`}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-[#DC2626] hover:bg-red-50 hover:text-[#DC2626] transition-all rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    Giao gas {d.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50/70 rounded-2xl border border-red-200">
              <p className="text-xs sm:text-sm text-red-950 font-semibold leading-relaxed">
                🏢 <strong>Cư dân chung cư cần đăng ký sảnh/thang hàng?</strong> Chỉ cần gửi vị trí qua{" "}
                <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="text-[#DC2626] underline font-black">
                  Zalo {HOTLINE}
                </a>{" "}
                — kỹ thuật viên khu vực đã quen quy trình ban quản lý từng tòa nhà!
              </p>
            </div>
          </div>
          <CoverageMapCard />
        </div>
      </div>
    </section>
  );
}

const STORES_LIST = [
  {
    id: 1,
    branch: "Chi nhánh Quận 8",
    name: "Trạm Chăm Sóc Bếp Phạm Thế Hiển – Q.8",
    address: "1009 Phạm Thế Hiển, Phường Chánh Hưng, Quận 8, TP.HCM",
    coverage: "Phục vụ Quận 8, Quận 7 (Him Lam, Sunrise), Quận 5, Quận 4, Trung Sơn",
    districtUrl: "/giao-gas/quan-8",
  },
  {
    id: 2,
    branch: "Chi nhánh Tân Phú",
    name: "Trạm Chăm Sóc Bếp Phú Thọ Hòa – Tân Phú",
    address: "36 Nguyễn Văn Huyên, Phường Phú Thọ Hòa, Quận Tân Phú, TP.HCM",
    coverage: "Phục vụ Celadon Tân Phú, Tân Bình, Quận 11, Quận 10, Bình Tân",
    districtUrl: "/giao-gas/tan-phu",
  },
  {
    id: 3,
    branch: "Chi nhánh Quận 6",
    name: "Trạm Chăm Sóc Bếp Cư Xá Bình Phú – Q.6",
    address: "14R Đường 32B Cư Xá Bình Phú, Phường 10, Quận 6, TP.HCM",
    coverage: "Phục vụ Quận 6, Khu Tên Lửa – Bình Tân, Quận 5, Quận 11",
    districtUrl: "/giao-gas/quan-6",
  },
  {
    id: 4,
    branch: "Chi nhánh Quận 12 & Bà Điểm",
    name: "Trạm Chăm Sóc Bếp Bà Điểm – Hóc Môn & Q.12",
    address: "64A Nguyễn Thị Hai, Xã Bà Điểm, Huyện Hóc Môn, TP.HCM",
    coverage: "Phục vụ Quận 12, Hiệp Thành, Tân Thới Nhất, Bà Điểm Hóc Môn",
    districtUrl: "/giao-gas/quan-12",
  },
  {
    id: 5,
    branch: "Chi nhánh Tân Hiệp",
    name: "Trạm Chăm Sóc Bếp Tân Hiệp – Hóc Môn",
    address: "111/7H Ấp Thới Tây 2, Tân Hiệp 18, Xã Tân Hiệp, Huyện Hóc Môn",
    coverage: "Phục vụ Thị trấn Hóc Môn, Đông Thạnh, Thới Tam Thôn",
    districtUrl: "/giao-gas/hoc-mon",
  },
];

function StoresSection({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section id="he-thong-cua-hang" className="py-16 md:py-20 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-[#DC2626] mb-3">
            5 Chi nhánh chính hãng + 30+ Đại lý PCCC liên kết
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-3">
            Hệ Thống Cửa Hàng Thật &amp; Trạm Liên Kết Sát Khu Căn Hộ Của Bạn
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Kết hợp 5 chi nhánh trực thuộc với hơn 30 đại lý chuẩn PCCC tại{" "}
            <strong>Bình Thạnh, Phú Nhuận, Gò Vấp, Quận 7, TP. Thủ Đức, Quận 1, Quận 3</strong> — tất cả đều tuân thủ quy chuẩn mang cân điện tử &amp; máy dò khí gas của Gas Nhà Mình.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STORES_LIST.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#DC2626] shadow-2xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Link
                    href={store.districtUrl}
                    className="px-3 py-1 bg-red-50 text-[#DC2626] border border-red-200 rounded-full text-xs font-bold"
                  >
                    {store.branch}
                  </Link>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    ● Sẵn sàng giao
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">
                  <Link href={store.districtUrl} className="hover:text-[#DC2626]">
                    {store.name}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 mb-2">📍 {store.address}</p>
                <p className="text-xs text-slate-600 mb-4">🏠 {store.coverage}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={HOTLINE_TEL}
                  onClick={() => pushGtmEvent("click_call", { phone: HOTLINE })}
                  className="flex-1 py-2.5 px-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-xl text-center"
                >
                  📞 Gọi Trạm Này
                </a>
                <button
                  type="button"
                  onClick={onOrderClick}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Đặt 1 Chạm
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-[#991B1B] via-[#B91C1C] to-[#DC2626] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <span className="inline-block text-[11px] font-black uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full mb-3">
                Phủ sóng khu căn hộ &lt; 2km
              </span>
              <h3 className="text-lg font-black mb-2">
                +30 Trạm Liên Kết Chung Cư Khu Đông – Nam – Trung Tâm
              </h3>
              <p className="text-white/90 text-xs leading-relaxed mb-3">
                Phục vụ nhanh 15 phút tại <strong>Vinhomes Bình Thạnh, Thảo Điền – Thủ Đức, Phú Mỹ Hưng Q.7, Cityland Gò Vấp, Phú Nhuận, Q.1 – Q.3</strong>.
              </p>
              <ul className="space-y-1.5 text-xs text-white/95">
                <li>✓ Khóa cứng giá gia đình 530.000đ</li>
                <li>✓ Cân móc điện tử 50kg &amp; Máy dò rò rỉ</li>
                <li>✓ Miễn phí vệ sinh họng bếp lửa xanh</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/20 mt-4">
              <a href={HOTLINE_TEL} className="text-lg font-black text-white hover:underline flex items-center gap-2">
                <PhoneIcon size={18} /> Tổng đài: {HOTLINE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS_LIST = [
  {
    q: "Thợ giao tới có mang cân kiểm tra đủ 12kg ruột ngay tại bếp không?",
    a: "Có 100%! Nhà dân thường không có sẵn cân lớn nên kỹ thuật viên Gas Nhà Mình luôn mang theo cân móc điện tử cầm tay 50kg để cân đối chứng trực tiếp tại bếp: Tổng số cân = [Trọng lượng vỏ dập nổi trên quai bình] + [Đủ 12kg nước gas]. Gia đình kiểm tra đủ ký, bật thử bếp lửa xanh đều mới thanh toán.",
  },
  {
    q: "Bếp nhà tôi đang dùng vỏ Saigon Petro / Petrolimex đổi sang V-Gas 530.000đ có tốn cọc vỏ không?",
    a: "Hoàn toàn KHÔNG tốn tiền cọc vỏ! Gas Nhà Mình hỗ trợ đổi ngang miễn phí 0đ giữa tất cả các thương hiệu vỏ bình 12kg chính hãng còn hạn kiểm định PCCC. Gia đình chỉ thanh toán đúng 530.000đ tiền ruột gas.",
  },
  {
    q: "Nhà tôi ở căn hộ chung cư tầng cao hoặc chỉ có ông bà lớn tuổi ở nhà thì giao thế nào?",
    a: "Đội ngũ kỹ thuật viên Gas Nhà Mình mặc đồng phục lịch sự, quen thuộc quy trình đăng ký thẻ sảnh bảo vệ và có xe đẩy vào hầm thang hàng chung cư (hoàn toàn miễn phí vận chuyển lên tầng). Khi nhà có ông bà lớn tuổi, thợ hỗ trợ tháo lắp nhẹ nhàng, đo máy dò khí gas, vệ sinh họng bếp và hướng dẫn khóa van an toàn.",
  },
  {
    q: "Ở Bình Thạnh, Gò Vấp, Quận 7 hay TP. Thủ Đức gọi bao lâu có mặt? Sau khi lắp nếu bếp lửa yếu gọi ai?",
    a: "Ngoài 5 chi nhánh chính, tổng đài điều phối hơn 30 đại lý liên kết chuẩn PCCC khắp 22 quận huyện & TP. Thủ Đức (xuất bình cách nhà bạn dưới 2km) nên chỉ 15–20 phút là có mặt. Hệ thống lưu bảo hành theo SĐT gia đình qua 1 đầu mối duy nhất 0888 113 831 — bất cứ khi nào cần chỉnh lửa hay kiểm tra mùi gas, gọi là kỹ thuật tới hỗ trợ miễn phí trong 15 phút.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2 block">
            Giải đáp thắc mắc của người nội trợ
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Câu Hỏi Thường Gặp Khi Đổi Gas Gia Đình
          </h2>
        </div>
        <div className="space-y-4">
          {FAQS_LIST.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base md:text-lg font-black text-slate-900 mb-2 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-100 text-[#DC2626] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  ?
                </span>
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-9">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#DC2626]">
                Mẹo hay cho người nội trợ
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                Cẩm Nang Chăm Sóc Gian Bếp &amp; Sử Dụng Gas An Toàn
              </h3>
            </div>
            <Link href="/cam-nang" className="text-xs md:text-sm font-extrabold text-[#DC2626] hover:underline shrink-0">
              Xem toàn bộ cẩm nang →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES_DATA.map((g) => (
              <Link
                key={g.slug}
                href={`/cam-nang/${g.slug}`}
                className="p-4 rounded-2xl bg-white hover:bg-red-50/50 border border-slate-200 hover:border-[#DC2626] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#DC2626]">
                    {g.heroIcon} {g.categoryLabel}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors mt-1.5 mb-2 leading-snug">
                    {g.title}
                  </h4>
                </div>
                <span className="text-xs font-semibold text-[#DC2626]">Xem hướng dẫn →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D1117] text-white py-12 pb-24 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="Gas Nhà Mình" className="h-14 w-auto object-contain bg-white rounded-xl p-2" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Dịch vụ đổi bình gas chính hãng chăm sóc gian bếp hộ gia đình &amp; căn hộ chung cư TP.HCM. Cân điện tử tại bếp, đo rò rỉ bằng máy chuyên dụng, vệ sinh họng bếp miễn phí.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                ☎️ Tổng đài chăm sóc bếp:{" "}
                <a href={HOTLINE_TEL} className="text-red-400 font-bold text-sm">
                  {HOTLINE}
                </a>
              </div>
              <div>🕐 Phục vụ: 06:00 – 22:00 mỗi ngày (Kể cả Lễ &amp; Tết)</div>
              <div>🏠 Mạng lưới: 5 Chi nhánh + 30+ Trạm liên kết toàn TP.HCM</div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wider text-red-400">
              5 Chi Nhánh Chính Hãng &amp; Hơn 30 Trạm Liên Kết Chung Cư
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">📍 Chi nhánh Quận 8</div>
                <div>1009 Phạm Thế Hiển, P. Chánh Hưng, Q.8</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">📍 Chi nhánh Tân Phú</div>
                <div>36 Nguyễn Văn Huyên, P. Phú Thọ Hòa, Tân Phú</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">📍 Chi nhánh Quận 6</div>
                <div>14R Đường 32B Cư Xá Bình Phú, P.10, Q.6</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">📍 Chi nhánh Bà Điểm &amp; Tân Hiệp</div>
                <div>64A Nguyễn Thị Hai &amp; 111/7H Tân Hiệp 18, Hóc Môn</div>
              </div>
              <div className="bg-red-950/50 p-3 rounded-xl border border-red-500/30 sm:col-span-2 text-red-200">
                <strong>🏢 +30 Trạm liên kết khu căn hộ:</strong> Quận 7 (Phú Mỹ Hưng, Sunrise), Bình Thạnh (Vinhomes), TP. Thủ Đức (Masteri, Thảo Điền), Gò Vấp (Cityland), Phú Nhuận, Q.1, Q.3 — Xuất bình dưới 2km!
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-slate-400">
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-3 text-red-400">Bảng giá gia đình</h4>
            <ul className="space-y-2">
              <li><Link href="/bang-gia" className="hover:text-white">🔥 Bảng giá gas hôm nay (530K)</Link></li>
              <li><Link href="/gas-v-gas-xam-12kg" className="hover:text-white">V-Gas 12kg Van Phổ Thông — 530.000đ</Link></li>
              <li><Link href="/gas-v-gas-shell-12kg" className="hover:text-white">V-Gas 12kg Van Chụp Tự Ngắt — 545.000đ</Link></li>
              <li><Link href="/gas-v-gas-pe-12kg" className="hover:text-white">V-Gas Bọc Nhựa PE Êm Sàn Chung Cư</Link></li>
              <li><Link href="/gas-petrolimex-dung-12kg" className="hover:text-white">Gas Petrolimex 12kg — 595.000đ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-3 text-red-400">An toàn bếp gia đình</h4>
            <ul className="space-y-2">
              <li><Link href="/cam-nang" className="hover:text-white">📚 Cẩm nang chăm sóc gian bếp</Link></li>
              <li><Link href="/cam-nang/cach-kiem-tra-binh-gas-chinh-hang-du-ky" className="hover:text-white">5 Cách kiểm tra bình gas đủ ký</Link></li>
              <li><Link href="/cam-nang/co-nen-khoa-binh-gas-sau-khi-nau-khong-quy-trinh-tat-bep-an-toan" className="hover:text-white">Quy trình khóa van an toàn cho người già</Link></li>
              <li><Link href="/cam-nang/nguyen-nhan-bep-gas-lua-do-den-day-noi" className="hover:text-white">Cách khắc phục bếp lửa đỏ đen nồi</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold uppercase tracking-wider mb-3 text-red-400">Khu vực phục vụ nhanh</h4>
            <ul className="space-y-2">
              <li><Link href="/giao-gas/quan-7" className="hover:text-white">🏠 Đổi gas căn hộ Quận 7</Link></li>
              <li><Link href="/giao-gas/binh-thanh" className="hover:text-white">🏠 Đổi gas chung cư Bình Thạnh</Link></li>
              <li><Link href="/giao-gas/thu-duc" className="hover:text-white">🏠 Đổi gas TP. Thủ Đức (Q.2, Q.9)</Link></li>
              <li><Link href="/giao-gas/go-vap" className="hover:text-white">🏠 Đổi gas gia đình Gò Vấp</Link></li>
              <li><Link href="/giao-gas/tan-phu" className="hover:text-white">🏠 Đổi gas Quận 8 &amp; Tân Phú</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} GAS NHÀ MÌNH — Hết gas, gọi Nhà Mình. Chăm sóc gian bếp gia đình TP.HCM.</div>
          <div>Đạt chuẩn kinh doanh LPG &amp; PCCC theo Nghị định 87/2018/NĐ-CP</div>
        </div>
      </div>
    </footer>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs" onClick={onClose}>
      <div className="bg-white rounded-3xl p-7 max-w-sm w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="24" viewBox="0 0 36 28" fill="none">
            <path d="M3 14L13 24L33 3" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">ĐÃ NHẬN SĐT GIA ĐÌNH!</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          Nhân viên chăm sóc bếp đang gọi lại trong <strong className="text-slate-900">30 giây</strong> để xác nhận địa chỉ và điều thợ mang cân điện tử + máy dò khí gas tới phục vụ gia đình.
        </p>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 border border-red-200 text-[#DC2626] font-bold rounded-xl mb-2.5 text-sm"
        >
          📍 Gửi luôn Vị Trí qua Zalo cho tiện
        </a>
        <a
          href={HOTLINE_TEL}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#DC2626] text-white font-bold rounded-xl mb-3 text-sm"
        >
          <PhoneIcon size={16} /> Cần gấp? Bấm gọi {HOTLINE}
        </a>
        <button onClick={onClose} className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer">
          Đóng cửa sổ
        </button>
      </div>
    </div>
  );
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function FloatingContactButtons() {
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-2.5 items-end">
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => pushGtmEvent("click_zalo", { phone: HOTLINE, notes: "Khách bấm Gửi Định Vị Zalo nút nổi" })}
        className="flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold px-4 py-3 rounded-full shadow-lg"
      >
        <span>📍</span>
        <span className="text-xs md:text-sm">Gửi Định Vị Zalo (Khỏi gõ địa chỉ)</span>
      </a>
    </div>
  );
}

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://gasnhaminh.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ Gas Nhà Mình",
          item: "https://gasnhaminh.com",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://gasnhaminh.com/#pricelist",
      name: "Bảng Giá Gas Gia Đình & Chung Cư Hôm Nay – Gas Nhà Mình",
      description: "Báo giá đổi bình gas 12kg chính hãng (V-Gas 530.000đ, Petrolimex 595.000đ) kèm gói vệ sinh họng bếp và đo rò rỉ bằng máy miễn phí",
      itemListElement: SEO_PRODUCTS.map((prod, idx) =>
        createProductSchema({
          position: idx + 1,
          name: prod.name,
          description: prod.desc,
          image: prod.image || "https://gasnhaminh.com/hero_gasnhaminh.jpg",
          sku: prod.slug,
          brand: prod.brand,
          url: `https://gasnhaminh.com/${prod.slug}`,
          price: prod.priceVal,
          sellerName: "Gas Nhà Mình",
        })
      ),
    },
    {
      "@type": "FAQPage",
      "@id": "https://gasnhaminh.com/#faq",
      mainEntity: FAQS_LIST.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

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
        setTimeout(() => phoneInput.focus(), 350);
      }
    }
  }

  function scrollToPricing() {
    const el = document.getElementById("bang-gia");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function handleProductSelect(catIdx: number, prodIdx: number) {
    setActiveCategory(catIdx);
    setSelectedProduct(prodIdx);
    scrollToForm();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <div className="min-h-screen bg-white text-slate-900">
        <Header />
        <HeroSection onOrderSuccess={() => setShowSuccess(true)} onScrollToPricing={scrollToPricing} />
        <PricingSection tabs={tabs} onSelectProduct={handleProductSelect} />
        <OrderSection
          tabs={tabs}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onOrderSuccess={() => setShowSuccess(true)}
        />
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
    </>
  );
}
