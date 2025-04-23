'use client';

import { createContext, useReducer } from 'react';
import {
  resourceReducer,
  initialResourceState,
} from './resourceReducer/resourceReducer';

export const ResourceContext = createContext();

export function ResourceProvider({ children }) {
  const [state, dispatch] = useReducer(resourceReducer, initialResourceState);

  return (
    <ResourceContext.Provider value={{ state, dispatch }}>
      {children}
    </ResourceContext.Provider>
  );
}
