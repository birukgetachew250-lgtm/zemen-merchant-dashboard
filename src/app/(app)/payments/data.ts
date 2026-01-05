
export type PaymentProvider = {
    id: string;
    name: string;
    type: 'wallet' | 'bank';
    logoUrl: string;
}

export const paymentProviders: PaymentProvider[] = [
    { id: 'telebirr', name: 'Telebirr', type: 'wallet', logoUrl: '/wallet/telebirr.png' },
    { id: 'cbe-birr', name: 'CBE Birr', type: 'wallet', logoUrl: '/wallet/cbe-birr.png' },
    { id: 'm-pesa', name: 'M-PESA', type: 'wallet', logoUrl: '/wallet/mpesa.png' },
    { id: 'hellocash', name: 'HelloCash', type: 'wallet', logoUrl: '/wallet/hellocash.png' },
    { id: 'boa', name: 'Bank of Abyssinia', type: 'bank', logoUrl: '/bank/boa.png' },
    { id: 'awash', name: 'Awash Bank', type: 'bank', logoUrl: '/bank/awash.png' },
    { id: 'dashen', name: 'Dashen Bank', type: 'bank', logoUrl: '/bank/dashen.png' },
    { id: 'zemen', name: 'Zemen Bank', type: 'bank', logoUrl: '/logo.png' },
]
