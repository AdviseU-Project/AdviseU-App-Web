import ListPlansSection from './(components)/(sections)/ListPlansSection';
import EditPlanModal from './(components)/EditPlanModal';
import RecommendedClassesSection from './(components)/(sections)/RecommendedClassesSection';
import DegreeInfoSection from './(components)/(sections)/DegreeInfoSection';
import { auth } from '@/lib/auth';
import SessionNotFound from '@/components/SessionNotFound';

export default async function PlansPage() {
    const session = await auth();

    if (!session?.user) {
        return <SessionNotFound message="to create or see your degree plans" />;
    }

    // Mock student info - in a real app, this would come from your API or database
    const studentInfo = {
        name: session.user.name || 'Student',
        major: 'Computer Science',
        degree: 'Bachelor of Science',
        minor: 'Mathematics',
        gpa: 3.7,
        creditsCompleted: 72,
        totalCreditsRequired: 180,
        startDate: '2022-09-15',
        anticipatedGraduation: '2026-06-15',
        academicStanding: 'Good Standing',
        department: 'School of Computer Science & Engineering',
        advisor: 'Dr. Sarah Johnson',
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Welcome banner */}
            <div className="w-full bg-gradient-to-r from-orange-600 to-orange-700 pt-12 pb-44 relative">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-white">Welcome back, {session.user.name || 'Student'}</h1>
                    <p className="text-orange-50 mt-1 text-sm sm:text-base">
                        Manage your academic journey with personalized degree plans, progress tracking, and course
                        recommendations.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-32">
                {/* Left page section */}
                <div className="grid lg:grid-cols-11 gap-5">
                    <div className="lg:col-span-8 space-y-6">
                        <ListPlansSection />

                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-6">
                                <RecommendedClassesSection />
                            </div>
                        </div>
                    </div>

                    {/* Right page section */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-lg shadow-md relative overflow-hidden mt-16 lg:mt-0">
                            <div className="absolute top-0 right-0 w-1 h-full bg-orange-500"></div>
                            <div className="p-0">
                                <DegreeInfoSection studentInfo={studentInfo} />
                            </div>
                        </div>
                    </div>
                </div>

                <EditPlanModal />
            </div>
        </div>
    );
}
