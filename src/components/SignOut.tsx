import { signOut } from '@/lib/auth';
import { Button } from './ui/button';

export default function SignOut() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
            className="relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md pointer-events-none"></div>
            <Button variant="outline" type="submit" className="bg-gray-50 hover:bg-gray-100 border border-gray-300">
                Log Out
            </Button>
        </form>
    );
}
