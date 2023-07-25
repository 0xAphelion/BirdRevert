function reviveBird() {
	let imposter = document.querySelector('a[href="/home"][aria-label="Twitter"] div svg')
  let parent = imposter.parentNode
	
	let BIRD = `<img src="chrome-extension://${exUrl}/bird.svg" style="height: 1.6rem;"/>`
  
  let disguise = imposter.classList

	//X gon give it to ya
	imposter.remove()
	//Return of the King
	parent.insertAdjacentHTML('beforeend', BIRD)
  parent.querySelector('img').classList = disguise

}
function waitForX(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

let exUrl = chrome.runtime.id
let icons = document.querySelectorAll('link[rel*="icon"]')
for(let i=0; i<icons.length; i++){
  icons[i].href = `chrome-extension://${exUrl}/logos/bird.svg`
}

waitForX('a[href="/home"][aria-label="Twitter"] div svg').then(()=>{
  reviveBird()
})