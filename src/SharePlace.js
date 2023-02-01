import { Modal } from "./UI/Modal";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler);
    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature not available on your browser - please upgrade your browser"
      );
      return;
    }
    const modal = new Modal("loading-modal-content", "please wait");
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        console.log(successResult);
        const coordinates = {
          lat: successResult.coords.latitude + Math.random() * 50,
          lng: successResult.coords.longitude + Math.random() * 50,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate position, please enter address manually and try again"
        );
      }
    );
  }

  findAddressHandler() {}
}

const place = new PlaceFinder();
