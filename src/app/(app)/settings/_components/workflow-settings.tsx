
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, GripVertical } from "lucide-react";
import { approvalSteps, initialWorkflow } from '../data';


export function WorkflowSettings() {
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
    );
}
