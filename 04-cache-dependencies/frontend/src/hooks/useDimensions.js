import { useState, useEffect } from 'react';

export const SCREEN_SIZES = {
    SMALL: 's',
    MEDIUM: 'm',
    LARGE: 'l'
}

function getWindowDimensions() {
    const { width, height } = window.visualViewport;
    return {
        width,
        height
    };
}

export default function useDimensions() {
    const [{ width, height }, setDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const size = width < 700 ? SCREEN_SIZES.SMALL
        : width < 1080 ? SCREEN_SIZES.MEDIUM
            : SCREEN_SIZES.LARGE;

    return { width, height, size };
}
