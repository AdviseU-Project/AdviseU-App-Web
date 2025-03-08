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
import { X } from 'lucide-react';
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
                <Button variant="ghost" size="icon" className="h-4 w-4 text-gray-600 hover:text-red-500">
                    <X />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Term</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the term "{term.name}"? This action cannot be undone and all
                        courses in this term will be removed from your plan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteTerm} disabled={isPending}>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteTermDialog;
