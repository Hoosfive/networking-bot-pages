const PROFILE_DATA_URL_PARAM = 'profile';
const ALL_CITIES_URL_PARAM = 'allCities';

let profileFormElements = {
	userName: document.querySelector('#userName'),
	cityName: document.querySelector('#selectedCity'),
	position: document.querySelector('#position'),
	about: document.querySelector('#about')
}

function showMainButton(event) {
	Telegram.WebApp.MainButton.show()
	event.preventDefault(event)
}

function sendProfile() {
	let profileFormData = {
		userName: profileFormElements.userName.value,
		cityName: profileFormElements.cityName.innerText,
		position: profileFormElements.position.value,
		about: profileFormElements.about.value
	}
	Telegram.WebApp.sendData(JSON.stringify(profileFormData))
}

function processUrlParams() {
	let urlParams = new URLSearchParams(document.location.search)
	if (urlParams.has(PROFILE_DATA_URL_PARAM)) {
		setProfileParamValuesToFields(urlParams)
	}
	if (urlParams.has(ALL_CITIES_URL_PARAM)) {
		setCitiesListParamToCitiesDropdown(urlParams)
	}
}

function setProfileParamValuesToFields(urlParams) {
	let profile = JSON.parse(urlParams.get(PROFILE_DATA_URL_PARAM))
	for (param in profile) {
		if (param != null) {
			if (param !== 'cityName') {
				profileFormElements[param].value = profile[param]
			} else {
				profileFormElements[param].innerText = profile[param]
			}
		}
	}
}
function setCitiesListParamToCitiesDropdown(urlParams) {
	let allCities = urlParams.get(ALL_CITIES_URL_PARAM).split(",")
	let btnListElement = document.querySelector('#dropdown-button-list')
	if (allCities.length > 0 && allCities[0] !== '') {
		document.querySelectorAll('#cityPlaceholder').forEach(el => el.remove())
		allCities.forEach(cityName => {
			let htmlEl = document.createElement("button")
			htmlEl.className = 'dropdown-item'
			htmlEl.type = 'button'
			htmlEl.innerText = cityName
			btnListElement.appendChild(htmlEl)
		})
	}
}

function init() {
	processUrlParams()
	Telegram.WebApp.ready()
	Telegram.WebApp.MainButton
		.setText('Сохранить')
		.onClick(sendProfile)
}

document.addEventListener('DOMContentLoaded', init)
document.querySelector('#profileForm').addEventListener('submit', showMainButton)
