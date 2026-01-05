'use client';

import { Header } from "@/components/layout/header";
import { UserManagement } from '../_components/user-management';

export default function UserManagementPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / User Management" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="max-w-6xl w-full">
                    <UserManagement />
                </div>
            </main>
        </div>
    );
}
