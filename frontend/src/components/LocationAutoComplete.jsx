import { useEffect, useRef } from "react";

const LocationAutocomplete = ({ onLocationSelect }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        fields: ["formatted_address", "geometry"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();

      if (!place.geometry) return;

      const formattedAddress = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      // Send data back to parent (Donate page)
      onLocationSelect({
        address: formattedAddress,
        latitude: lat,
        longitude: lng,
      });
    });
  }, [onLocationSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter pickup location"
      className="w-full p-3 border rounded-lg"
    />
  );
};

export default LocationAutocomplete;
