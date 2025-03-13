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

                        const fullScreenButtonEl = document.querySelector('button[aria-label="ブラウザ内最大化解除（b）"]') || document.querySelector('button[aria-label="全画面表示を終了"]');
                        if (fullScreenButtonEl !== null) {
                            fullScreenButtonEl.click();
                            console.log('full screen exit button clicked.');
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
