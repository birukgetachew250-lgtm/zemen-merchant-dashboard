export type PaymentProvider = {
    id: string;
    name: string;
    type: 'wallet' | 'bank';
    logoUrl: string;
}

export const paymentProviders: PaymentProvider[] = [
    { id: 'telebirr', name: 'Telebirr', type: 'wallet', logoUrl: '/logos/telebirr.png' },
    { id: 'cbe-birr', name: 'CBE Birr', type: 'wallet', logoUrl: '/logos/cbe-birr.png' },
    { id: 'm-pesa', name: 'M-PESA', type: 'wallet', logoUrl: '/logos/mpesa.png' },
    { id: 'hellocash', name: 'HelloCash', type: 'wallet', logoUrl: '/logos/hellocash.png' },
    { id: 'boa', name: 'Bank of Abyssinia', type: 'bank', logoUrl: '/logos/boa.png' },
    { id: 'awash', name: 'Awash Bank', type: 'bank', logoUrl: '/logos/awash.png' },
    { id: 'dashen', name: 'Dashen Bank', type: 'bank', logoUrl: '/logos/dashen.png' },
    { id: 'zemen', name: 'Zemen Bank', type: 'bank', logoUrl: '/logo.png' },
]
