class Map {
  constructor(coords) {
    this.coordinates = coords;
    this.render();
  }
  render() {
    if (!google) {
      alert("Could not load maps - Please try again later.");
    }
  }
}
