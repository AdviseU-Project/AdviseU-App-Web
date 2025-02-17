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

interface AddTermButtonProps {
    variant?: ButtonProps['variant'];
    planId: string;
}

const FormSchema = z.object({
    term: z.string({
        required_error: 'Please select a term to display.',
    }),
});

const AddTermButton: React.FC<AddTermButtonProps> = ({ variant, planId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [term, setTerm] = useState<string | null>(null);
    const { mutate } = useCreateTerm();
    const { data } = useSession();

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
    const handleAddTerm = () => {
        if (!term) return;

        mutate({
            term: { name: term, courses: [] },
            planId: planId,
        });
        handleClose();
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

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
                                render={() => (
                                    <FormItem>
                                        <DialogTitle asChild>
                                            <FormLabel>Add Term</FormLabel>
                                        </DialogTitle>
                                        <SelectDropdown
                                            placeholder="Select a Term"
                                            label="Select Term"
                                            options={availableTerms}
                                            onChange={setTerm}
                                        />
                                        <FormDescription>Select the term you would like to add</FormDescription>
                                        <FormMessage>{form.formState.errors.term?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" onClick={handleAddTerm}>
                                Confirm
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddTermButton;
