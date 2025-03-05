'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { usePlansStore } from '@/app/store';
import { useUpdatePlan } from '@/hooks/mutations/plans';
import { PenLine, Save, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { planFormSchema } from '@/schemas/planFormSchema';

type PlanFormValues = z.infer<typeof planFormSchema>;

const EditPlanModal = () => {
    const { editingPlan, setEditingPlan } = usePlansStore();
    const { mutate, isPending } = useUpdatePlan();

    // Initialize the form
    const form = useForm<PlanFormValues>({
        resolver: zodResolver(planFormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    // Update form values when editingPlan changes
    useEffect(() => {
        if (editingPlan) {
            form.reset({
                name: editingPlan.name || '',
                description: editingPlan.description || '',
            });
        }
    }, [editingPlan, form]);

    const onSubmit = (values: PlanFormValues) => {
        if (!editingPlan) return;

        mutate({
            plan: {
                ...editingPlan,
                name: values.name,
                description: values.description,
            },
        });

        setEditingPlan(null);
    };

    return (
        <Dialog open={!!editingPlan} onOpenChange={(open) => !open && setEditingPlan(null)}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-xl">
                        <PenLine className="h-5 w-5 mr-2 text-orange-600" />
                        Edit Plan
                    </DialogTitle>
                </DialogHeader>

                {editingPlan && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-700">Plan Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Plan Name"
                                                className="border-slate-200 focus-visible:ring-orange-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-700">
                                            Description
                                        </FormLabel>
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

                            <div className="pt-2 pb-1 space-y-1.5">
                                <h3 className="text-sm font-medium text-slate-700 flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                                    Plan Terms
                                </h3>
                                <div className="text-sm text-slate-500 p-3 bg-slate-50 rounded-md">
                                    {(editingPlan.terms || []).length === 0 ? (
                                        <p>This plan has no terms yet. Add terms after saving your changes.</p>
                                    ) : (
                                        <p>
                                            This plan contains {editingPlan.terms?.length}{' '}
                                            {editingPlan.terms?.length === 1 ? 'term' : 'terms'}. You can manage terms
                                            from the plan details page.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <DialogFooter className="pt-4 flex justify-between border-t mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingPlan(null)}
                                    className="border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending || !form.formState.isDirty}
                                    className="bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {isPending ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditPlanModal;
