"use client";

export default function House() {
  const house = {
    rooms: 4,
    hasGarage: true,
    city: "Boston",
  };

  console.log(house);

  return (
    <div>
      <h4>House</h4>
      <div>{JSON.stringify(house)}</div>
    </div>
  );
}