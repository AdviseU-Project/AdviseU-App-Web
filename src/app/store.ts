import { Course, Plan, Term } from '@/lib/types';
import { create } from 'zustand';

type TermsStore = {
    terms: Term[];
    selectedTerm: Term | null;
    selectTerm: (term: Term | null) => void;
    addTerm: (term: Term) => void;
    removeTerm: (term: Term) => void;
    initTerms: (terms: Term[]) => void;
    addCourseToTerm: (term: Term, course: Course) => void;
    removeCourseFromTerm: (term: Term, course: Course) => void;
};

export const useTermsStore = create<TermsStore>((set) => ({
    terms: [],
    selectedTerm: null,
    selectTerm: (term) => set({ selectedTerm: term }),
    addTerm: (term) => set((state) => ({ terms: [...state.terms, term] })),
    removeTerm: (term) =>
        set((state) => ({
            terms: state.terms.filter((t) => t._id !== term._id),
            selectedTerm: state.selectedTerm === term ? null : state.selectedTerm,
        })),
    initTerms: (terms) => set({ terms }),
    addCourseToTerm: (term, course) => {
        set((state) => ({
            terms: state.terms.map((t) => {
                if (t._id === term._id) {
                    return {
                        ...t,
                        courses: [...t.courses, course],
                    };
                }
                return t;
            }),
        }));
    },
    removeCourseFromTerm: (term, course) => {
        set((state) => ({
            terms: state.terms.map((t) => {
                if (t._id === term._id) {
                    return {
                        ...t,
                        courses: t.courses.filter((c) => c.course_number !== course.course_number),
                    };
                }
                return t;
            }),
        }));
    },
}));

type PlansStore = {
    plans: Plan[];
    editingPlan: Plan | null;
    addPlan: (plan: Plan) => void;
    removePlan: (plan: Plan) => void;
    deletePlan: (plan: Plan) => void;
    setEditingPlan: (plan: Plan | null) => void;
    initPlans: (plans: Plan[]) => void;
    updatePlans: (plans: Plan[]) => void;
};

export const usePlansStore = create<PlansStore>((set) => ({
    plans: [],
    editingPlan: null,
    addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
    removePlan: (plan) => set((state) => ({ plans: state.plans.filter((p) => p._id !== plan._id) })),
    deletePlan: (plan) => set((state) => ({ plans: state.plans.filter((p) => p._id !== plan._id) })),
    setEditingPlan: (plan) => set({ editingPlan: plan }),
    initPlans: (plans) => set({ plans }),
    updatePlans: (plans) => set({ plans }),
}));
