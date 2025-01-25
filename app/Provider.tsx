import { store } from "@/app/redux/features/store";
import React from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: any; // Use React.ReactNode for proper type definition
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>; // Correct JSX syntax
}
