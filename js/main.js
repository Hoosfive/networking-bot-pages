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

function setUrlParamsToInputsValues () {
	let urlParams = new URLSearchParams(document.location.search);

	for (option in inputs){
		if (urlParams.has(option)){
			inputs[option].value = urlParams.get(option);
		}
	}
}

function init() {
	setUrlParamsToInputsValues()
	Telegram.WebApp.ready()
	Telegram.WebApp.MainButton
		.setText('Сохранить')
		.onClick(sendProfile)
}

document.addEventListener('DOMContentLoaded', init)
