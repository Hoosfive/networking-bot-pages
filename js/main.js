const PROFILE_DATA_PARAM = 'data';

let inputs = {
	userName: document.querySelector('#userName'),
	city: document.querySelector('#city'),
	position: document.querySelector('#position'),
	about: document.querySelector('#about'),
}

document.querySelector('#profileForm').addEventListener('submit', showMainButton)

function showMainButton(event) {
	Telegram.WebApp.MainButton.show()
	event.preventDefault(event);
}

function sendProfile() {
	let profile = {
		userName: inputs.userName.value,
		city: inputs.city.value,
		position: inputs.position.value,
		about: inputs.about.value
	}
	Telegram.WebApp.sendData(JSON.stringify(profile))
}

function setUrlParamJsonToInputsValues() {
	let urlParams = new URLSearchParams(document.location.search);
	if (urlParams.has(PROFILE_DATA_PARAM)) {
		let profile = JSON.parse(urlParams.get(PROFILE_DATA_PARAM));
		for (param in profile) {
			if (param != null) {
				inputs[param].value = profile[param];
			}
		}
	}
}

function init() {
	setUrlParamJsonToInputsValues()
	Telegram.WebApp.ready()
	Telegram.WebApp.MainButton
		.setText('Сохранить')
		.onClick(sendProfile)
}

document.addEventListener('DOMContentLoaded', init)
