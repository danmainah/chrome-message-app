export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Failed to save state", err);
    }
};

export const loadState = () => {
    try {
        chrome.storage.local.get(['state'], (result) => {
            if(result.state) {
                return JSON.parse(result.state);
            }
        });
    } catch (err) {
        console.error("Failed to load state", err);
        return undefined;
    }
}