import config from './config.js';
import session from './session.js';

const browser = chrome;
const browserWindow = window;
const browserDoc = document;

const defaultBgImage = `url('${
    browser.extension.getURL(config.bg)
}')`;
const getStoredBgImage = () => (session.get('bg') || '');
const setStoredBgImage = (bg) => session.set('bg', bg);
const setContainerBgImage = (bg) => {
    const container = browserDoc.getElementById('container');

    container.style['background-image'] = bg;
    container.style['background-size'] = 'cover';
};

browserWindow.requestAnimationFrame(
    () => {
        let bgImage = getStoredBgImage();

        if (!bgImage) {
            bgImage = defaultBgImage;
            setStoredBgImage(bgImage);
        }

        setContainerBgImage(bgImage);

        bgImage = null;
    }
);
