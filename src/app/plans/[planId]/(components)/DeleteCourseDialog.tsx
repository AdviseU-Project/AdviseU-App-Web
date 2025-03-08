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
import { Trash2 } from 'lucide-react';
import { Course, Term } from '@/lib/types';
import { useUpdateTerm } from '@/hooks/mutations/terms';

interface DeleteCourseDialogProps {
    course: Course;
    term: Term;
    planId: string;
}

const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({ course, term, planId }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const { mutate: updateTerm, isPending, isSuccess } = useUpdateTerm();

    const handleDeleteCourse = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!term) {
            return;
        }
        updateTerm({
            term: {
                ...term,
                courses: term.courses?.filter((c) => c._id !== course._id),
            },
            planId,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Trash2 className="text-red-700" size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remove Course</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove "{course.course_name}" from {term.name}? This course will be
                        removed from your plan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteCourse} disabled={isPending || isSuccess}>
                        {isPending || isSuccess ? 'Removing...' : 'Remove Course'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCourseDialog;
