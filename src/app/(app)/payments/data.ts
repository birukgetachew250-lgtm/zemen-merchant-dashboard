
export type PaymentProvider = {
    id: string;
    name: string;
    type: 'wallet' | 'bank';
    logoUrl: string;
}

export const paymentProviders: PaymentProvider[] = [
    { id: 'telebirr', name: 'Telebirr', type: 'wallet', logoUrl: 'https://picsum.photos/seed/telebirr/80/40' },
    { id: 'cbe-birr', name: 'CBE Birr', type: 'wallet', logoUrl: 'https://picsum.photos/seed/cbebirr/80/40' },
    { id: 'm-pesa', name: 'M-PESA', type: 'wallet', logoUrl: 'https://picsum.photos/seed/mpesa/80/40' },
    { id: 'hellocash', name: 'HelloCash', type: 'wallet', logoUrl: 'https://picsum.photos/seed/hellocash/80/40' },
    { id: 'boa', name: 'Bank of Abyssinia', type: 'bank', logoUrl: 'https://picsum.photos/seed/boa/80/40' },
    { id: 'awash', name: 'Awash Bank', type: 'bank', logoUrl: 'https://picsum.photos/seed/awash/80/40' },
    { id: 'dashen', name: 'Dashen Bank', type: 'bank', logoUrl: 'https://picsum.photos/seed/dashen/80/40' },
    { id: 'zemen', name: 'Zemen Bank', type: 'bank', logoUrl: '/logo.png' },
]
