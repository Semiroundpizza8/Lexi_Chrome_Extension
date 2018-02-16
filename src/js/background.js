import '../img/icon-128.png';
import '../img/icon-34.png';

console.log('Background Running');


window.word = 'Ben';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  window.word = request.text;
});
