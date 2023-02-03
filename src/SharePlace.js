import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    // this.shareBtn.addEventListener("click", this.shareHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates, address) {
    // this.map ? this.map.render(coordinates) : (this.map = new Map(coordinates));

    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    this.shareBtn.disabled = false;
    const sharedLinkInputEl = document.getElementById("share-link");
    sharedLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng${coordinates.lng}`;
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
      async (successResult) => {
        // console.log(successResult);
        const coordinates = {
          lat: successResult.coords.latitude + Math.random() * 20,
          lng: successResult.coords.longitude + Math.random() * 20,
        };
        // console.log(coordinates);
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
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
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
