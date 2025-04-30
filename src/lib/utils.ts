import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Term } from './types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Helper function to format prerequisites/corequisites
const formatRequisites = (requisites: string[][]) => {
    return requisites.map((group, index) => {
        const groupText = group.join(' or ');

        // If there are multiple groups, add parentheses around each group for "and"
        const formattedGroup = requisites.length > 1 ? `(${groupText})` : groupText;

        return `${formattedGroup}${index < requisites.length - 1 ? ' and ' : ''}`;
    });
};

// Scrolls to the element with the given ID (must be on same page)
export const scrolltoHash = function (element_id: string) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
};

// Sorts terms by year and season
const seasonOrder = ['Summer', 'Fall', 'Winter', 'Spring'];
export const sortTerms = (terms: Term[]) => {
    terms.sort((a, b) => {
        const aParts = a.name.split(' ');
        const aSeason = aParts[0];
        const aYear = Number(aParts[1]);

        const bParts = b.name.split(' ');
        const bSeason = bParts[0];
        const bYear = Number(bParts[1]);

        if (a.name === b.name) {
            return 0;
        } else if (aYear < bYear) {
            console.log(a.name, 'less than', b.name);
            return -1;
        } else if (bYear < aYear) {
            console.log(b.name, 'less than', a.name);
            return 1;
        } else if (seasonOrder.indexOf(aSeason) < seasonOrder.indexOf(bSeason)) {
            return -1;
        } else {
            return 1;
        }
    });

    return terms;
};
