'use client';

import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { toast } from '@/hooks/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SelectDropdown } from '@/components/SelectDropdown';
import { Plus } from 'lucide-react';
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
    const { mutate } = useCreateTerm();
    const { data } = useSession();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            term: 'Select a Term',
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!data.term) return;

        mutate({
            term: { name: data.term, courses: [] },
            planId: planId,
        });

        form.reset({
            term: 'Select a Term',
        });

        handleClose();
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
    ].filter((term) => !data?.user?.extension?.plans.find((plan) => plan.terms.find((t) => t.name === term)));

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
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="term"
                                render={({ field }) => (
                                    <FormItem>
                                        <DialogTitle asChild>
                                            <FormLabel>Add Term</FormLabel>
                                        </DialogTitle>
                                        <SelectDropdown
                                            placeholder="Select a Term"
                                            label="Select Term"
                                            options={availableTerms}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        />
                                        <FormDescription>Select the term you would like to add</FormDescription>
                                        <FormMessage>{form.formState.errors.term?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Confirm</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddTermDialog;
