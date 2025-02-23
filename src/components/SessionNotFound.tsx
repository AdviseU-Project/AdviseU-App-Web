import SignIn from './SignIn';

interface SessionNotFoundProps {
    message: string;
}

const SessionNotFound = ({ message }: SessionNotFoundProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Please Sign In {message}</h1>
            <SignIn />
        </div>
    );
};

export default SessionNotFound;
