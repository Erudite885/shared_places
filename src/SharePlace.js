import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    this.map ? this.map.render(coordinates) : (this.map = new Map(coordinates));
    // this.map = new Map(coordinates);
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
        // console.log(coordinates);
        this.selectPlace(coordinates);
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
