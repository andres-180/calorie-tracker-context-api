import { useMemo, useReducer, type ReactNode } from "react";
import { activityReducer, initialState } from "../reducers/activity-reducer";
import { ActivityContext } from "./ActivityContext";
import type { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
  children: ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  const consumedCalories = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + +activity.calories : total, 0), [state.activities])
  const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category == 2 ? total + +activity.calories : total, 0), [state.activities])
  const totalCalories = useMemo(() => consumedCalories - caloriesBurned, [state.activities])

  const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => (cat.id === category ? cat.name : '')), [state.activities])

  const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])
  
  return (
    <ActivityContext.Provider 
    value={{state, dispatch, consumedCalories, caloriesBurned, totalCalories, categoryName, isEmptyActivities}}>
        {children}
    </ActivityContext.Provider>
  );
};
