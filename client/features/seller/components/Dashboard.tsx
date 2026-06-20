"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faBoxOpen,
  faClipboardList,
  faUsers,
  faStar,
  faArrowUp,
  faArrowDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

// ─── Mock data ───────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    id: "revenue",
    label: "Doanh thu tháng này",
    value: "12.450.000 ₫",
    change: 12.4,
    icon: faStore,
  },
  {
    id: "orders",
    label: "Đơn hàng",
    value: "284",
    change: 8.1,
    icon: faClipboardList,
  },
  {
    id: "products",
    label: "Sản phẩm đang bán",
    value: "56",
    change: -2.3,
    icon: faBoxOpen,
  },
  {
    id: "customers",
    label: "Khách hàng",
    value: "1.032",
    change: 5.7,
    icon: faUsers,
  },
];

const RECENT_ORDERS = [
  {
    id: "#ORD-0091",
    customer: "Nguyễn Văn A",
    product: "Áo thun basic",
    total: "150.000 ₫",
    status: "Đã giao",
  },
  {
    id: "#ORD-0090",
    customer: "Trần Thị B",
    product: "Quần jeans slim",
    total: "320.000 ₫",
    status: "Đang giao",
  },
  {
    id: "#ORD-0089",
    customer: "Lê Hoàng C",
    product: "Giày sneaker trắng",
    total: "480.000 ₫",
    status: "Chờ xác nhận",
  },
  {
    id: "#ORD-0088",
    customer: "Phạm Minh D",
    product: "Túi tote canvas",
    total: "95.000 ₫",
    status: "Đã giao",
  },
  {
    id: "#ORD-0087",
    customer: "Hoàng Thu E",
    product: "Mũ bucket",
    total: "120.000 ₫",
    status: "Đã huỷ",
  },
];

const LOW_STOCK_PRODUCTS = [
  { id: 1, name: "Áo thun basic trắng", sku: "ATB-001", stock: 3 },
  { id: 2, name: "Quần shorts kaki", sku: "QSK-012", stock: 1 },
  { id: 3, name: "Dép sandal nữ", sku: "DSN-007", stock: 5 },
  { id: 4, name: "Ví da nam", sku: "VDN-033", stock: 2 },
];

const REVIEWS = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    product: "Áo thun basic",
    rating: 5,
    comment: "Sản phẩm rất đẹp, chất vải mềm mại.",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    product: "Quần jeans slim",
    rating: 4,
    comment: "Vừa vặn, giao hàng nhanh.",
  },
  {
    id: 3,
    customer: "Lê Hoàng C",
    product: "Giày sneaker trắng",
    rating: 3,
    comment: "Ổn nhưng hơi chật so với size.",
  },
];

const STATUS_COLOR: Record<string, string> = {
  "Đã giao": "text-zinc-500 bg-zinc-100",
  "Đang giao": "text-sky-600 bg-sky-50",
  "Chờ xác nhận": "text-amber-600 bg-amber-50",
  "Đã huỷ": "text-red-500 bg-red-50",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-zinc-800">
            Tổng quan cửa hàng
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5">Tháng 5, 2026</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-zinc-200 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {card.label}
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-50 text-zinc-400">
                  <FontAwesomeIcon icon={card.icon} />
                </span>
              </div>
              <p className="text-2xl font-semibold text-zinc-800">
                {card.value}
              </p>
              <p
                className={`text-xs mt-1.5 flex items-center gap-1 ${
                  card.change >= 0 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <FontAwesomeIcon
                  icon={card.change >= 0 ? faArrowUp : faArrowDown}
                  className="text-[10px]"
                />
                {Math.abs(card.change)}% so với tháng trước
              </p>
            </div>
          ))}
        </div>

        {/* Orders + Low stock */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="xl:col-span-2 bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100">
              <h2 className="text-sm font-semibold text-zinc-700">
                Đơn hàng gần đây
              </h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  {[
                    "Mã đơn",
                    "Khách hàng",
                    "Sản phẩm",
                    "Tổng tiền",
                    "Trạng thái",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order, i) => (
                  <tr
                    key={order.id}
                    className={
                      i !== RECENT_ORDERS.length - 1
                        ? "border-b border-zinc-50"
                        : ""
                    }
                  >
                    <td className="px-5 py-3.5 text-zinc-500 font-mono text-xs">
                      {order.id}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-700 font-medium">
                      {order.customer}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-500">
                      {order.product}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-700">{order.total}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          STATUS_COLOR[order.status]
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[6px]"
                        />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low stock */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100">
              <h2 className="text-sm font-semibold text-zinc-700">
                Sắp hết hàng
              </h2>
            </div>
            <div className="divide-y divide-zinc-50">
              {LOW_STOCK_PRODUCTS.map((p) => (
                <div
                  key={p.id}
                  className="px-5 py-3.5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-zinc-700 font-medium">
                      {p.name}
                    </p>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {p.sku}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      p.stock <= 2
                        ? "bg-red-50 text-red-500"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    còn {p.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-zinc-700">
              Đánh giá gần đây
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100">
            {REVIEWS.map((r) => (
              <div key={r.id} className="px-5 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-700">
                    {r.customer}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`text-xs ${
                          i < r.rating ? "text-amber-400" : "text-zinc-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-400">{r.product}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
