'use client';

import { Header } from "@/components/layout/header";
import { RolesSettings } from '../_components/roles-settings';

export default function RolesSettingsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / Roles & Permissions" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                 <div className="max-w-6xl w-full">
                    <RolesSettings />
                </div>
            </main>
        </div>
    );
}
