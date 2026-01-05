'use client';

import { Header } from "@/components/layout/header";
import { WorkflowSettings } from '../_components/workflow-settings';

export default function WorkflowSettingsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings / Workflows" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="max-w-6xl w-full">
                    <WorkflowSettings />
                </div>
            </main>
        </div>
    );
}
