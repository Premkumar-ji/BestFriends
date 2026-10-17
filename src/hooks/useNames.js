import { useMemo } from 'react';

function sanitizeName(value, fallback) {
  if (!value || typeof value !== 'string') return fallback;
  const cleaned = value.replace(/<[^>]*>?/gm, '').trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, 24);
}

export default function useNames() {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        sender: 'Prem',
        receiver: 'XYZ',
        hasCustomNames: false,
        getShareUrl: (s = 'Prem', r = 'XYZ') => '',
        getWhatsAppUrl: () => '',
      };
    }

    const params = new URLSearchParams(window.location.search);
    const rawSender = params.get('sender') || params.get('from') || params.get('s');
    const rawReceiver = params.get('receiver') || params.get('to') || params.get('r');

    const sender = sanitizeName(rawSender, 'Prem');
    const receiver = sanitizeName(rawReceiver, 'XYZ');
    const hasCustomNames = Boolean(rawSender || rawReceiver);

    const getShareUrl = (customSender = sender, customReceiver = receiver) => {
      const url = new URL(window.location.href);
      url.searchParams.set('from', customSender);
      url.searchParams.set('to', customReceiver);
      return url.toString();
    };

    const getWhatsAppUrl = () => {
      const shareUrl = getShareUrl();
      const text = `Official ho gaya! 🤝 ${sender} aur ${receiver} officially best friends ban gaye! 💖✨\nCheck it out here:\n${shareUrl}`;
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    };

    return {
      sender,
      receiver,
      hasCustomNames,
      getShareUrl,
      getWhatsAppUrl,
    };
  }, []);
}
