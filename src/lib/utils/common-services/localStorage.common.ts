

// Utility function to set data in local storage with optional encryption
export const setLocalStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
        let storedValue = JSON.stringify(value);

        localStorage.setItem(key, storedValue);
    }
};

// Utility function to get data from local storage with optional decryption
export const getLocalStorage = (key: string): any => {
    try {
        if (typeof window !== 'undefined') {
            let storedValue: any = localStorage.getItem(key);
           
            if (!storedValue) {
                return null;
            }

            storedValue = JSON.parse(storedValue);

            try {
                return storedValue;
            } catch (e) {
                return;
            }

        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Utility function to remove data from local storage
export const removeLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
