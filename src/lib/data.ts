export type Transaction = {
  id: string;
  merchant: string;
  operator: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed' | 'Reconciled';
  type: 'IPS QR' | 'OTP';
  date: string;
};

export const transactions: Transaction[] = [
  { id: 'TXN72901', merchant: 'CMC Branch Cafe', operator: 'Abebe Bikila', amount: 150.00, status: 'Completed', type: 'IPS QR', date: '2023-10-27T10:00:00Z' },
  { id: 'TXN72902', merchant: 'Bole Express', operator: 'Tirunesh Dibaba', amount: 320.50, status: 'Completed', type: 'OTP', date: '2023-10-27T11:30:00Z' },
  { id: 'TXN72903', merchant: 'Saris Supermarket', operator: 'Kenenisa Bekele', amount: 1200.75, status: 'Pending', type: 'IPS QR', date: '2023-10-27T12:15:00Z' },
  { id: 'TXN72904', merchant: 'CMC Branch Cafe', operator: 'Abebe Bikila', amount: 85.25, status: 'Completed', type: 'IPS QR', date: '2023-10-27T14:05:00Z' },
  { id: 'TXN72905', merchant: 'Gift Gallery', operator: 'Gelete Burka', amount: 550.00, status: 'Failed', type: 'OTP', date: '2023-10-27T15:20:00Z' },
  { id: 'TXN72906', merchant: 'Bole Express', operator: 'Tirunesh Dibaba', amount: 45.00, status: 'Reconciled', type: 'IPS QR', date: '2023-10-26T09:45:00Z' },
  { id: 'TXN72907', merchant: 'Saris Supermarket', operator: 'Kenenisa Bekele', amount: 780.30, status: 'Completed', type: 'IPS QR', date: '2023-10-26T18:30:00Z' },
  { id: 'TXN72908', merchant: 'CMC Branch Cafe', operator: 'Abebe Bikila', amount: 200.00, status: 'Completed', type: 'OTP', date: '2023-10-26T19:00:00Z' },
  { id: 'TXN72909', merchant: 'Bole Express', operator: 'Tirunesh Dibaba', amount: 105.00, status: 'Pending', type: 'IPS QR', date: '2023-10-28T08:00:00Z' },
  { id: 'TXN72910', merchant: 'Gift Gallery', operator: 'Gelete Burka', amount: 950.00, status: 'Completed', type: 'OTP', date: '2023-10-28T09:10:00Z' },
];


export type Merchant = {
    id: string;
    name: string;
    branch: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    onboardingDate: string;
    operatorCount: number;
}

export const merchants: Merchant[] = [
    { id: 'MER-001', name: 'CMC Branch Cafe', branch: 'CMC', status: 'Approved', onboardingDate: '2023-01-15', operatorCount: 3 },
    { id: 'MER-002', name: 'Bole Express', branch: 'Bole', status: 'Approved', onboardingDate: '2023-02-20', operatorCount: 5 },
    { id: 'MER-003', name: 'Saris Supermarket', branch: 'Saris', status: 'Pending', onboardingDate: '2023-10-25', operatorCount: 0 },
    { id: 'MER-004', name: 'Gift Gallery', branch: 'Hayahulet', status: 'Approved', onboardingDate: '2023-05-10', operatorCount: 2 },
    { id: 'MER-005', name: '4 Kilo Book Store', branch: '4 Kilo', status: 'Rejected', onboardingDate: '2023-09-01', operatorCount: 0 },
]

export type Operator = {
    id: string;
    name: string;
    merchant: string;
    branch: string;
    salesVolume: number;
    transactionCount: number;
    successRate: number;
    status: 'Active' | 'Inactive' | 'Blocked';
    bankAccount: string;
}

export const operators: Operator[] = [
    { id: 'OP-001', name: 'Abebe Bikila', merchant: 'CMC Branch Cafe', branch: 'CMC', salesVolume: 12500, transactionCount: 150, successRate: 98.5, status: 'Active', bankAccount: '1000012345678' },
    { id: 'OP-002', name: 'Tirunesh Dibaba', merchant: 'Bole Express', branch: 'Bole', salesVolume: 25000, transactionCount: 300, successRate: 99.1, status: 'Active', bankAccount: '1000023456789' },
    { id: 'OP-003', name: 'Kenenisa Bekele', merchant: 'Saris Supermarket', branch: 'Saris', salesVolume: 8000, transactionCount: 90, successRate: 97.2, status: 'Inactive', bankAccount: '1000034567890' },
    { id: 'OP-004', name: 'Gelete Burka', merchant: 'Gift Gallery', branch: 'Hayahulet', salesVolume: 18000, transactionCount: 200, successRate: 99.8, status: 'Active', bankAccount: '1000045678901' },
    { id: 'OP-005', name: 'Haile Gebrselassie', merchant: 'Bole Express', branch: 'Bole', salesVolume: 35000, transactionCount: 450, successRate: 99.5, status: 'Blocked', bankAccount: '1000056789012' },
]

export const dashboardStats = {
    totalVolume: 1250000.50,
    totalTransactions: 3450,
    newMerchants: 12,
    disputes: 5,
}

export const transactionVolumeByDay = [
    { date: 'Mon', volume: 2000 },
    { date: 'Tue', volume: 3000 },
    { date: 'Wed', volume: 2780 },
    { date: 'Thu', volume: 1890 },
    { date: 'Fri', volume: 2390 },
    { date: 'Sat', volume: 3490 },
    { date: 'Sun', volume: 3000 },
];

export const onboardingStats = {
    total: 50,
    approved: 35,
    pending: 10,
    rejected: 5
}
