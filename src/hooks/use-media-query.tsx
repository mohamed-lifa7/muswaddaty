"use client";
import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        setMatches(mediaQuery.matches);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, [query]);

    return matches;
};
