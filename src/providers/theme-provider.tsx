"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component that wraps the NextThemesProvider component.
 * @param children - The child components to be wrapped by the ThemeProvider.
 * @param props - Additional props to be passed to the NextThemesProvider component.
 * @returns The rendered NextThemesProvider component with the provided children.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
