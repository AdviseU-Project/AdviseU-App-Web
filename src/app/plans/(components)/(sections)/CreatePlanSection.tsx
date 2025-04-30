'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Wand, PenLine } from 'lucide-react';
import { NewPlan } from '@/lib/types';
import { useCreatePlan } from '@/hooks/mutations/plans';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { planFormSchema } from '@/lib/schemas/planFormSchema';
import LoadingOverlay from '../YouTubeLoadingOverlay'; // Use '../YouTubeLoadingOverlay' for YouTube Shorts loading screen or '../LoadingOverlay' for normal loading screen

type PlanFormValues = z.infer<typeof planFormSchema>;

interface CreatePlanSectionProps {
    onPlanCreated?: () => void;
}

const CreatePlanSection = ({ onPlanCreated }: CreatePlanSectionProps) => {
    const { mutate, isPending, isSuccess } = useCreatePlan();
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Initialize the form
    const form = useForm<PlanFormValues>({
        resolver: zodResolver(planFormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = (values: PlanFormValues, generate = false) => {
        const newPlan: NewPlan = {
            name: values.name,
            description: values.description || '',
            terms: [],
        };

        if (generate) {
            setIsGenerating(true);
            setShowLoadingOverlay(true);
        }

        mutate(
            { plan: newPlan, generate },
            {
                onSuccess: () => {
                    // Reset form after submission
                    form.reset();

                    // Hide loading overlay
                    setShowLoadingOverlay(false);
                    setIsGenerating(false);

                    // Call the callback if provided
                    if (onPlanCreated) {
                        onPlanCreated();
                    }
                },
                onError: () => {
                    // Hide loading overlay on error too
                    setShowLoadingOverlay(false);
                    setIsGenerating(false);
                },
            }
        );
    };

    return (
        <div className="space-y-5 relative">
            <LoadingOverlay
                isLoading={showLoadingOverlay}
                onClose={() => {
                    if (!isPending) {
                        setShowLoadingOverlay(false);
                    }
                }}
            />

            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit((values) => onSubmit(values, false))();
                    }}
                >
                    <div className="flex flex-col sm:flex-row gap-4 mb-5">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-600">Plan Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <PenLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    placeholder="e.g., Computer Science 2025"
                                                    className="pl-10 border-slate-200 focus-visible:ring-orange-500"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel className="text-sm font-medium text-slate-600">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your academic goals and any special requirements for this plan..."
                                        className="min-h-[100px] border-slate-200 focus-visible:ring-orange-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="pt-3 flex flex-col sm:flex-row gap-3">
                        <Button type="submit" disabled={isPending || isGenerating} variant="orange">
                            <Plus className="mr-2 h-5 w-5" /> Create Plan
                        </Button>
                        <Button
                            type="button"
                            disabled={isPending || !form.formState.isValid || isGenerating}
                            onClick={() => form.handleSubmit((values) => onSubmit(values, true))()}
                            className="sm:flex-none sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium"
                        >
                            <Wand className="mr-2 h-5 w-5" />{' '}
                            {isPending && isGenerating ? 'Generating...' : 'Generate Plan'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreatePlanSection;
