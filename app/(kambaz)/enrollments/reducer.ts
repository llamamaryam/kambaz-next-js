import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
    enroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      const exists = state.enrollments.some(
        (enrollment: any) =>
          enrollment.user === payload.user && enrollment.course === payload.course,
      );
      if (exists) return;
      state.enrollments = [
        ...state.enrollments,
        { _id: uuidv4(), user: payload.user, course: payload.course },
      ] as any;
    },
    unenroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === payload.user && enrollment.course === payload.course),
      ) as any;
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;