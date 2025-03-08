import { Params, SearchParams } from '@/lib/types';
import { auth } from '@/lib/auth';
import SessionNotFound from '@/components/SessionNotFound';
import PlanPageClient from './PlanPageClient';

// Server component
const Page = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
    const planId = (await params).planId;
    const session = await auth();
    const plan = session?.user?.extension?.plans.find((p) => p._id === planId);

    if (!session?.user) {
        return <SessionNotFound message="to create or see your degree plans" />;
    }

    if (!plan) {
        return null; // TODO: 404 page
    }

    return <PlanPageClient planId={planId} />;
};

export default Page;
