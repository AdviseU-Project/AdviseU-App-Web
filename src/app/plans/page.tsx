import RecommendedClassesSection from './(components)/(sections)/RecommendedClassesSection';
import CreatePlanSection from './(components)/(sections)/CreatePlanSection';
import ListPlansSection from './(components)/(sections)/ListPlansSection';
import EditPlanModal from './(components)/(sections)/EditPlanModal';
import DegreeProgressSection from './(components)/(sections)/DegreeProgressSection';
import { auth } from '@/lib/auth';
import SessionNotFound from '@/components/SessionNotFound';

export default async function PlansPage() {
    const session = await auth();

    if (!session?.user) {
        return <SessionNotFound message="to create or see your degree plans" />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Degree Planning</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <CreatePlanSection />
                    <ListPlansSection />
                </div>

                <div>
                    <DegreeProgressSection />
                    <RecommendedClassesSection />
                </div>
            </div>

            <EditPlanModal />
        </div>
    );
}
