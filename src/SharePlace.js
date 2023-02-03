import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress } from "./Utility/Location";

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
          lat: successResult.coords.latitude + Math.random() * 20,
          lng: successResult.coords.longitude + Math.random() * 20,
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

  async findAddressHandler(e) {
    e.preventDefault();
    const address = e.target.querySelector("input").value;
    if (!address || address.trim() === 0) {
      alert("Invalid address entered - please try again");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.setCoordinates(coordinates);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
