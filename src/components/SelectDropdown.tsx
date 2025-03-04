import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectDropdownProps {
    placeholder?: string;
    label?: string;
    options: string[];
    onValueChange: (value: string) => void;
    value: string;
}

export function SelectDropdown({ placeholder, label, options, onValueChange, value }: SelectDropdownProps) {
    return (
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger className="w-[55%]">
                <SelectValue placeholder={placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label ?? 'Select Option'}</SelectLabel>
                    {options?.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
