
'use client';

import { Header } from "@/components/layout/header";
import { GatewaySettings } from '../_components/gateway-settings';

export default function GatewaySettingsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / Gateway" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                 <div className="max-w-6xl w-full">
                    <GatewaySettings />
                </div>
            </main>
        </div>
    );
}
