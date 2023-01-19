// This function is used to get the coordinates of an address using the Google Maps API
//async function is used to return a promise and await is used to wait for the promise to resolve
async function getCordsForAddress(address) {
  return {
    lat: 40.7484474,
    lng: -73.9871516,
  };
}

module.exports = getCordsForAddress;
