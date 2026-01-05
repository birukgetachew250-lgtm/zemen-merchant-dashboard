
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
        permissions: allPermissions.filter(p => ![
            'settings:manage', 
            'users:manage', 
            'roles:manage'
        ].includes(p.id)).map(p => ({ ...p, enabled: true }))
    },
    {
        id: 'support',
        name: 'Support Staff',
        description: 'Can view data and assist with issues.',
        permissions: allPermissions.filter(p => [
            'dashboard:read',
            'transactions:read'
        ].includes(p.id)).map(p => ({ ...p, enabled: true }))
    }
];

const defaultBranches = [
    { id: 'BRANCH-001', name: 'Head Office', location: 'Addis Ababa' },
    { id: 'BRANCH-002', name: 'Bole Branch', location: 'Bole, Addis Ababa' },
    { id: 'BRANCH-003', name: 'Mekelle Branch', location: 'Mekelle' },
];

async function main() {
    console.log(`Start seeding ...`);

    // --- Permissions ---
    console.log('Seeding permissions...');
    for (const p of allPermissions) {
        await prisma.permission.upsert({
            where: { id: p.id },
            update: {},
            create: p,
        });
    }

    // --- Roles and RolePermissions ---
    console.log('Seeding roles...');
    for (const roleData of defaultRoles) {
        await prisma.role.upsert({
            where: { id: roleData.id },
            update: { name: roleData.name, description: roleData.description },
            create: { id: roleData.id, name: roleData.name, description: roleData.description },
        });

        const enabledPermissions = roleData.permissions.filter(p => p.enabled).map(p => p.id);
        
        // Remove old permissions
        await prisma.rolePermission.deleteMany({
            where: { 
                roleId: roleData.id,
                permissionId: { notIn: enabledPermissions }
            }
        });

        // Add new permissions
        for (const permId of enabledPermissions) {
            await prisma.rolePermission.upsert({
                where: { roleId_permissionId: { roleId: roleData.id, permissionId: permId } },
                update: {},
                create: { roleId: roleData.id, permissionId: permId },
            });
        }
    }

    // --- Branches ---
    console.log('Seeding branches...');
    for (const branch of defaultBranches) {
        await prisma.branch.upsert({
            where: { id: branch.id },
            update: {},
            create: branch,
        });
    }

    // --- Users ---
    console.log('Seeding users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt); // Default password

    await prisma.user.upsert({
        where: { email: 'admin@zemenbank.com' },
        update: {},
        create: { id: 'USER-001', name: 'Bank Admin', email: 'admin@zemenbank.com', username: 'bank.admin', roleId: 'admin', status: 'Active', branchId: 'BRANCH-001', password: hashedPassword },
    });
    await prisma.user.upsert({
        where: { email: 'manager@zemenbank.com' },
        update: {},
        create: { id: 'USER-002', name: 'Sales Manager', email: 'manager@zemenbank.com', username: 'sales.manager', roleId: 'manager', status: 'Active', branchId: 'BRANCH-002', password: hashedPassword },
    });
    await prisma.user.upsert({
        where: { email: 'support@zemenbank.com' },
        update: {},
        create: { id: 'USER-003', name: 'Customer Support', email: 'support@zemenbank.com', username: 'customer.support', roleId: 'support', status: 'Active', branchId: 'BRANCH-001', password: hashedPassword },
    });
    
    // --- Merchants ---
    console.log('Seeding merchants...');
    const merchants = [
        { id: 'MER-001', name: 'CMC Branch Cafe', branch: 'CMC', status: 'Approved', onboardingDate: new Date('2023-01-15'), operatorCount: 1 },
        { id: 'MER-002', name: 'Bole Express', branch: 'Bole', status: 'Approved', onboardingDate: new Date('2023-02-20'), operatorCount: 2 },
        { id: 'MER-003', name: 'Saris Supermarket', branch: 'Saris', status: 'Pending', onboardingDate: new Date('2023-10-25'), operatorCount: 1 },
        { id: 'MER-004', name: 'Gift Gallery', branch: 'Hayahulet', status: 'Approved', onboardingDate: new Date('2023-05-10'), operatorCount: 1 },
        { id: 'MER-005', name: '4 Kilo Book Store', branch: '4 Kilo', status: 'Rejected', onboardingDate: new Date('2023-09-01'), operatorCount: 0 },
    ];
    for (const merchant of merchants) {
        await prisma.merchant.upsert({ where: { id: merchant.id }, update: {}, create: merchant });
    }

    // --- Operators ---
    console.log('Seeding operators...');
    const operators = [
        { id: 'OP-001', name: 'Abebe Bikila', merchantId: 'MER-001', branch: 'CMC', salesVolume: 12500, transactionCount: 150, successRate: 98.5, status: 'Active', bankAccount: '1000012345678' },
        { id: 'OP-002', name: 'Tirunesh Dibaba', merchantId: 'MER-002', branch: 'Bole', salesVolume: 25000, transactionCount: 300, successRate: 99.1, status: 'Active', bankAccount: '1000023456789' },
        { id: 'OP-003', name: 'Kenenisa Bekele', merchantId: 'MER-003', branch: 'Saris', salesVolume: 8000, transactionCount: 90, successRate: 97.2, status: 'Inactive', bankAccount: '1000034567890' },
        { id: 'OP-004', name: 'Gelete Burka', merchantId: 'MER-004', branch: 'Hayahulet', salesVolume: 18000, transactionCount: 200, successRate: 99.8, status: 'Active', bankAccount: '1000045678901' },
        { id: 'OP-005', name: 'Haile Gebrselassie', merchantId: 'MER-002', branch: 'Bole', salesVolume: 35000, transactionCount: 450, successRate: 99.5, status: 'Blocked', bankAccount: '1000056789012' },
    ];
    for (const operator of operators) {
        await prisma.operator.upsert({ where: { id: operator.id }, update: {}, create: operator });
    }
    
    // --- Transactions ---
    console.log('Seeding transactions...');
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
    for (const tx of transactions) {
        await prisma.transaction.upsert({ where: { id: tx.id }, update: {}, create: tx });
    }

    // --- Disputes ---
    console.log('Seeding disputes...');
    const disputes = [
        { id: 'DIS-001', transactionId: 'TXN72905', reason: 'Customer claims they did not authorize this payment.', status: 'OPEN' },
        { id: 'DIS-002', transactionId: 'TXN72901', reason: 'Incorrect amount charged.', status: 'OPEN' },
    ];
    for (const dispute of disputes) {
        await prisma.dispute.upsert({ where: { id: dispute.id }, update: {}, create: dispute });
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
