// ==UserScript==
// @name        nicovideo-next-video-canceler
// @namespace   https://github.com/dnek
// @version     1.5
// @author      dnek
// @description Automatically click next video cancel button on nicovideo.
// @description:ja    ニコニコ動画の動画再生終了後、次の動画へ遷移する前に自動的にキャンセルボタンをクリックします。連続再生オフは後から公式にも実装されましたが、少し挙動が異なるので使い分けてください。例えばこのスクリプトでは再生終了時に全画面で視聴していた場合、それも自動的に解除します。「nicovideo-autoplay-canceler」「nicovideo-player-expander」は別のスクリプトです。
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
