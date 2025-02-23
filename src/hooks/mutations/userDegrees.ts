import { Degree } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { getSession } from 'next-auth/react';

export const useAddDegree = () => {
    return useMutation({
        mutationKey: ['degrees'],
        mutationFn: (degree: Degree) => addDegree(degree),
        onSuccess: (_, degree) => {
            toast({
                title: `Degree Added: ${degree.program_name}`,
                description: 'Your degree has been added successfully.',
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

const addDegree = async (degree: Degree) => {
    const response = await fetch(`/api/userDegrees`, {
        method: 'POST',
        body: JSON.stringify({ degree }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const useUpdateDegree = () => {
    return useMutation({
        mutationKey: ['degrees'],
        mutationFn: (degree: Degree) => updateDegree(degree),
        onSuccess: (_, degree) => {
            toast({
                title: `Degree Updated: ${degree?.program_name}`,
                description: 'Your degree has been updated successfully.',
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

const updateDegree = async (degree: Degree | null) => {
    if (!degree) return;

    const response = await fetch(`/api/userDegrees/${degree.program_name}`, {
        method: 'PUT',
        body: JSON.stringify({ degree }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const useDeleteDegree = () => {
    return useMutation({
        mutationKey: ['degrees'],
        mutationFn: (degree: Degree) => deleteDegree(degree),
        onSuccess: () => {
            toast({
                title: 'Degree Deleted',
                description: 'Your degree has been deleted successfully.',
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

const deleteDegree = async (degree: Degree | null) => {
    if (!degree) return;

    const response = await fetch(`/api/userDegrees/${degree?.program_name}`, { method: 'DELETE' });
    const data = await response.json();
    return data;
};
