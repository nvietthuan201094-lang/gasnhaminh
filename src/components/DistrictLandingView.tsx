"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DistrictInfo,
  DISTRICTS_DATA,
  BRAND_NAME,
  BRAND_TAGLINE,
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  ZALO_URL,
  SEO_PRODUCTS,
  SeoProductItem,
} from "@/lib/districts";
import { createOrder, trackInteractionApi } from "@/lib/api";
import { trackGoogleAdsPurchase } from "@/lib/tracking";
import { WATERMARK_LOGO_SRC } from "@/lib/watermark";

function PhoneIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function WatermarkOverlay({
  hotline = HOTLINE_DISPLAY,
  hotlineTel = HOTLINE_TEL,
}: {
  size?: string;
  hotline?: string;
  hotlineTel?: string;
}) {
  return (
    <>
      {/* Top Left: Logo goodGas STORE */}
      <div className="absolute top-2 left-2 z-10 pointer-events-none select-none">
        <div className="bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-slate-100 flex items-center">
          <img
            src={WATERMARK_LOGO_SRC}
            alt="goodGas STORE"
            className="h-4 sm:h-5 w-auto object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Top Right: 100% Chính Hãng */}
      <div className="absolute top-2 right-2 z-10 pointer-events-none select-none">
        <span className="inline-flex items-center gap-1 bg-red-50/95 text-[#E02424] border border-red-200 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E02424]"></span>
          100% Chính Hãng
        </span>
      </div>

      {/* Bottom Right: Nút Gọi Gas Hotline */}
      <div className="absolute bottom-2 right-2 z-10">
        <a
          href={hotlineTel}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 bg-[#E02424] hover:bg-[#B91C1C] active:scale-95 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md transition-all tracking-tight"
          title="Gọi giao gas hỏa tốc"
        >
          <PhoneIcon size={10} />
          <span>GỌI GAS: {hotline}</span>
        </a>
      </div>

      {/* Bottom Left: Giao 15 Phút */}
      <div className="absolute bottom-2 left-2 z-10 pointer-events-none select-none">
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-1 py-0.5 rounded shadow-2xs">
          ⚡ 15–20P
        </span>
      </div>
    </>
  );
}

interface DistrictLandingViewProps {
  district: DistrictInfo;
}

export default function DistrictLandingView({ district }: DistrictLandingViewProps) {
  const [productsList, setProductsList] = useState<SeoProductItem[]>(SEO_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<SeoProductItem>(SEO_PRODUCTS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [actionType, setActionType] = useState<"exchange" | "new">("exchange");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(`[${district.name}] `);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    import("@/lib/api").then(m => m.fetchDynamicGasPrices()).then(dynamicData => {
      if (dynamicData && dynamicData.length > 0) {
        setProductsList(dynamicData);
        setSelectedProduct(prev => dynamicData.find(p => p.slug === prev.slug) || dynamicData[0]);
      }
    }).catch(console.error);
  }, []);

  const neighboringDistricts = DISTRICTS_DATA.filter((d) =>
    district.neighboringSlugs.includes(d.slug)
  );

  const filteredProducts = activeCategoryFilter === "all"
    ? productsList
    : productsList.filter((p) => p.category === activeCategoryFilter);

  async function handleOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Vui lòng nhập đầy đủ Tên, Số điện thoại và Địa chỉ giao hàng.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createOrder({
        productId: selectedProduct.id,
        slug: selectedProduct.slug,
        quantity: 1,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        districtCode: district.slug,
        note: `[Khu vực: ${district.name}] [Sản phẩm: ${selectedProduct.name}] ${note} (${actionType === "exchange" ? "Đổi bình" : "Mua trọn bộ cả vỏ"})`,
        cylinderAction: actionType,
      });

      if (res.success) {
        const orderId = res.orderName || res.orderId || `DISTRICT-${Date.now()}`;
        const finalPrice = (actionType === "new" ? selectedProduct.newPriceVal : selectedProduct.priceVal) || selectedProduct.priceVal || 0;

        // Fire Google Ads Conversion & GA4 Ecommerce Purchase strictly after backend confirmation
        trackGoogleAdsPurchase({
          transactionId: orderId,
          value: finalPrice,
          currency: "VND",
          items: [
            {
              id: selectedProduct.id,
              name: selectedProduct.name,
              category: selectedProduct.category,
              price: finalPrice,
              quantity: 1,
            },
          ],
        });

        setOrderSuccess(res.orderName || res.orderId || "Thành công");
      } else {
        alert(res.message || "Không thể gửi đơn hàng, vui lòng gọi Hotline trực tiếp.");
      }
    } catch {
      alert("Lỗi kết nối. Vui lòng gọi trực tiếp Hotline để giao gas nhanh nhất!");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSelectProductCard(product: SeoProductItem) {
    setSelectedProduct(product);
    document.getElementById("order-form-box")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      {/* Top Notification Bar */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4 text-center font-medium">
        ⚡ Giao gas, đặt gas siêu tốc tại <strong className="text-amber-400">{district.fullName}</strong> trong{" "}
        <strong className="text-amber-400">{district.slaMinutes} phút</strong> – Nguyên tem chống giả!
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Gas Nhà Mình Logo" className="h-10 w-auto object-contain" />
            <div>
              <span className="text-xl font-black tracking-tight text-red-600">{BRAND_NAME}</span>
              <span className="hidden sm:inline-block text-xs font-semibold text-neutral-500 ml-2">
                | {district.name}
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackInteractionApi('click_zalo', {
                  district: district.name,
                  phone: HOTLINE_DISPLAY,
                  notes: `Khách bấm Chat Zalo từ header trang ${district.name}`,
                });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100 transition-colors"
            >
              💬 Nhắn Zalo
            </a>
            <a
              href={HOTLINE_TEL}
              onClick={() => {
                trackInteractionApi('click_call', {
                  district: district.name,
                  phone: HOTLINE_DISPLAY,
                  notes: `Khách bấm Gọi Hotline từ header trang ${district.name}`,
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md transition-colors"
            >
              📞 Gọi: {HOTLINE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full text-xs text-neutral-500">
        <Link href="/" className="hover:text-red-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href="/#khu-vuc" className="hover:text-red-600">Mạng lưới giao gas TP.HCM</Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-neutral-800">Giao gas {district.name}</span>
      </div>

      {/* Hero Section with Form */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-white to-neutral-50 py-10 lg:py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content (SEO Focus) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                📍 {district.hubName}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight mb-4">
                Đại Lý Giao Gas, Đặt Gas <span className="text-red-600">{district.name}</span> – Có Mặt Sau {district.slaMinutes} Phút
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 mb-6 leading-relaxed">
                {district.description} Hệ thống Gas Nhà Mình phân phối bình gas V-Gas, Petrolimex, Tuấn Khang 12kg và gas bò 45kg cho nhà hàng, quán ăn, xưởng chế biến 24/7.
              </p>

              {/* Highlights Badge */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3">
                  <span className="text-2xl">🏷️</span>
                  <div>
                    <div className="font-bold text-xs text-neutral-900">Chính Hãng 100%</div>
                    <div className="text-[11px] text-neutral-500">Nguyên tem chống giả</div>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <div className="font-bold text-xs text-neutral-900">An Toàn PCCC</div>
                    <div className="text-[11px] text-neutral-500">Kiểm tra rò rỉ miễn phí</div>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3 col-span-2 sm:col-span-1">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="font-bold text-xs text-neutral-900">{district.slaMinutes} Phút</div>
                    <div className="text-[11px] text-neutral-500">Trạm gas thường trực</div>
                  </div>
                </div>
              </div>

              {/* Phường Xã Coverage Section */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                    Khu vực giao nhanh tại {district.name}
                  </span>
                  {district.isInnerCity && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Khu vực nội thành TP.HCM
                    </span>
                  )}
                </div>

                {district.newWards && district.newWards.length > 0 && (
                  <div className="mb-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-xs font-bold text-amber-900 block mb-1.5">
                      ⭐ Các phường mới sáp nhập chính thức phục vụ siêu tốc:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {district.newWards.map((nw) => (
                        <span
                          key={nw}
                          className="inline-block text-[11px] font-semibold bg-white text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg"
                        >
                          ⚡ {nw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {district.popularWards.map((w) => (
                    <span
                      key={w}
                      className="inline-block text-xs bg-neutral-100 hover:bg-red-50 hover:text-red-700 text-neutral-700 font-medium px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {w}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-400 mt-3">
                  * Kỹ thuật viên Gas Nhà Mình có mặt tại mọi tuyến đường và chung cư khu vực {district.name}.
                </p>
              </div>
            </div>

            {/* Right Form (Quick Order Form) */}
            <div id="order-form-box" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-500/30 shadow-xl relative">
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Gas Nhà Mình Giao Nhanh
                </div>

                <h3 className="text-xl font-black text-neutral-900 mb-1">Đặt Gas / Đổi Bình Tận Nhà</h3>
                <p className="text-xs text-neutral-500 mb-5">
                  Cam kết bình chính hãng – Nguyên tem chống giả – An toàn tuyệt đối.
                </p>

                {orderSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="font-black text-emerald-800 text-lg mb-1">GỬI YÊU CẦU THÀNH CÔNG!</div>
                    <p className="text-xs text-emerald-700 mb-4">
                      Mã đơn: <strong>{orderSuccess}</strong>. Kho gas tại {district.name} đang chuẩn bị bình và giao trong {district.slaMinutes} phút.
                    </p>
                    <a
                      href={HOTLINE_TEL}
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:bg-emerald-700 transition-colors"
                    >
                      📞 Cần gấp? Bấm gọi {HOTLINE_DISPLAY}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    {/* Selected Product Selector */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Chọn loại bình gas cần đặt:
                      </label>
                      <select
                        value={selectedProduct.id}
                        onChange={(e) => {
                          const found = productsList.find((p) => p.id === e.target.value);
                          if (found) setSelectedProduct(found);
                        }}
                        className="w-full text-xs font-semibold bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red-500 text-neutral-800"
                      >
                        {productsList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {actionType === "exchange" ? p.price : (p.newPrice || p.price)} ({p.valveType})
                          </option>
                        ))}
                      </select>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
                        <span>Hãng: <strong className="text-neutral-700">{selectedProduct.brand}</strong></span>
                        <span className="text-red-600 font-bold">{selectedProduct.tag}</span>
                      </div>
                    </div>

                    {/* Action Type */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setActionType("exchange")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          actionType === "exchange"
                            ? "bg-red-50 border-red-600 text-red-700 shadow-sm"
                            : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        🔄 Đổi bình gas (Đã có vỏ)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActionType("new")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          actionType === "new"
                            ? "bg-red-50 border-red-600 text-red-700 shadow-sm"
                            : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        📦 Mua trọn bộ (Chưa có vỏ)
                      </button>
                    </div>

                    {/* Price summary badge */}
                    <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase font-bold block">
                          {actionType === "exchange" ? "Giá đổi bình gas:" : "Giá mua mới trọn bộ:"}
                        </span>
                        <span className="text-lg font-black text-red-600">
                          {actionType === "exchange" ? selectedProduct.price : (selectedProduct.newPrice || selectedProduct.price)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-600 bg-white border border-neutral-200 px-2.5 py-1 rounded-lg">
                        {actionType === "exchange" ? "🔄 Đã có vỏ bình" : "📦 Đã tính cọc vỏ"}
                      </span>
                    </div>

                    {/* Customer Inputs */}
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Họ và tên của bạn *"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Số điện thoại nhận gas *"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={`Số nhà, tên đường, Phường tại ${district.name} *`}
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ghi chú thêm (VD: Giao lầu 2, gọi trước 5 phút...)"
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black text-sm tracking-wide shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Đang gửi đơn..." : "🚀 XÁC NHẬN GIAO GAS TẬN NHÀ"}
                    </button>

                    <p className="text-[11px] text-center text-neutral-400">
                      🔒 Cam kết bình chính hãng nguyên tem chống giả. Không phát sinh chi phí.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10 Products Pricing Section with Tabs */}
      <section className="py-12 lg:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">Bảng giá niêm yết chính hãng</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              Giá Đổi Bình Gas Hôm Nay Tại {district.name}
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Bảng giá công khai minh bạch tất cả các dòng bình: V-Gas (xám, đỏ, vàng, xanh đen, PE, Shell), Petrolimex (đứng, shell), Tuấn Khang và bình Gas bò 45kg. Miễn phí công lắp đặt và kiểm tra an toàn van dây.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { key: "all", label: "Tất cả các dòng bình (10)" },
              { key: "v-gas", label: "Dòng V-Gas 12kg (Xám, Đỏ, Vàng, PE, Shell)" },
              { key: "petrolimex-tuankhang", label: "Petrolimex & Tuấn Khang 12kg" },
              { key: "cong-nghiep", label: "Gas bò 45 kg (Công nghiệp)" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategoryFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCategoryFilter === tab.key
                    ? "bg-red-600 border-red-600 text-white shadow-md"
                    : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-neutral-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  {prod.image && (
                    <div className="bg-gradient-to-br from-rose-50 to-slate-50 aspect-square w-full rounded-xl flex items-center justify-center overflow-hidden mb-3 relative select-none group" onContextMenu={(e) => e.preventDefault()}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <WatermarkOverlay hotline={district.hotline || HOTLINE_DISPLAY} hotlineTel={district.hotline ? `tel:${district.hotline.replace(/\s+/g, '')}` : HOTLINE_TEL} />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {prod.tag}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">
                      {prod.weight}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-neutral-900 text-sm mb-1 leading-snug">
                    {prod.name}
                  </h3>
                  <div className="text-[11px] text-neutral-400 mb-2">
                    {prod.brand} • {prod.valveType}
                  </div>
                  <div className="mb-2">
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">Đổi gas</div>
                    <div className="text-xl font-black text-red-600 leading-tight">{prod.price}</div>
                    {prod.newPrice && (
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        Mua mới: <strong className="text-neutral-700 font-semibold">{prod.newPrice}</strong>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed mb-3 line-clamp-2">{prod.desc}</p>
                </div>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectProductCard(prod)}
                    className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs text-center transition-colors block shadow-sm"
                  >
                    Đặt Bình Này
                  </button>
                  <a
                    href={HOTLINE_TEL}
                    className="w-full py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-[11px] text-center transition-colors block"
                  >
                    Gọi: {HOTLINE_DISPLAY}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO FAQs Section */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">Hỏi đáp thường gặp</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              Câu Hỏi Về Dịch Vụ Giao Gas, Đặt Gas {district.name}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-sm text-neutral-900 mb-2">
                1. Thời gian giao gas tại {district.name} (bao gồm các phường mới) mất bao lâu?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nhờ trạm giao hàng thường trực tại {district.hubName}, thời gian giao gas của Gas Nhà Mình tại tất cả các phường mới và tuyến đường tại {district.name} chỉ từ {district.slaMinutes} phút kể từ khi bạn hoàn tất đặt đơn hoặc gọi hotline.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-sm text-neutral-900 mb-2">
                2. Gas Nhà Mình có những loại bình gas nào? Có bình gas bò 45kg không?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Chúng tôi cung ứng đầy đủ các dòng: V-Gas (xám, đỏ, vàng, xanh đen, V-Gas PE bọc nhựa chống va đập, V-Gas Shell van chụp), Petrolimex van đứng, Petrolimex van chụp Shell, Tuấn Khang vàng 12kg và bình gas bò 45kg công nghiệp chuyên dụng cho nhà hàng, quán ăn.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-sm text-neutral-900 mb-2">
                3. Tôi có được cân đối chứng kiểm tra trọng lượng bình gas không? Làm sao biết bình đủ 12kg ruột?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Bình gas 12kg gia đình tại {district.name} đã được chiết nạp tự động chuẩn xác đủ 12kg ruột tại nhà máy của hãng và niêm phong màng co nhiệt chống giả. Trọng lượng vỏ bình được dập nổi rõ ràng trên quai xách. Để đảm bảo giao hỏa tốc 15 phút, nhân viên không mang theo cân cồng kềnh mà sẽ cùng quý khách kiểm tra nguyên vẹn tem màng co, hạn kiểm định vỏ bình và thử rò rỉ khí gas an toàn. Nếu gia đình có sẵn cân tại nhà, quý khách hoàn toàn có thể kiểm tra đối chứng trước khi nhận.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-sm text-neutral-900 mb-2">
                4. Đổi bình gas có được hỗ trợ kiểm tra van dây và an toàn không?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                100% bình gas phân phối tại {district.name} là hàng chính hãng có tem kiểm định an toàn của nhà sản xuất. Kỹ thuật viên giao gas hỗ trợ kiểm tra rò rỉ gas bằng bọt xà phòng hoặc thiết bị dò khí chuyên dụng, thay gioăng cao su van miễn phí trước khi bàn giao.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking: Neighboring Districts for SEO */}
      {neighboringDistricts.length > 0 && (
        <section className="py-10 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4 text-center">
              Dịch vụ giao gas các khu vực lân cận {district.name}:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {neighboringDistricts.map((nd) => (
                <Link
                  key={nd.slug}
                  href={`/giao-gas/${nd.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  📍 Giao gas {nd.name}
                </Link>
              ))}
              <Link
                href="/#khu-vuc"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition-all"
              >
                Xem tất cả các quận huyện →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-2.5 text-white font-black text-lg">
            <img src="/logo.png" alt="Gas Nhà Mình Logo" className="h-8 w-auto object-contain bg-white rounded p-0.5" />
            <span>{BRAND_NAME} – {district.fullName}</span>
          </div>
          <p>{BRAND_TAGLINE} | Trạm giao hàng phục vụ: {district.hubName}</p>
          <p>Hotline khẩn cấp 24/7: <a href={HOTLINE_TEL} className="text-red-400 font-bold">{HOTLINE_DISPLAY}</a></p>
          <p className="text-neutral-500 pt-4 border-t border-neutral-800 text-[11px]">
            © {new Date().getFullYear()} GasNhaMinh.com. Nền tảng đặt gas công nghệ giao nhanh hàng đầu TP.HCM.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        {/* Cam kết giao nhanh & an toàn theo quận */}
        <div className="bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#EF4444] py-1 px-3 text-center flex items-center justify-center gap-2 text-[11px] font-bold text-white tracking-wide">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span>⚡ Có mặt sau {district.slaMinutes} phút • Nguyên tem chính hãng • Kiểm tra an toàn</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 px-3 py-2 max-w-lg mx-auto">
          <a
            href={HOTLINE_TEL}
            onClick={() => {
              trackInteractionApi('click_call', {
                district: district.name,
                phone: HOTLINE_DISPLAY,
                notes: `Khách bấm Gọi Hotline từ thanh di động tại ${district.name}`,
              });
            }}
            className="flex flex-col items-center justify-center bg-white border border-red-200 text-[#E02424] active:bg-red-50 rounded-xl px-3 py-1.5 min-w-[62px] transition-all shadow-sm"
            title="Gọi hotline"
          >
            <span className="text-sm">📞</span>
            <span className="text-[10px] font-bold mt-0.5">Gọi ngay</span>
          </a>

          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackInteractionApi('click_zalo', {
                district: district.name,
                phone: HOTLINE_DISPLAY,
                notes: `Khách bấm Chat Zalo từ thanh di động tại ${district.name}`,
              });
            }}
            className="flex flex-col items-center justify-center bg-red-50 border border-red-200 text-[#E02424] active:bg-red-100 rounded-xl px-3 py-1.5 min-w-[62px] transition-all shadow-sm"
            title="Chat Zalo"
          >
            <span className="text-sm leading-none">💬</span>
            <span className="text-[10px] font-bold mt-0.5">Zalo</span>
          </a>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('order-form-box');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                const phoneInput = el.querySelector("input[type='tel']") as HTMLInputElement | null;
                if (phoneInput) {
                  setTimeout(() => phoneInput.focus(), 450);
                }
              }
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] active:scale-[0.98] text-white font-black text-xs py-3 px-3 rounded-xl shadow-lg shadow-red-500/30 transition-all uppercase tracking-wide"
          >
            <span>🚀 ĐẶT GAS {district.name.toUpperCase()} (15P)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
