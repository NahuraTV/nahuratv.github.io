const langs = {
    "en": "English",
    "navi": "Na'vi"
}

function changeLanguage(languageCode) {
    Array.from(document.getElementsByClassName('localized')).forEach(function (elem) {
        if (elem.classList.contains('lang-' + languageCode)) {
             elem.style.display = 'block';
        }
        else {
             elem.style.display = 'none';
        }
    });
}

const urlParams = new URLSearchParams(window.location.search)

// Add language selector handler
const selector = document.getElementById('langSelector');
selector.addEventListener('change', function (evt) {
    urlParams.set('lang', this.value);
    history.replaceState(null, null, "?"+urlParams.toString())
    location.reload()
});

// Populate language selector
for (const [key, value] of Object.entries(langs)) {
    var opt = document.createElement('option')
    opt.value = key
    opt.innerText = value
    selector.appendChild(opt)
}

// Detect and apply initial language
const lang = navigator.userLanguage || navigator.language || 'en-EN';
var startLang = Array.from(selector.options).map(opt => opt.value).find(val => lang.includes(val)) || 'en';
if (urlParams.get('lang') != null) {
    if (urlParams.get('lang') in langs) {
        startLang = urlParams.get('lang')
    }
}
changeLanguage(startLang);

// Update selector with start value
selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang)