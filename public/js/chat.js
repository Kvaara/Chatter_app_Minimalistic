/* eslint-disable no-alert */
// eslint-disable-next-line no-undef
const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

const usernameAndRoom = Qs.parse(location.search, { ignoreQueryPrefix: true });
const { username } = usernameAndRoom;
const { room } = usernameAndRoom;

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    time: moment(message.time).format("h:mm A"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (locationMessage) => {
  console.log(locationMessage);
  const html = Mustache.render(locationTemplate, {
    url: locationMessage.url,
    time: moment(locationMessage.time).format("h:mm A"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  $messageFormButton.setAttribute("disabled", "disabled");

  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered! Time:");
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared!");
        $sendLocationButton.removeAttribute("disabled");
      }
    );
  });
});

socket.emit("enter", usernameAndRoom);
