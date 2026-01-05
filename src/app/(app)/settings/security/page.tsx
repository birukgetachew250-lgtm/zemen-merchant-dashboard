'use client';

import { Header } from "@/components/layout/header";
import { SecuritySettings } from '../_components/security-settings';

export default function SecuritySettingsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / Security" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="max-w-6xl w-full">
                    <SecuritySettings />
                </div>
            </main>
        </div>
    );
}
