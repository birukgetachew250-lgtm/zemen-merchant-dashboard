
'use client';

import * as React from 'react';
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from './_components/profile-settings';
import { SecuritySettings } from './_components/security-settings';
import { RolesSettings } from './_components/roles-settings';
import { WorkflowSettings } from './_components/workflow-settings';
import { UserManagement } from './_components/user-management';


export default function SettingsPage() {
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Tabs defaultValue="profile" className="max-w-6xl w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                        <TabsTrigger value="workflows">Workflows</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <ProfileSettings />
                    </TabsContent>
                    <TabsContent value="users">
                        <UserManagement />
                    </TabsContent>
                    <TabsContent value="security">
                        <SecuritySettings />
                    </TabsContent>
                    <TabsContent value="roles">
                        <RolesSettings />
                    </TabsContent>
                    <TabsContent value="workflows">
                         <WorkflowSettings />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
