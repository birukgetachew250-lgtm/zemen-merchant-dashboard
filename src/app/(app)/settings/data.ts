
export type Permission = {
    id: string;
    label: string;
    enabled: boolean;
};

export type Role = {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
};

export const defaultRoles: Role[] = [
    {
        id: 'admin',
        name: 'Administrator',
        description: 'Has all permissions and can manage roles.',
        permissions: [
            { id: 'dashboard:read', label: 'View Dashboard', enabled: true },
            { id: 'merchants:read', label: 'View Merchants', enabled: true },
            { id: 'merchants:create', label: 'Onboard Merchants', enabled: true },
            { id: 'merchants:update', label: 'Edit Merchants', enabled: true },
            { id: 'merchants:approve', label: 'Approve Onboarding', enabled: true },
            { id: 'operators:read', label: 'View Operators', enabled: true },
            { id: 'operators:create', label: 'Onboard Operators', enabled: true },
            { id: 'transactions:read', label: 'View Transactions', enabled: true },
            { id: 'reports:read', label: 'View Reports', enabled: true },
            { id: 'settings:manage', label: 'Manage Settings', enabled: true },
            { id: 'users:manage', label: 'Manage Users', enabled: true },
            { id: 'roles:manage', label: 'Manage Roles & Permissions', enabled: true },
        ]
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

export const approvalSteps = [
    { id: 'compliance', name: 'Compliance Check' },
    { id: 'management', name: 'Management Approval' },
    { id: 'risk', name: 'Risk Assessment' },
    { id: 'legal', name: 'Legal Review' },
];

export const initialWorkflow = [
    { id: 1, step: 'compliance' },
    { id: 2, step: 'management' },
];

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Pending' | 'Inactive';
}

export const defaultUsers: User[] = [
    { id: 'USER-001', name: 'Bank Admin', email: 'admin@zemenbank.com', role: 'admin', status: 'Active' },
    { id: 'USER-002', name: 'Sales Manager', email: 'manager@zemenbank.com', role: 'manager', status: 'Active' },
    { id: 'USER-003', name: 'Customer Support', email: 'support@zemenbank.com', role: 'support', status: 'Active' },
];
