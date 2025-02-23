import ProfileForm from './(components)/ProfileForm';
import { auth } from '@/lib/auth';
import SessionNotFound from '@/components/SessionNotFound';

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        return <SessionNotFound message="to edit or see your profile" />;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-orange-600 mb-8">Your Profile</h1>
            <ProfileForm />
        </div>
    );
}
