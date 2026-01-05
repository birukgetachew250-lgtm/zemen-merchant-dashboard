
'use client';

import * as React from 'react';
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox";
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { GripVertical, Trash2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const roles = [
    {
        id: 'admin',
        name: 'Administrator',
        description: 'Has all permissions and can manage roles.',
        permissions: [
            { id: 'dashboard:read', label: 'View Dashboard' },
            { id: 'merchants:read', label: 'View Merchants' },
            { id: 'merchants:create', label: 'Onboard Merchants' },
            { id: 'merchants:update', label: 'Edit Merchants' },
            { id: 'operators:read', label: 'View Operators' },
            { id: 'operators:create', label: 'Onboard Operators' },
            { id: 'transactions:read', label: 'View Transactions' },
            { id: 'reports:read', label: 'View Reports' },
            { id: 'settings:manage', label: 'Manage Settings' },
            { id: 'roles:manage', label: 'Manage Roles & Permissions' },
        ]
    },
    {
        id: 'manager',
        name: 'Manager',
        description: 'Can manage merchants and operators.',
        permissions: [
            { id: 'dashboard:read', label: 'View Dashboard' },
            { id: 'merchants:read', label: 'View Merchants' },
            { id: 'merchants:create', label: 'Onboard Merchants' },
            { id: 'operators:read', label: 'View Operators' },
            { id: 'operators:create', label: 'Onboard Operators' },
            { id: 'transactions:read', label: 'View Transactions' },
            { id: 'reports:read', label: 'View Reports' },
        ]
    },
    {
        id: 'support',
        name: 'Support Staff',
        description: 'Can view data and assist with issues.',
        permissions: [
            { id: 'dashboard:read', label: 'View Dashboard' },
            { id: 'merchants:read', label: 'View Merchants' },
            { id: 'operators:read', label: 'View Operators' },
            { id: 'transactions:read', label: 'View Transactions' },
        ]
    }
];

const approvalSteps = [
    { id: 'compliance', name: 'Compliance Check' },
    { id: 'management', name: 'Management Approval' },
    { id: 'risk', name: 'Risk Assessment' },
    { id: 'legal', name: 'Legal Review' },
];

const initialWorkflow = [
    { id: 1, step: 'compliance' },
    { id: 2, step: 'management' },
]

export default function SettingsPage() {
    const [workflowSteps, setWorkflowSteps] = React.useState(initialWorkflow);

    const handleAddStep = () => {
        const newStep = approvalSteps.find(s => !workflowSteps.some(ws => ws.step === s.id));
        if (newStep) {
            setWorkflowSteps([...workflowSteps, { id: Date.now(), step: newStep.id }]);
        }
    };
    
    const handleRemoveStep = (id: number) => {
        setWorkflowSteps(workflowSteps.filter(step => step.id !== id));
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Settings" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Tabs defaultValue="profile" className="max-w-6xl">
                    <TabsList className="grid w-full grid-cols-2 max-w-lg md:grid-cols-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                        <TabsTrigger value="workflows">Workflows</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue="Bank Admin" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="admin@zemenbank.com" />
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your password and two-factor authentication.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Change Password</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                    <Button>Update Password</Button>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <p className="font-medium">Enable 2FA</p>
                                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="roles">
                        <Card>
                            <CardHeader>
                                <CardTitle>Roles & Permissions</CardTitle>
                                <CardDescription>Define what users can see and do within the application.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {roles.map(role => (
                                        <AccordionItem key={role.id} value={role.id}>
                                            <AccordionTrigger>
                                                <div>
                                                    <p className="font-semibold text-left">{role.name}</p>
                                                    <p className="text-sm text-muted-foreground text-left font-normal">{role.description}</p>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                                                    {role.permissions.map(permission => (
                                                        <div key={permission.id} className="flex items-center space-x-2">
                                                            <Checkbox id={`${role.id}-${permission.id}`} defaultChecked={true} disabled={role.id === 'admin'} />
                                                            <label
                                                                htmlFor={`${role.id}-${permission.id}`}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {permission.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                             <CardFooter>
                                <Button>Save Permissions</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="workflows">
                         <Card>
                            <CardHeader>
                                <CardTitle>Approval Workflows</CardTitle>
                                <CardDescription>Customize the approval process for major activities.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-2">Merchant Onboarding Workflow</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Define the sequence of steps required to approve a new merchant.</p>
                                    <div className="space-y-3">
                                        {workflowSteps.map((flow, index) => {
                                            const stepDetails = approvalSteps.find(s => s.id === flow.step);
                                            return (
                                                <div key={flow.id} className="flex items-center gap-2 p-3 rounded-md border bg-muted/50">
                                                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                                                    <span className="font-semibold text-sm">Step {index + 1}:</span>
                                                    <span className="text-sm">{stepDetails?.name}</span>
                                                    <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" onClick={() => handleRemoveStep(flow.id)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" onClick={handleAddStep} disabled={workflowSteps.length >= approvalSteps.length}>
                                            Add Step
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <Button>Save Workflow</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
