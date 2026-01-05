
'use client';

import { Header } from "@/components/layout/header";
import { BranchManagement } from '../_components/branch-management';

export default function BranchesSettingsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / Branches" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                 <div className="max-w-6xl w-full">
                    <BranchManagement />
                </div>
            </main>
        </div>
    );
}
