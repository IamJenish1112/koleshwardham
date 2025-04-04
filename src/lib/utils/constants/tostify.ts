import { ToastPosition } from 'react-toastify';

// Define toast positions
export const TOAST_POSITION: Record<string, ToastPosition> = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    TOP_CENTER: 'top-center',
    BOTTOM_CENTER: 'bottom-center',
};


// Define toast variants
export const TOAST_VARIANT = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warn',
};

// Define auto-close times in milliseconds
export const TOAST_AUTO_CLOSE = {
    SHORT: 2000, // 2 seconds
    MEDIUM: 3000, // 3 seconds
    LONG: 5000, // 5 seconds
};