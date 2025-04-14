import { Params, SearchParams } from '@/lib/types';
import { auth } from '@/lib/auth';
import SessionNotFound from '@/components/SessionNotFound';
import PlanPageClient from './PlanPageClient';

const Page = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
    const planId = (await params).planId;
    const session = await auth();
    const plan = session?.user?.extension?.plans.find((p) => p._id === planId);

    if (!session?.user) {
        return <SessionNotFound message="to create or see your degree plans" />;
    }

    if (!plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Plan Not Found</h2>
                    <p className="text-gray-600 mb-6">
                        The plan you're looking for doesn't exist or you don't have permission to view it.
                    </p>
                    <a
                        href="/plans"
                        className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700"
                    >
                        Return to Your Plans
                    </a>
                </div>
            </div>
        );
    }

    return <PlanPageClient planId={planId} />;
};

export default Page;
