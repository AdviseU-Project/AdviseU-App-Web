interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
}

export const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-white p-2">
            <div className="flex h-full flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                    <p className="text-sm text-gray-500 italic">"{quote}"</p>
                    <div className="mt-4">
                        <h4 className="font-semibold">{author}</h4>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
