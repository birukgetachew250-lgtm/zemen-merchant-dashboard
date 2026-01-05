'use client';

import { Header } from "@/components/layout/header";
import { ProfileSettings } from '../_components/profile-settings';

export default function ProfileSettingsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / Profile" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="max-w-6xl w-full">
                    <ProfileSettings />
                </div>
            </main>
        </div>
    );
}
