// ==UserScript==
// @name        nicovideo-next-video-canceler
// @namespace   https://github.com/dnek
// @version     1.7
// @author      dnek
// @description ニコニコ動画の連続再生オフ機能を、公式より少し便利にします（プレイリストは普通に連続再生、動画終了時に全画面を自動解除）。※公式のプレイヤー設定の「次の動画を自動再生」はONのままにしてください。「nicovideo-autoplay-canceler」「nicovideo-player-expander」は別のスクリプトです。
// @description:ja    ニコニコ動画の連続再生オフ機能を、公式より少し便利にします（プレイリストは普通に連続再生、動画終了時に全画面を自動解除）。※公式のプレイヤー設定の「次の動画を自動再生」はONのままにしてください。「nicovideo-autoplay-canceler」「nicovideo-player-expander」は別のスクリプトです。
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
                        } else {
                            const browserFullButtonEl = document.querySelector('button[aria-label="ブラウザ内最大化解除（b）"]');
                            if (browserFullButtonEl !== null) {
                                browserFullButtonEl.click();
                                console.log('browserfull exit button clicked.');
                            }
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
