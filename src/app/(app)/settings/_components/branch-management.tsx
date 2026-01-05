
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
import { defaultBranches, Branch } from '../data';
import { CreateBranchDialog } from './create-branch-dialog';


export function BranchManagement() {
    const [branches, setBranches] = React.useState<Branch[]>(defaultBranches);
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);

    const handleAddBranch = (newBranch: { name: string, location: string }) => {
        const branch: Branch = {
            id: `BRANCH-${Math.random().toString(36).substr(2, 9)}`,
            ...newBranch,
        };
        setBranches(currentBranches => [...currentBranches, branch]);
    }

    const columns: ColumnDef<Branch>[] = [
        {
          accessorKey: 'name',
          header: 'Branch Name',
        },
        {
          accessorKey: 'location',
          header: 'Location',
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
                <DropdownMenuItem>Edit Branch</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Branch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ];

    const table = useReactTable({
        data: branches,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <CreateBranchDialog
                isOpen={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onCreateBranch={handleAddBranch}
            />
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Branch Management</CardTitle>
                        <CardDescription>
                            Add, view, and manage bank branches.
                        </CardDescription>
                    </div>
                    <Button asChild className="ml-auto gap-1" onClick={() => setIsCreateOpen(true)}>
                        <div className="cursor-pointer">
                            <PlusCircle className="h-4 w-4" />
                            Add Branch
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
                            No branches found.
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

