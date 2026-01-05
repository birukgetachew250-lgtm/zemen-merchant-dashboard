
'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { defaultUsers, User } from '../data';
import { InviteUserDialog } from './invite-user-dialog';


export function UserManagement() {
    const [users, setUsers] = React.useState<User[]>(defaultUsers);
    const [isInviteOpen, setIsInviteOpen] = React.useState(false);

    const handleAddUser = (newUser: { name: string, email: string, role: string }) => {
        const user: User = {
            id: `USER-${Math.random().toString(36).substr(2, 9)}`,
            ...newUser,
            status: 'Pending'
        };
        setUsers(currentUsers => [...currentUsers, user]);
    }

    const columns: ColumnDef<User>[] = [
        {
          accessorKey: 'name',
          header: 'Name',
        },
        {
          accessorKey: 'email',
          header: 'Email',
        },
        {
          accessorKey: 'role',
          header: 'Role',
          cell: ({ row }) => <div className="capitalize">{row.original.role}</div>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => <Badge variant={row.original.status === 'Active' ? 'default' : 'secondary'}>{row.original.status}</Badge>,
        },
        {
          id: 'actions',
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit User</DropdownMenuItem>
                <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Deactivate User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <InviteUserDialog
                isOpen={isInviteOpen}
                onOpenChange={setIsInviteOpen}
                onInviteUser={handleAddUser}
            />
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>
                            Invite and manage user roles and permissions.
                        </CardDescription>
                    </div>
                    <Button asChild className="ml-auto gap-1" onClick={() => setIsInviteOpen(true)}>
                        <div className="cursor-pointer">
                            <PlusCircle className="h-4 w-4" />
                            Invite User
                        </div>
                    </Button>
                </CardHeader>
                <CardContent>
                <div className="rounded-md border">
                    <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                            ))}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                            No users found.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
                </CardContent>
            </Card>
        </>
    );
}
