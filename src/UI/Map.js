class Map {
  constructor(coords) {
    this.coordinates = coords;
    this.render();
  }
  render() {
    if (!google) {
      alert("Could not load maps - Please try again later.");
      return;
    }

    const map = new google.maps.Map(document.getElementById("map"), {
      center: this.coordinates,
      zoom: 16,
    });
  }
}
