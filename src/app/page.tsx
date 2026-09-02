"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HOTLINE = "0888 113 831";
const HOTLINE_TEL = "tel:0888113831";

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
          {[["Bảng giá", "#bang-gia"], ["Cam kết", "#cam-ket"], ["Khu vực giao", "#khu-vuc"]].map(([label, href]) => (
            <a key={href} href={href} className="text-[#111928] font-semibold text-sm hover:text-[#E02424] transition-colors">{label}</a>
          ))}
        </nav>
        <a href={HOTLINE_TEL} className="flex items-center gap-2 bg-[#E02424] hover:bg-[#B91C1C] text-white font-bold px-5 py-2.5 rounded-lg transition-colors text-sm">
          <PhoneIcon /> Gọi ngay: {HOTLINE}
        </a>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-14">
        <span className="text-[#E02424] font-black text-lg">🔥 GAS NHÀ MÌNH</span>
        <a href={HOTLINE_TEL} className="bg-[#FF5722] text-white rounded-full p-2.5">
          <PhoneIcon size={18} />
        </a>
      </div>
    </header>
  );
}

function MobileStickyBar({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden h-16 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
      <a href={HOTLINE_TEL} className="flex-1 flex items-center justify-center gap-2 bg-white border-t-2 border-[#E02424] text-[#E02424] font-bold text-sm">
        <PhoneIcon size={16} /> GỌI HOTLINE
      </a>
      <button onClick={onOrderClick} className="flex-1 flex items-center justify-center gap-2 bg-[#FF5722] text-white font-bold text-sm">
        ⚡ ĐẶT GAS NHÀ MÌNH
      </button>
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
        if (typeof window !== "undefined") {
          const val = Number(displayPrice.replace(/\D/g, ""));
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "purchase",
            ecommerce: {
              value: val,
              currency: "VND",
              items: [{
                item_name: product.name,
                item_category: category.label,
                quantity: 1
              }]
            }
          });
          if (typeof (window as any).gtag === "function") {
            (window as any).gtag("event", "purchase", {
              value: val,
              currency: "VND",
              items: [{
                item_name: product.name,
                item_category: category.label,
                quantity: 1
              }]
            });
          }
        }
        onOrderSuccess();
      } else {
        alert(res.message || "Đã có lỗi xảy ra khi đặt hàng.");
      }
    }
  }

  return (
    <section id="hero" className="pt-[72px] bg-gradient-to-br from-[#fff5f5] to-[#fff] min-h-screen flex items-center">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 w-full py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FFF3CD] text-[#92400E] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            ⚡ Giao gas trong 15–20 phút tại TP.HCM
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111928] leading-tight mb-4">
            GAS NHÀ MÌNH – Nền tảng đặt gas <span className="text-[#E02424]">gần bạn</span><br />
            Hết gas, gọi Nhà Mình
          </h1>
          <p className="text-[#6B7280] text-base md:text-lg mb-6 leading-relaxed">
            Bình gas chính hãng 100%, đủ ký, có bảo hiểm an toàn. Miễn phí kiểm tra dây van và vệ sinh bếp.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Đủ trọng lượng – Cân đối chứng ngay khi nhận",
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
          <img
            src="https://images.unsplash.com/photo-1698034303551-7e0e114be199?w=600&h=340&fit=crop&auto=format"
            alt="Nhân viên giao gas chuyên nghiệp"
            className="rounded-2xl w-full object-cover hidden md:block shadow-lg"
            style={{ maxHeight: 220 }}
          />
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
    label: "Gas Dân Dụng",
    products: [
      { id: 1, slug: "binh-gas-xam-12kg", name: "Bình Gas Xám 12kg", tag: "Bán chạy nhất", tagColor: "bg-[#FF5722]", exchangePrice: "360.000đ", newPrice: "660.000đ", img: BASE + "gas-gia-dinh-6965_220x352.jpg" },
      { id: 2, slug: "binh-gas-do-12kg", name: "Bình Gas Đỏ 12kg", tag: "Gia đình dùng nhiều", tagColor: "bg-[#0E9F6E]", exchangePrice: "380.000đ", newPrice: "680.000đ", img: BASE + "220x245x2/tai-xuong-(30)-58.jpg" },
      { id: 3, slug: "petrolimex-12kg", name: "Petrolimex 12kg", tag: "An toàn tuyệt đối", tagColor: "bg-[#1A56DB]", exchangePrice: "420.000đ", newPrice: "720.000đ", img: BASE + "220x245x2/gasviet-1-7016-300x480-667.png" },
      { id: 4, slug: "saigon-petro-12kg", name: "Saigon Petro 12kg", tag: "Gas Dầu Khí", tagColor: "bg-[#F59E0B]", exchangePrice: "370.000đ", newPrice: "670.000đ", img: BASE + "220x245x2/images-(24)-9485.jpg" },
    ],
  },
  {
    label: "Gas Công Nghiệp",
    products: [
      { id: 5, slug: "binh-gas-45kg-saigon-petro", name: "Bình Gas 45kg (Saigon Petro)", tag: "Nhà hàng, Quán ăn", tagColor: "bg-[#6B7280]", exchangePrice: "Liên hệ báo giá", newPrice: null, img: BASE + "220x245x2/tai-xuong-(56)-6350.jpg" },
      { id: 6, slug: "binh-gas-45kg-dau-khi", name: "Bình Gas 45kg (Gas Dầu Khí)", tag: "Công nghiệp", tagColor: "bg-[#7C3AED]", exchangePrice: "Liên hệ báo giá", newPrice: null, img: BASE + "220x245x2/tai-xuong-3820.jpg" },
      { id: 7, slug: "elf-gas-45kg", name: "Elf Gas 39–50kg", tag: "Bếp công nghiệp", tagColor: "bg-[#0E9F6E]", exchangePrice: "Liên hệ báo giá", newPrice: null, img: BASE + "220x245x2/tai-xuong-(57)-5222.jpg" },
      { id: 8, slug: "petrolimex-48kg", name: "Petrolimex 48kg", tag: "Nhà máy, Xưởng", tagColor: "bg-[#1A56DB]", exchangePrice: "Liên hệ báo giá", newPrice: null, img: BASE + "220x245x2/images-(32)-9513.jpg" },
    ],
  },
  {
    label: "Bộ Bình Gas",
    products: [
      { id: 9, slug: "bo-binh-xam-12kg", name: "Bộ Bình Xám + Van + Dây Gas", tag: "Đầy đủ phụ kiện", tagColor: "bg-[#FF5722]", exchangePrice: "660.000đ", newPrice: null, img: BASE + "220x245x2/gasviet-1-7016-300x480-667.png" },
      { id: 10, slug: "bo-binh-do-12kg", name: "Bộ Bình Đỏ + Van Tự Ngắt + Dây", tag: "An toàn cao", tagColor: "bg-[#E02424]", exchangePrice: "680.000đ", newPrice: null, img: BASE + "220x245x2/tai-xuong-(30)-58.jpg" },
      { id: 11, slug: "bo-binh-petrolimex-12kg", name: "Bộ Bình Petrolimex + Van + Dây", tag: "Chính hãng", tagColor: "bg-[#1A56DB]", exchangePrice: "720.000đ", newPrice: null, img: BASE + "220x245x2/gasviet-1-7016-300x480-667.png" },
      { id: 12, slug: "bo-binh-elf-gas", name: "Bộ Bình Elf Gas + Van Namlux", tag: "Tiết kiệm", tagColor: "bg-[#0E9F6E]", exchangePrice: "750.000đ", newPrice: null, img: BASE + "220x245x2/tai-xuong-(57)-5222.jpg" },
    ],
  },
  {
    label: "Bộ Bình Gas Bếp Gas",
    products: [
      { id: 13, slug: "bo-binh-xam-bep-don", name: "Bình Xám + Bếp Gas Đơn Mặt Kính", tag: "Combo tiết kiệm", tagColor: "bg-[#FF5722]", exchangePrice: "1.200.000đ", newPrice: null, img: BASE + "220x245x2/gasviet-1-7016-300x480-667.png" },
      { id: 14, slug: "bo-binh-do-bep-don", name: "Bình Đỏ + Bếp Gas + Van + Dây", tag: "Trọn gói", tagColor: "bg-[#0E9F6E]", exchangePrice: "1.450.000đ", newPrice: null, img: BASE + "220x245x2/tai-xuong-(30)-58.jpg" },
      { id: 15, slug: "bo-binh-petrovietnam-bep-don", name: "Bình Petrovietnam + Bếp Đơn", tag: "Quán ăn nhỏ", tagColor: "bg-[#6B7280]", exchangePrice: "1.650.000đ", newPrice: null, img: BASE + "220x245x2/gasviet-1-7016-300x480-667.png" },
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
          'gas_cong_nghiep': [],
          'bo_binh_gas': [],
          'bo_binh_gas_bep_gas': []
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
          { label: "Gas Công Nghiệp", products: catMap['gas_cong_nghiep'].length > 0 ? catMap['gas_cong_nghiep'] : DEFAULT_PRICING_TABS[1].products },
          { label: "Bộ Bình Gas", products: catMap['bo_binh_gas'].length > 0 ? catMap['bo_binh_gas'] : DEFAULT_PRICING_TABS[2].products },
          { label: "Bộ Bình Gas Bếp Gas", products: catMap['bo_binh_gas_bep_gas'].length > 0 ? catMap['bo_binh_gas_bep_gas'] : DEFAULT_PRICING_TABS[3].products }
        ]);
      }
    }).catch(console.error);
  }, []);

  return tabs;
}

function ProductCard({ p, onSelect }: { p: ProductItem; onSelect: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
      <div className="bg-gradient-to-br from-[#fff5f5] to-[#f9fafb] h-44 flex items-center justify-center overflow-hidden">
        <img src={p.img} alt={p.name} className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
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
        <button onClick={onSelect}
          className="mt-3 w-full py-2.5 rounded-lg border-2 border-[#E02424] text-[#E02424] font-bold text-sm hover:bg-[#E02424] hover:text-white transition-all">
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
    { num: "03", icon: "⚖️", title: "Lắp đặt & Cân ký", desc: "Nhân viên cân bình tại chỗ đối chứng, lắp đặt van dây đúng tiêu chuẩn PCCC." },
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
      icon: "⚖️",
      title: "Cân Đúng Ký Tại Nhà",
      desc: "Nhân viên mang theo cân đối chứng trực tiếp khi giao gas. Cam kết đủ 100% trọng lượng nước gas theo tiêu chuẩn.",
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
    { name: "Chị Lan Phương", location: "Chung cư Sunrise City, Quận 7", avatar: "L", stars: 5, tag: "Hộ gia đình", text: "Giao rất nhanh, nhân viên đem cân tận nơi cho xem đủ ký rồi mới gắn van. Rất yên tâm khi dùng." },
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
  const districts = [
    "Quận 1", "Quận 3", "Quận 5", "Quận 7", "Quận 10", "Quận 11",
    "Gò Vấp", "Bình Thạnh", "Tân Bình", "Tân Phú", "Phú Nhuận",
    "Thủ Đức", "Bình Dương", "Hóc Môn",
  ];

  return (
    <section id="khu-vuc" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E02424] mb-2 block">Phủ sóng toàn thành phố</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111928]">Mạng Lưới Giao Gas Phủ Sóng TP.HCM</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-[#6B7280] mb-5 text-sm">Giao nhanh trong <strong className="text-[#E02424]">15–20 phút</strong> tại các khu vực:</p>
            <div className="flex flex-wrap gap-2">
              {districts.map((d) => (
                <span key={d} className="flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-semibold text-[#111928]">
                  <span className="w-2 h-2 rounded-full bg-[#0E9F6E] inline-block"></span>{d}
                </span>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[#FFF3CD] rounded-xl border border-[#FCD34D]">
              <p className="text-sm text-[#92400E] font-semibold">📍 Không thấy khu vực của bạn? Liên hệ hotline <a href={HOTLINE_TEL} className="text-[#E02424] underline">{HOTLINE}</a> – chúng tôi hỗ trợ thêm nhiều khu vực!</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg h-72 bg-[#E5E7EB] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1736960894843-bc9afe9b22c9?w=600&h=288&fit=crop&auto=format"
              alt="Mạng lưới giao gas TPHCM"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D1117] text-white py-12 pb-20 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-[#E02424] font-black text-2xl mb-2">🔥 GAS NHÀ MÌNH</div>
            <p className="text-white/60 text-sm leading-relaxed">Chuỗi phân phối gas chính hãng uy tín tại TP.HCM. Giao hỏa tốc 24/7, cân đủ ký, có bảo hiểm.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Liên hệ</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>☎️ Hotline 24/7: <a href={HOTLINE_TEL} className="text-[#FF5722] font-bold">{HOTLINE}</a></div>
              <div>🕐 Hoạt động: 24/7 kể cả Lễ Tết</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Chứng nhận</h4>
            <div className="flex gap-3 flex-wrap">
              {["ĐKKD: 0123456789", "Bộ Công Thương", "ISO PCCC"].map((c) => (
                <span key={c} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white/70">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © 2024 GAS NHÀ MÌNH. Đã đăng ký bảo hộ thương hiệu. Cam kết chất lượng – Minh bạch giá cả.
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

export default function App() {
  const tabs = usePricingTabs();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  function scrollToForm() {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
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
      <Footer />
      <MobileStickyBar onOrderClick={scrollToForm} />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
