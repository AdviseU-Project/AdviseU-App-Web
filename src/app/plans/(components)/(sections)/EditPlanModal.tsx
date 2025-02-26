'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlansStore } from '@/app/store';
import { useUpdatePlan } from '@/hooks/mutations/plans';

const EditPlanModal = () => {
    const { editingPlan, setEditingPlan } = usePlansStore();
    const { mutate } = useUpdatePlan();

    const handleUpdatePlan = () => {
        if (!editingPlan || editingPlan.name.trim() === '') return;

        mutate({ plan: editingPlan });
        setEditingPlan(null);
    };
    return (
        <AnimatePresence>
            {editingPlan && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1"
                >
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Edit Plan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col space-y-4">
                                    <Input
                                        placeholder="Plan Name"
                                        value={editingPlan.name}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                        className="border-orange-200 focus:border-orange-500"
                                    />
                                    <Textarea
                                        placeholder="Plan Description"
                                        value={editingPlan.description}
                                        onChange={(e) =>
                                            setEditingPlan({ ...editingPlan, description: e.target.value })
                                        }
                                        className="border-orange-200 focus:border-orange-500"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" onClick={() => setEditingPlan(null)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleUpdatePlan}
                                            className="bg-orange-500 hover:bg-orange-600"
                                        >
                                            Update Plan
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditPlanModal;
