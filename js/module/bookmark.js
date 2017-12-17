import storage from './storage.js';

const fetchBookmarks = async () => {
    let response = null;

    try {
        response = await storage.get('bookmarks');
        response = response.bookmarks;
    } catch (exception) {
        response = Promise.reject(exception);
    }

    return response;
};

const saveBookmarks = async (list) => {
    let response = null;

    try {
        response = await storage.set('bookmarks', list);
    } catch (exception) {
        response = Promise.reject(exception);
    }

    return response;
};

const isValidUrl = (url) => url.match(/http[s]?:\/\//);
const addBookmark = async (url = '') => {
    if (!isValidUrl(url)) {
        return Promise.reject('Invalid bookmark');
    }

    let result = null;

    try {
        let bookmarks = await fetchBookmarks();

        bookmarks.push(url);

        result = saveBookmarks(bookmarks);
    } catch (exception) {
        result = Promise.reject(exception);
    }

    return result;
};

const removeTrailingSlash = str => str.replace(/\/$/, '');
const removeBookmark = async (url = '') => {
    let result = null;

    try {
        let removedBookmarked = removeTrailingSlash(url);
        let bookmarks = await fetchBookmarks();

        bookmarks = bookmarks.filter(
            bookmark => (
                removeTrailingSlash(bookmark) !== removedBookmarked
            )
        );

        removedBookmarked = null;

        result = saveBookmarks(bookmarks);
    } catch (exception) {
        result = Promise.reject(exception);
    }

    return result;
};

/**
 * Event Listeners
 */

const browserWindow = window;
const browserDoc = document;
const log = console.log;

const bookmarkInput = browserDoc.getElementById('bookmark-input');
const getBookmarkInput = () => bookmarkInput.value;
const clearBookmarkInput = () => {
    bookmarkInput.value = '';
};

const bookmarkList = browserDoc.getElementById('bookmark-list');
const updateBookmarkList = (list = []) => {
    bookmarkList.innerHTML = list.reduce(
        (content, listItem) => (
            content +
            `<li class="bookmark-link-container list-group-item">
            <button class="bookmark-remove btn btn-primary"
                type="button">
                <span class="glyphicon glyphicon-minus"></span>
            </button>
            <a class="bookmark-link"
                href="${listItem}"
                target="_blank">
                ${listItem}
            </a></li>`
        ),
        ''
    );
};

browserDoc.getElementById('bookmark-add')
    .onclick = async (e) => {
        let newBookmark = getBookmarkInput();

        if (newBookmark) {
            try {
                let newBookmarks = await addBookmark(newBookmark);

                updateBookmarkList(newBookmarks);
                clearBookmarkInput();

                newBookmarks = null;
            } catch (exception) {
                log(exception);
            }
        }

        newBookmark = null;
    };

browserDoc.getElementById('bookmark-view-all')
    .onclick = async (e) => {
        try {
            const storedBookmarks = await fetchBookmarks();

            for (let i = storedBookmarks.length; i--;) {
                setTimeout(
                    () => browserWindow.open(
                        storedBookmarks[i],
                        '_blank'
                    ),
                    1000
                );
            }
        } catch (exception) {
            log(exception);
        }
    };

bookmarkList.addEventListener(
    'click',
    async (e) => {
        let target = e.target;
        let isButton = target && target.nodeName === 'BUTTON';
        let isSpan = target && (
            target.nodeName === 'SPAN' &&
            target.parentNode.nodeName === 'BUTTON'
        );

        if (isButton || isSpan) {
            if (isSpan) {
                target = target.parentNode;
            }

            try {
                let newBookmarks = await removeBookmark(
                    target.nextElementSibling.href
                );

                updateBookmarkList(newBookmarks);
            } catch (exception) {
                log(exception);
            }
        }

        target = null;
        isButton = null;
        isSpan = null;
    }
);

/**
 * Main
 */

fetchBookmarks()
    .then(storedBookmarks => updateBookmarkList(storedBookmarks));
