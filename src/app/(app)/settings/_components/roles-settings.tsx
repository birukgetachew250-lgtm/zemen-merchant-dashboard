
'use client';

import * as React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { defaultRoles } from '../data';


export function RolesSettings() {
    const [roles, setRoles] = React.useState(defaultRoles);

    const handlePermissionChange = (roleId: string, permissionId: string, checked: boolean) => {
        setRoles(currentRoles => 
            currentRoles.map(role => {
                if (role.id === roleId) {
                    const newPermissions = role.permissions.map(p => 
                        p.id === permissionId ? { ...p, enabled: checked } : p
                    );
                    return { ...role, permissions: newPermissions };
                }
                return role;
            })
        );
    };

    return (
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
                                            <Checkbox 
                                                id={`${role.id}-${permission.id}`} 
                                                checked={permission.enabled}
                                                onCheckedChange={(checked) => handlePermissionChange(role.id, permission.id, !!checked)}
                                                disabled={role.id === 'admin'} 
                                            />
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
    );
}
