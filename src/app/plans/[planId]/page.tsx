import { Params, SearchParams } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { auth } from '@/lib/auth';

import CourseSearchSection from './(components)/(sections)/CourseSearchSection';
import PlanOverviewSection from './(components)/(sections)/PlanOverviewSection';
import SessionNotFound from '@/components/SessionNotFound';

const Page = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
    const planId = (await params).planId;

    const session = await auth();

    const plan = session?.user?.extension?.plans.find((p) => p._id === planId);

    if (!session?.user) {
        return <SessionNotFound message="to create or see your degree plans" />;
    }

    return (
        <div className="flex flex-col gap-12 px-10 max-w-full min-h-[94vh] bg-gradient-to-br from-orange-100 to-blue-100">
            <div className="mt-16">
                <h1 className="text-4xl text-center font-bold text-orange-600 mb-2">{plan?.name}</h1>
                <p className="text-center text-lg text-gray-600">{plan?.description}</p>
            </div>

            <Card className="flex gap-5 w-full bg-transparent shadow-none border-none">
                <PlanOverviewSection planId={planId} />
                <CourseSearchSection planId={planId} />
            </Card>
        </div>
    );
};

export default Page;
