// ==UserScript==
// @name        nicovideo-next-video-canceler
// @namespace   https://github.com/dnek
// @version     1.3
// @author      dnek
// @description Automatically click next video cancel button on nicovideo.
// @description:ja    ニコニコ動画の動画再生終了後、次の動画へ遷移する前に自動的にキャンセルボタンをクリックするuserscriptです。再生終了時に全画面で視聴していた場合、それも自動的に解除します。自動再生直後に一時停止するUserScriptは「nicovideo-autoplay-canceler」という別のスクリプトです。
// @homepageURL https://github.com/dnek/nicovideo-next-video-canceler
// @updateURL   https://github.com/dnek/nicovideo-next-video-canceler/raw/main/nicovideo-next-video-canceler.user.js
// @downloadURL https://github.com/dnek/nicovideo-next-video-canceler/raw/main/nicovideo-next-video-canceler.user.js
// @match       https://www.nicovideo.jp/watch/*
// @grant       none
// @license     MIT license
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver((mutationList, observer) => {
        mutationList.filter(mutation => mutation.type === 'childList').forEach(mutation => {
            for (const node of mutation.addedNodes) {
                if (
                    node.nodeType === 1 &&
                    node.tagName === 'DIV' &&
                    node.innerHTML.includes('data-element-name="next_video_confirmation_cancel"')
                ) {
                    const buttonEl = node.querySelector('button[data-element-name="next_video_confirmation_cancel"]');
                    if (buttonEl !== null) {
                        buttonEl.click();
                        console.log('next video cancel button clicked.');
                        if (document.fullscreenElement !== null) {
                            document.exitFullscreen()
                                .then(() => {
                                    console.log('exited from full screen.');
                                })
                        }
                    }
                }
            }
        });
    });
    const options = {
        childList: true,
        subtree: true,
    };
    observer.observe(document.body, options);
})();
