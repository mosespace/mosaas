'use client';

import { useState } from 'react';

export function useConfirmAction<T>() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);
  const [onConfirm, setOnConfirm] = useState<(() => Promise<void>) | null>(
    null,
  );

  function confirm(payload: T, action: () => Promise<void>) {
    setPayload(payload);
    setOnConfirm(() => action);
    setOpen(true);
  }

  async function handleConfirm() {
    if (!onConfirm) return;
    await onConfirm();
    setOpen(false);
    setPayload(null);
    setOnConfirm(null);
  }

  function handleCancel() {
    setOpen(false);
    setPayload(null);
    setOnConfirm(null);
  }

  return {
    open,
    payload,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
