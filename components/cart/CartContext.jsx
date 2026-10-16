"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "tea-cart-v1";

function lineKey(item) {
  return `${item.category}:${item.id}`;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readStorage() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(items) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(items);
  }, [items, hydrated]);

  useEffect(() => {
    function syncFromOtherTab(e) {
      if (e.key === STORAGE_KEY) setItems(readStorage());
    }
    window.addEventListener("storage", syncFromOtherTab);
    return () => window.removeEventListener("storage", syncFromOtherTab);
  }, []);

  const addItem = useCallback((product, qty = 1) => {
    const key = lineKey(product);
    setItems((prev) => {
      const existing = prev.find((it) => lineKey(it) === key);
      if (existing) {
        return prev.map((it) =>
          lineKey(it) === key ? { ...it, quantity: it.quantity + qty } : it,
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }, []);

  const updateQuantity = useCallback((category, id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => !(it.category === category && it.id === id))
        : prev.map((it) =>
            it.category === category && it.id === id
              ? { ...it, quantity: qty }
              : it,
          ),
    );
  }, []);

  const removeItem = useCallback((category, id) => {
    setItems((prev) =>
      prev.filter((it) => !(it.category === category && it.id === id)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );
  const totalCents = useMemo(
    () => items.reduce((sum, it) => sum + it.priceCents * it.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      totalCents,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [items, count, totalCents, addItem, updateQuantity, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
