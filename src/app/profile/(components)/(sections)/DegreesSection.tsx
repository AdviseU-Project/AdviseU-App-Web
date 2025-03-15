'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { X, Trash2 } from 'lucide-react';
import { useAddDegree, useDeleteDegree } from '@/hooks/mutations/userDegrees';
import { useFetchDegrees } from '@/hooks/queries/useFetchDegrees';
import type { Degree } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function DegreesSection() {
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
    const { data: degrees, isLoading, isFetching } = useFetchDegrees(searchQuery);
    const addDegree = useAddDegree();
    const deleteDegree = useDeleteDegree();
    const { data: session, update: updateSession } = useSession();

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSearchQuery(search);
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [search]);

    const handleAddDegree = (degree: Degree) => {
        addDegree.mutate(degree);
    };

    const handleDeleteDegree = (degree: Degree) => {
        deleteDegree.mutate(degree, {
            onSuccess: () => {
                updateSession();
            },
        });
    };

    const toggleDescription = (id: string) => {
        setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCancelSearch = () => {
        setSearch('');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Degrees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Input
                        placeholder="Search degrees..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-10 border-orange-300 focus:ring-orange-500"
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleCancelSearch}
                    >
                        <X size={16} />
                    </Button>
                </div>
                {search && (
                    <ScrollArea className="h-[500px] rounded-md border p-4">
                        {search !== searchQuery || isLoading || isFetching ? (
                            <>
                                <Skeleton className="h-16 mb-2 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 mb-2 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 mb-2 rounded-md bg-gray-100" />
                            </>
                        ) : (
                            <ul className="space-y-4">
                                {degrees?.map((degree: Degree) => (
                                    <li key={degree.program_name} className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{degree.program_name}</h3>
                                                <p className="text-sm text-gray-600">Version: {degree.version}</p>
                                                <p className="mt-2 text-sm">
                                                    {expandedDescriptions[degree.program_name]
                                                        ? degree.description
                                                        : `${degree.description.slice(0, 150)}${
                                                              degree.description.length > 150 ? '...' : ''
                                                          }`}
                                                    {degree.description.length > 150 && (
                                                        <button
                                                            onClick={() => toggleDescription(degree.program_name)}
                                                            className="ml-2 text-orange-600 hover:underline"
                                                        >
                                                            {expandedDescriptions[degree.program_name]
                                                                ? 'Show less'
                                                                : 'Show more'}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => handleAddDegree(degree)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ScrollArea>
                )}
                <div>
                    <h4 className="font-semibold mb-2">Added Degrees</h4>
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                        <AnimatePresence>
                            {!session?.user.extension?.degrees || session.user.extension.degrees.length === 0 ? (
                                <p>No degrees added yet.</p>
                            ) : (
                                session.user.extension.degrees.map((degree: Degree) => (
                                    <motion.div
                                        key={degree.program_name}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="mb-4">
                                            <CardContent className="flex justify-between items-center p-4">
                                                <div>
                                                    <h3 className="font-semibold">{degree.program_name}</h3>
                                                    <p className="text-sm text-gray-600">Version: {degree.version}</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleDeleteDegree(degree)}
                                                    className="hover:bg-red-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}
