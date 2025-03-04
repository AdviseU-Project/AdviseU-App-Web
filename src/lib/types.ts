import { ObjectId } from 'mongodb';

export type Term = NewTerm & {
    _id: ObjectId;
};

export type NewTerm = {
    name: string;
    courses?: Course[];
};

export type Course = {
    _id: ObjectId;
    credits: string;
    course_name: string;
    course_number: string;
    department: string;
    description: string;
    prerequisites: string[];
    corequisites: string[];
    offerings: Record<
        string,
        {
            // Offerings will be an object with keys representing terms (fall_2024, winter_2025, spring_2025)
            count: number;
            results: Array<{
                start_date: string;
                end_date: string;
                crn: string;
                instr: string;
                meets: string;
                key: string;
                mpkey: string;
                stat: string;
                isCancelled: string;
                meetingTimes: string;
                schd: string;
                ssrFees: string;
                camp: string;
                no: string;
            }>;
            srcdb: string;
        }
    >;
};

export type Plan = NewPlan & {
    _id: string;
};

export type NewPlan = {
    name: string;
    description: string;
    terms: Term[];
};

type Option = {
    courses: string[];
};

type Series = {
    options: Option[];
};

export type Requirement = {
    amount: string;
    series: Series[];
};

export type Degree = {
    program_name: string;
    program_code: string;
    description: string;
    version: number;
    options: string[];
    offered_locations: string[];
    requirements: Requirement[];
};

/* To be adjusted based on future user preference options */
export type Preferences = {
    likes_outdoors: number;
};

export type ProfileExtension = {
    degrees: Degree[];
    user_preferences: Preferences;
    courses_taken: Course[];
    plans: Plan[];
};

export const defaultExtension: ProfileExtension = {
    degrees: [],
    user_preferences: { likes_outdoors: 0 },
    courses_taken: [],
    plans: [],
};

export type Params = Promise<{ planId: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
