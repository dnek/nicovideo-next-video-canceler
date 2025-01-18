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
