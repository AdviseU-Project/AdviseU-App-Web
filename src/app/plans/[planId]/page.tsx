import { Params, SearchParams } from '@/lib/types';
import { Card } from '@/components/ui/card';

import CourseSearchSection from './(components)/(sections)/CourseSearchSection';
import PlanOverviewSection from './(components)/(sections)/PlanOverviewSection';
import { auth } from '@/lib/auth';
import SessionNotFound from '@/components/SessionNotFound';

const Page = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
    const planId = Number((await params).planId);
    const session = await auth();

    if (!session?.user) {
        return <SessionNotFound message="to create or see your degree plans" />;
    }

    return (
        <div className="flex flex-col justify-center gap-12 px-10 max-w-full min-h-[94vh] bg-gradient-to-br from-orange-100 to-blue-100">
            <div>
                <h1 className="text-4xl text-center font-bold text-orange-600 mb-2">My Degree Plan</h1>
                <p className="text-lg text-center text-gray-600">Plan ID: {planId}</p>
            </div>

            <Card className="flex gap-5 w-full bg-transparent shadow-none border-none">
                <PlanOverviewSection />
                <CourseSearchSection />
            </Card>
        </div>
    );
};

export default Page;
