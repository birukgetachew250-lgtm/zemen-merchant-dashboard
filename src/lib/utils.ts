import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  }).format(amount);
}

// Helper to format Tag-Length-Value (TLV) strings
function formatTlv(tag: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${tag}${length}${value}`;
}

// Constructs the EMV-compliant QR code string
export function constructQrCodeString(
  operatorAccount: string,
  merchantName: string,
  amount: number
): string {
  const payloadFormatIndicator = formatTlv('00', '01');
  const pointOfInitiation = formatTlv('01', '12'); // Dynamic QR

  const merchantIdentifier = formatTlv('00', 'et.zemenbank');
  const merchantAccountNumber = formatTlv('01', operatorAccount);
  const merchantAccountInfo = formatTlv('29', merchantIdentifier + merchantAccountNumber);

  const merchantCategoryCode = formatTlv('52', '5812'); // Eating places and restaurants
  const transactionCurrency = formatTlv('53', '230'); // ETB
  const transactionAmount = formatTlv('54', amount.toFixed(2).toString());
  const countryCode = formatTlv('58', 'ET');
  const merchantNameTlv = formatTlv('59', merchantName);

  const additionalDataIdentifier = formatTlv('01', 'ZemenPay');
  const additionalData = formatTlv('62', additionalDataIdentifier);

  const qrString = [
    payloadFormatIndicator,
    pointOfInitiation,
    merchantAccountInfo,
    merchantCategoryCode,
    transactionCurrency,
    transactionAmount,
    countryCode,
    merchantNameTlv,
    additionalData,
  ].join('');

  const crc = formatTlv('63', '04' + calculateCrc16(qrString + '6304'));
  
  return qrString + crc;
}

// CRC-16-CCITT calculation
function calculateCrc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
