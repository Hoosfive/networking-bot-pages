const PROFILE_DATA_PARAM = 'data';

let inputs = {
	username: document.querySelector('#username'),
	city: document.querySelector('#city'),
	position: document.querySelector('#position'),
	interests: document.querySelector('#interests'),
	about: document.querySelector('#about'),
}

document.querySelector('#profileForm').addEventListener('submit', showMainButton)

function showMainButton(event) {
	Telegram.WebApp.MainButton.show()
	event.preventDefault(event);
}

function sendProfile() {
	let profile = {
		username: inputs.username.value,
		city: inputs.city.value,
		position: inputs.position.value,
		interests: inputs.interests.value,
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
