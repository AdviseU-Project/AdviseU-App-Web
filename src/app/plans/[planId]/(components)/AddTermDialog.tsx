'use client';

import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SelectDropdown } from '@/components/SelectDropdown';
import { Calendar, CheckCircle, Plus } from 'lucide-react';
import { useCreateTerm } from '@/hooks/mutations/terms';
import { useSession } from 'next-auth/react';

interface AddTermDialogProps {
    variant?: ButtonProps['variant'];
    planId: string;
}

const FormSchema = z.object({
    term: z.string({
        required_error: 'Please select a term to display.',
    }),
});

const AddTermDialog: React.FC<AddTermDialogProps> = ({ variant, planId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate, isPending } = useCreateTerm();
    const { data } = useSession();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            term: '',
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!data.term) return;

        mutate({
            term: { name: data.term, courses: [] },
            planId: planId,
        });

        form.reset({
            term: '',
        });
    }

    const availableTerms = [
        'Fall 2024',
        'Winter 2025',
        'Spring 2025',
        'Summer 2025',
        'Fall 2025',
        'Winter 2026',
        'Spring 2026',
        'Summer 2026',
        'Fall 2026',
        'Winter 2027',
        'Spring 2027',
        'Summer 2027',
        'Fall 2027',
        'Winter 2028',
        'Spring 2028',
    ].filter(
        (termName) =>
            !data?.user?.extension?.plans
                .find((plan) => plan._id === planId)
                ?.terms.find((existingTerm) => termName === existingTerm.name)
    );

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant={variant} onClick={handleOpen} className="add-term-button">
                        Add Term
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="mx-auto bg-gray-100 p-3 rounded-full mb-2">
                            <Calendar className="h-6 w-6 text-gray-600" />
                        </div>
                        <DialogTitle className="text-center text-xl">Add Academic Term</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
                            <FormField
                                control={form.control}
                                name="term"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">Select Term</FormLabel>
                                        <SelectDropdown
                                            placeholder="Choose academic term"
                                            label="Available Terms"
                                            options={availableTerms}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        />
                                        <FormDescription className="text-xs text-gray-500">
                                            Select the academic term you want to add to your plan
                                        </FormDescription>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                    className="sm:flex-1 border-gray-200"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending || !form.formState.isValid}
                                    className="sm:flex-1 gap-2"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    {isPending ? 'Adding...' : 'Add Term'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddTermDialog;
