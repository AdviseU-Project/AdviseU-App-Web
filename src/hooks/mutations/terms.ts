import { NewTerm, Term } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';

interface CreateTermProps {
    term: NewTerm;
    planId: string;
}

export const useCreateTerm = () => {
    return useMutation({
        mutationKey: ['terms'],
        mutationFn: ({ term, planId }: CreateTermProps) => createPlan(term, planId),
        onSuccess: (_, { term, planId }) => {
            toast({
                title: `Added Term: ${term.name}`,
                description: 'Your term has been created successfully.',
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

const createPlan = async (term: NewTerm, planId: string) => {
    const response = await fetch(`/api/terms`, {
        method: 'POST',
        body: JSON.stringify({ term, planId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

interface UpdateTermProps {
    term: Term;
    planId: string;
}

export const useUpdateTerm = () => {
    return useMutation({
        mutationKey: ['terms'],
        mutationFn: ({ term, planId }: UpdateTermProps) => updateTerm(term, planId),
        onSuccess: (_, { term, planId }) => {
            toast({
                title: `Term Updated: ${term.name}`,
                description: 'Your term has been updated successfully.',
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

const updateTerm = async (term: Term, planId: string) => {
    const response = await fetch(`/api/terms/${term._id}`, {
        method: 'PUT',
        body: JSON.stringify({ term, planId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

interface DeleteTermProps {
    termId: ObjectId;
    planId: string;
}

export const useDeleteTerm = () => {
    return useMutation({
        mutationKey: ['terms'],
        mutationFn: ({ termId, planId }: DeleteTermProps) => deleteTerm(termId, planId),
        onSuccess: (_, { termId, planId }) => {
            toast({
                title: 'Term Deleted',
                description: 'Your term has been deleted successfully.',
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

const deleteTerm = async (termId: ObjectId, planId: string) => {
    const response = await fetch(`/api/terms/${termId}?planId=${planId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
};
