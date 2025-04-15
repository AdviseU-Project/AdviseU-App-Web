'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { Term } from '@/lib/types';
import { useDeleteTerm } from '@/hooks/mutations/terms';
import { useTermsStore } from '@/app/store';

interface DeleteTermDialogProps {
    term: Term;
    planId: string;
}

const DeleteTermDialog: React.FC<DeleteTermDialogProps> = ({ term, planId }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { mutate, isPending } = useDeleteTerm();
    const { selectedTerm, selectTerm } = useTermsStore();

    const handleDeleteTerm = () => {
        mutate({ termId: term._id, planId });

        // If the term being deleted is the selected term, deselect it
        if (selectedTerm?._id === term._id) {
            selectTerm(undefined);
        }

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                    <X className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader className="space-y-3">
                    <div className="mx-auto bg-red-50 p-3 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <DialogTitle className="text-center text-xl">Delete Term</DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete <span className="font-semibold text-gray-700">{term.name}</span>
                        ? This action cannot be undone and all courses in this term will be removed from your plan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)} className="sm:flex-1">
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteTerm}
                        disabled={isPending}
                        className="sm:flex-1 gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        {isPending ? 'Deleting...' : 'Delete Term'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteTermDialog;
