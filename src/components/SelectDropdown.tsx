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
    onChange: (value: string) => void;
}

export function SelectDropdown({ placeholder, label, options, onChange }: SelectDropdownProps) {
    return (
        <Select onValueChange={onChange}>
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
