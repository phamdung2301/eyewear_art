/* LUNET — catalog tĩnh. Nâng cấp sau: thay module này bằng API/Supabase
   (xem concept-to-production data ladder) — mọi component đọc qua đây. */

export type FrameShape = "round" | "rect" | "cat";

export interface Sku {
  id: string;
  name: string;
  en: string;
  shape: FrameShape;
  color: string;
  lens: string;
  material: "acetate" | "metal";
  price: number;
  cat: string;
}

export const COLLECTION: Sku[] = [
  { id: "havana-01", name: "Havana 01", en: "Round — Mazzucchelli acetate", shape: "round", color: "#b06a35", lens: "#dfeef2", material: "acetate", price: 1290000, cat: "Acetate — Round" },
  { id: "crystal-02", name: "Crystal Saigon", en: "Round — crystal clear", shape: "round", color: "#e8d9c2", lens: "#e6f2ee", material: "acetate", price: 1450000, cat: "Acetate — Round" },
  { id: "ink-03", name: "Ink Đêm", en: "Rectangle — midnight black", shape: "rect", color: "#1b1b18", lens: "#e8eef4", material: "acetate", price: 1190000, cat: "Acetate — Rectangle" },
  { id: "gold-04", name: "Dây Vàng", en: "Panto — titanium gold wire", shape: "round", color: "#cfa14f", lens: "#f0ede2", material: "metal", price: 1890000, cat: "Titanium — Panto" },
  { id: "meomeo-05", name: "Mắt Mèo Sài Gòn", en: "Cat-eye — tortoise fade", shape: "cat", color: "#8a4f24", lens: "#e6f0ea", material: "acetate", price: 1590000, cat: "Acetate — Cat-eye" },
  { id: "ice-06", name: "Băng Giá", en: "Rectangle — ice crystal", shape: "rect", color: "#cfe0e8", lens: "#f4f8fa", material: "acetate", price: 1350000, cat: "Acetate — Rectangle" },
  { id: "ghe-07", name: "Ghế Dài 75", en: "Square — classic 1975", shape: "rect", color: "#6e4a28", lens: "#eef0e4", material: "acetate", price: 1250000, cat: "Acetate — Square" },
  { id: "moi-08", name: "Nghiêng 45°", en: "Cat-eye — rhodium silver", shape: "cat", color: "#9aa2a6", lens: "#eceff2", material: "metal", price: 1750000, cat: "Metal — Cat-eye" },
];

export interface FrameConfig {
  id: string;
  label: string;
  color: string;
  material: "acetate" | "metal";
  opacity: number;
  price: number;
}

/* Frame Lab — 4 biến thể trên cùng model 3D (lumiere Shade Lab pattern) */
export const FRAMES: FrameConfig[] = [
  { id: "havana", label: "Havana", color: "#b06a35", material: "acetate", opacity: 1, price: 1290000 },
  { id: "crystal", label: "Crystal", color: "#e8d9c2", material: "acetate", opacity: 0.55, price: 1450000 },
  { id: "ink", label: "Ink", color: "#1b1b18", material: "acetate", opacity: 1, price: 1190000 },
  { id: "gold", label: "Gold wire", color: "#cfa14f", material: "metal", opacity: 1, price: 1890000 },
];

export const formatVnd = (n: number): string => n.toLocaleString("vi-VN") + "₫";
