import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const allPermissions = [
    { id: 'dashboard:read', label: 'View Dashboard' },
    { id: 'merchants:read', label: 'View Merchants' },
    { id: 'merchants:create', label: 'Onboard Merchants' },
    { id: 'merchants:update', label: 'Edit Merchants' },
    { id: 'merchants:approve', label: 'Approve Onboarding' },
    { id: 'operators:read', label: 'View Operators' },
    { id: 'operators:create', label: 'Onboard Operators' },
    { id: 'transactions:read', label: 'View Transactions' },
    { id: 'reports:read', label: 'View Reports' },
    { id: 'settings:manage', label: 'Manage Settings' },
    { id: 'users:manage', label: 'Manage Users' },
    { id: 'roles:manage', label: 'Manage Roles & Permissions' },
];

const defaultRoles = [
    {
        id: 'admin',
        name: 'Administrator',
        description: 'Has all permissions and can manage roles.',
        permissions: allPermissions.map(p => ({ ...p, enabled: true }))
    },
    {
        id: 'manager',
        name: 'Manager',
        description: 'Can manage merchants and operators.',
        permissions: [
            { id: 'dashboard:read', label: 'View Dashboard', enabled: true },
            { id: 'merchants:read', label: 'View Merchants', enabled: true },
            { id: 'merchants:create', label: 'Onboard Merchants', enabled: true },
            { id: 'merchants:approve', label: 'Approve Onboarding', enabled: true },
            { id: 'operators:read', label: 'View Operators', enabled: true },
            { id: 'operators:create', label: 'Onboard Operators', enabled: true },
            { id: 'transactions:read', label: 'View Transactions', enabled: true },
            { id: 'reports:read', label: 'View Reports', enabled: true },
            { id: 'settings:manage', label: 'Manage Settings', enabled: false },
            { id: 'users:manage', label: 'Manage Users', enabled: false },
            { id: 'roles:manage', label: 'Manage Roles & Permissions', enabled: false },
        ]
    },
    {
        id: 'support',
        name: 'Support Staff',
        description: 'Can view data and assist with issues.',
        permissions: [
            { id: 'dashboard:read', label: 'View Dashboard', enabled: true },
            { id: 'merchants:read', label: 'View Merchants', enabled: false },
            { id: 'merchants:create', label: 'Onboard Merchants', enabled: false },
            { id: 'merchants:approve', label: 'Approve Onboarding', enabled: false },
            { id: 'operators:read', label: 'View Operators', enabled: false },
            { id: 'operators:create', label: 'Onboard Operators', enabled: false },
            { id: 'transactions:read', label: 'View Transactions', enabled: true },
            { id: 'reports:read', label: 'View Reports', enabled: false },
            { id: 'settings:manage', label: 'Manage Settings', enabled: false },
            { id: 'users:manage', label: 'Manage Users', enabled: false },
            { id: 'roles:manage', label: 'Manage Roles & Permissions', enabled: false },
        ]
    }
];

const defaultBranches = [
    { id: 'BRANCH-001', name: 'Head Office', location: 'Addis Ababa' },
    { id: 'BRANCH-002', name: 'Bole Branch', location: 'Bole, Addis Ababa' },
    { id: 'BRANCH-003', name: 'Mekelle Branch', location: 'Mekelle' },
];

const defaultUsers = [
    { id: 'USER-001', name: 'Bank Admin', email: 'admin@zemenbank.com', username: 'bank.admin', roleId: 'admin', status: 'Active', branchId: 'BRANCH-001' },
    { id: 'USER-002', name: 'Sales Manager', email: 'manager@zemenbank.com', username: 'sales.manager', roleId: 'manager', status: 'Active', branchId: 'BRANCH-002' },
    { id: 'USER-003', name: 'Customer Support', email: 'support@zemenbank.com', username: 'customer.support', roleId: 'support', status: 'Active', branchId: 'BRANCH-001' },
];

const merchants = [
    { id: 'MER-001', name: 'CMC Branch Cafe', branch: 'CMC', status: 'Approved', onboardingDate: new Date('2023-01-15'), operatorCount: 3 },
    { id: 'MER-002', name: 'Bole Express', branch: 'Bole', status: 'Approved', onboardingDate: new Date('2023-02-20'), operatorCount: 5 },
    { id: 'MER-003', name: 'Saris Supermarket', branch: 'Saris', status: 'Pending', onboardingDate: new Date('2023-10-25'), operatorCount: 0 },
    { id: 'MER-004', name: 'Gift Gallery', branch: 'Hayahulet', status: 'Approved', onboardingDate: new Date('2023-05-10'), operatorCount: 2 },
    { id: 'MER-005', name: '4 Kilo Book Store', branch: '4 Kilo', status: 'Rejected', onboardingDate: new Date('2023-09-01'), operatorCount: 0 },
];

const operators = [
    { id: 'OP-001', name: 'Abebe Bikila', merchantId: 'MER-001', branch: 'CMC', salesVolume: 12500, transactionCount: 150, successRate: 98.5, status: 'Active', bankAccount: '1000012345678' },
    { id: 'OP-002', name: 'Tirunesh Dibaba', merchantId: 'MER-002', branch: 'Bole', salesVolume: 25000, transactionCount: 300, successRate: 99.1, status: 'Active', bankAccount: '1000023456789' },
    { id: 'OP-003', name: 'Kenenisa Bekele', merchantId: 'MER-003', branch: 'Saris', salesVolume: 8000, transactionCount: 90, successRate: 97.2, status: 'Inactive', bankAccount: '1000034567890' },
    { id: 'OP-004', name: 'Gelete Burka', merchantId: 'MER-004', branch: 'Hayahulet', salesVolume: 18000, transactionCount: 200, successRate: 99.8, status: 'Active', bankAccount: '1000045678901' },
    { id: 'OP-005', name: 'Haile Gebrselassie', merchantId: 'MER-002', branch: 'Bole', salesVolume: 35000, transactionCount: 450, successRate: 99.5, status: 'Blocked', bankAccount: '1000056789012' },
];

const transactions = [
  { id: 'TXN72901', merchantId: 'MER-001', operatorId: 'OP-001', amount: 150.00, status: 'Completed', type: 'IPS_QR', date: new Date('2023-10-27T10:00:00Z') },
  { id: 'TXN72902', merchantId: 'MER-002', operatorId: 'OP-002', amount: 320.50, status: 'Completed', type: 'OTP', date: new Date('2023-10-27T11:30:00Z') },
  { id: 'TXN72903', merchantId: 'MER-003', operatorId: 'OP-003', amount: 1200.75, status: 'Pending', type: 'IPS_QR', date: new Date('2023-10-27T12:15:00Z') },
  { id: 'TXN72904', merchantId: 'MER-001', operatorId: 'OP-001', amount: 85.25, status: 'Completed', type: 'IPS_QR', date: new Date('2023-10-27T14:05:00Z') },
  { id: 'TXN72905', merchantId: 'MER-004', operatorId: 'OP-004', amount: 550.00, status: 'Failed', type: 'OTP', date: new Date('2023-10-27T15:20:00Z') },
  { id: 'TXN72906', merchantId: 'MER-002', operatorId: 'OP-002', amount: 45.00, status: 'Reconciled', type: 'IPS_QR', date: new Date('2023-10-26T09:45:00Z') },
  { id: 'TXN72907', merchantId: 'MER-003', operatorId: 'OP-003', amount: 780.30, status: 'Completed', type: 'IPS_QR', date: new Date('2023-10-26T18:30:00Z') },
  { id: 'TXN72908', merchantId: 'MER-001', operatorId: 'OP-001', amount: 200.00, status: 'Completed', type: 'OTP', date: new Date('2023-10-26T19:00:00Z') },
  { id: 'TXN72909', merchantId: 'MER-002', operatorId: 'OP-002', amount: 105.00, status: 'Pending', type: 'IPS_QR', date: new Date('2023-10-28T08:00:00Z') },
  { id: 'TXN72910', merchantId: 'MER-004', operatorId: 'OP-004', amount: 950.00, status: 'Completed', type: 'OTP', date: new Date('2023-10-28T09:10:00Z') },
];


async function main() {
    console.log(`Start seeding ...`);

    // --- Permissions ---
    for (const p of allPermissions) {
        await prisma.permission.upsert({
            where: { id: p.id },
            update: {},
            create: p,
        });
    }

    // --- Roles and RolePermissions ---
    for (const role of defaultRoles) {
        await prisma.role.upsert({
            where: { id: role.id },
            update: { name: role.name, description: role.description },
            create: { id: role.id, name: role.name, description: role.description },
        });

        for (const perm of role.permissions) {
            if (perm.enabled) {
                await prisma.rolePermission.upsert({
                    where: {
                        roleId_permissionId: {
                            roleId: role.id,
                            permissionId: perm.id
                        }
                    },
                    update: {},
                    create: {
                        roleId: role.id,
                        permissionId: perm.id
                    }
                });
            }
        }
    }

    // --- Branches ---
    for (const branch of defaultBranches) {
        await prisma.branch.upsert({
            where: { id: branch.id },
            update: {},
            create: branch,
        });
    }

    // --- Users ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt); // Default password

    for (const user of defaultUsers) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                ...user,
                password: hashedPassword,
            },
        });
    }
    
    // --- Merchants ---
    for (const merchant of merchants) {
        await prisma.merchant.upsert({
            where: { id: merchant.id },
            update: {},
            create: merchant
        });
    }

    // --- Operators ---
    for (const operator of operators) {
        await prisma.operator.upsert({
            where: { id: operator.id },
            update: {},
            create: operator,
        });
    }
    
    // --- Transactions ---
    for (const tx of transactions) {
        await prisma.transaction.upsert({
            where: { id: tx.id },
            update: {},
            create: tx,
        });
    }

    console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
