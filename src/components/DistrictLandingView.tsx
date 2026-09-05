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
import { createOrder } from "@/lib/api";

interface DistrictLandingViewProps {
  district: DistrictInfo;
}

export default function DistrictLandingView({ district }: DistrictLandingViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<SeoProductItem>(SEO_PRODUCTS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [actionType, setActionType] = useState<"exchange" | "new">("exchange");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(`[${district.name}] `);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const neighboringDistricts = DISTRICTS_DATA.filter((d) =>
    district.neighboringSlugs.includes(d.slug)
  );

  const filteredProducts = activeCategoryFilter === "all"
    ? SEO_PRODUCTS
    : SEO_PRODUCTS.filter((p) => p.category === activeCategoryFilter);

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
        note: `[Khu vực: ${district.name}] [Sản phẩm: ${selectedProduct.name}] ${note} (${actionType === "exchange" ? "Đổi bình" : "Mua trọn bộ cả vỏ"})`,
        cylinderAction: actionType,
      });

      if (res.success) {
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
        ⚡ Giao gas, đặt gas nhanh tại <strong className="text-red-400">{district.fullName}</strong> trong{" "}
        <strong className="text-amber-400">{district.slaMinutes} phút</strong> – Cân đối chứng tại nhà!
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100 transition-colors"
            >
              💬 Nhắn Zalo
            </a>
            <a
              href={HOTLINE_TEL}
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
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <div className="font-bold text-xs text-neutral-900">Cân Đủ Ký</div>
                    <div className="text-[11px] text-neutral-500">Cân đối chứng tại nhà</div>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <div className="font-bold text-xs text-neutral-900">Bảo Hiểm 10 Tỷ</div>
                    <div className="text-[11px] text-neutral-500">Chính hãng dầu khí</div>
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
                  Kiểm tra cân đủ ký – Khách hài lòng mới thanh toán.
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
                          const found = SEO_PRODUCTS.find((p) => p.id === e.target.value);
                          if (found) setSelectedProduct(found);
                        }}
                        className="w-full text-xs font-semibold bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red-500 text-neutral-800"
                      >
                        {SEO_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {p.price} ({p.valveType})
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
                      🔒 Cam kết kiểm tra gas đủ cân trước khi thanh toán. Không phát sinh chi phí.
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-neutral-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
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
                  <div className="text-xl font-black text-red-600 mb-2">{prod.price}</div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed mb-4">{prod.desc}</p>
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
                3. Tôi có thể yêu cầu cân bình gas đối chứng trước khi thanh toán không?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Hoàn toàn được! Kỹ thuật viên luôn mang theo cân điện tử đối chứng. Bạn sẽ được trực tiếp kiểm tra tổng trọng lượng bình (Tổng trọng lượng = Vỏ bình ghi trên quai xách + 12kg nước gas). Cân đủ ký quý khách mới thanh toán.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-sm text-neutral-900 mb-2">
                4. Đổi bình gas có được bảo hành van dây và bảo hiểm an toàn không?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                100% bình gas phân phối tại {district.name} có bảo hiểm cháy nổ chính hãng dầu khí lên đến 10 tỷ đồng. Kỹ thuật viên kiểm tra rò rỉ gas bằng thiết bị dò khí chuyên dụng miễn phí trước khi bàn giao.
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
          <div className="text-white font-black text-lg">🔥 {BRAND_NAME} – {district.fullName}</div>
          <p>{BRAND_TAGLINE} | Trạm giao hàng phục vụ: {district.hubName}</p>
          <p>Hotline khẩn cấp 24/7: <a href={HOTLINE_TEL} className="text-red-400 font-bold">{HOTLINE_DISPLAY}</a></p>
          <p className="text-neutral-500 pt-4 border-t border-neutral-800 text-[11px]">
            © {new Date().getFullYear()} GasNhaMinh.com. Nền tảng đặt gas công nghệ giao nhanh hàng đầu TP.HCM.
          </p>
        </div>
      </footer>
    </div>
  );
}
