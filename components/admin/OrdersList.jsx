"use client";

import { useState, useTransition } from "react";
import { formatMoney } from "@/lib/money";
import { cartLineQuantityLabel } from "@/lib/cartLines";
import {
  ORDER_STATUSES,
  orderStatusLabel,
  orderStatusBadgeClass,
} from "@/lib/orderStatus";
import { updateOrderStatusAction } from "@/app/admin/(protected)/orders/actions";

function formatDate(date) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [pending, startTransition] = useTransition();

  function handleStatusChange(e) {
    const next = e.target.value;
    setStatus(next);
    startTransition(() => updateOrderStatusAction(order.id, next));
  }

  return (
    <li className="rounded border border-ink/10">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <div>
          <p className="font-body text-sm font-medium text-ink">
            {order.customerName}
          </p>
          <p className="text-xs text-stone">
            {order.email} · {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-ink">
            {formatMoney(order.totalCents, "en")}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${orderStatusBadgeClass(
              status,
            )}`}
          >
            {orderStatusLabel(status)}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-ink/10 px-4 py-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="admin-label">Contact</p>
              <p className="text-sm text-ink">{order.customerName}</p>
              <p className="text-sm text-ink">{order.email}</p>
              {order.phone && <p className="text-sm text-ink">{order.phone}</p>}
              <p className="mt-2 text-sm text-ink">
                {order.street} {order.houseNumber}
                <br />
                {order.postalCode} {order.city}
                <br />
                {order.country}
              </p>
              {order.note && (
                <p className="mt-2 text-sm italic text-stone">{order.note}</p>
              )}
            </div>

            <div>
              <p className="admin-label">Status</p>
              <select
                value={status}
                onChange={handleStatusChange}
                disabled={pending}
                className="admin-input"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {orderStatusLabel(s)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between text-sm">
                <div>
                  <p className="text-ink">{item.name}</p>
                  <p className="text-stone">
                    {cartLineQuantityLabel(item, "pc")}
                  </p>
                </div>
                <p className="text-ink">
                  {formatMoney(item.priceCents * item.quantity, "en")}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-sm font-semibold">
            <span>Total</span>
            <span>{formatMoney(order.totalCents, "en")}</span>
          </div>
        </div>
      )}
    </li>
  );
}

export function OrdersList({ orders }) {
  if (orders.length === 0) {
    return <p className="text-sm text-stone">No orders yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </ul>
  );
}
