export default {
    get: (storageName) => (
        new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.get(
                    storageName,
                    resolve
                );
            } catch (exception) {
                reject(exception);
            }
        })
    ),
    set: (
        storageName = '',
        data
    ) => (
        new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.set(
                    {
                        [storageName]: data
                    },
                    () => resolve(data)
                );
            } catch (exception) {
                reject(exception);
            }
        })
    )
};
