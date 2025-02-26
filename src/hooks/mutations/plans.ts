import { NewPlan, Plan } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { getSession } from 'next-auth/react';

export const useCreatePlan = () => {
    return useMutation({
        mutationKey: ['plans'],
        mutationFn: ({ plan, generate }: { plan: NewPlan; generate?: boolean }) => createPlan(plan, generate ?? false),
        onSuccess: (_, variables) => {
            toast({
                title: `Plan Created: ${variables.plan.name}`,
                description: 'Your plan has been created successfully.',
            });

            getSession(); // Refresh session
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};

const createPlan = async (plan: NewPlan, generate: boolean) => {
    const response = await fetch(`/api/plans`, {
        method: 'POST',
        body: JSON.stringify({ plan, generatePlan: generate }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Check if response is not OK (e.g., 500 error)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create plan');
    }

    const data = await response.json();
    return data;
};

export const useUpdatePlan = () => {
    return useMutation({
        mutationKey: ['plans'],
        mutationFn: ({ plan, generate }: { plan: Plan; generate?: boolean }) => updatePlan(plan, generate ?? false),
        onSuccess: (_, variables) => {
            toast({
                title: `Plan Updated: ${variables.plan?.name}`,
                description: 'Your plan has been updated successfully.',
            });

            getSession();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};

const updatePlan = async (plan: Plan, generate: boolean) => {
    if (!plan) return;

    const response = await fetch(`/api/plans/${plan._id}`, {
        method: 'PUT',
        body: JSON.stringify({ plan, generatePlan: generate }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Check if response is not OK (e.g., 500 error)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create plan');
    }

    const data = await response.json();
    return data;
};

export const useDeletePlan = () => {
    return useMutation({
        mutationKey: ['plans'],
        mutationFn: (plan: Plan) => deletePlan(plan),
        onSuccess: () => {
            toast({
                title: 'Plan Deleted',
                description: 'Your plan has been deleted successfully.',
            });

            getSession();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};

const deletePlan = async (plan: Plan | null) => {
    if (!plan) return;

    const response = await fetch(`/api/plans/${plan?._id}`, { method: 'DELETE' });
    const data = await response.json();
    return data;
};
