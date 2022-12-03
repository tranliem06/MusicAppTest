import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Jasp", value: "jasp" },
  { id: 3, name: "Rock", value: "rock" },
  { id: 4, name: "Melody", value: "melody" },
  { id: 5, name: "Karoke", value: "karoke" },
];

export const filterByLanguage = [
  { id: 1, name: "Tamil", value: "tamil" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Malayalam", value: "malayalam" },
  { id: 4, name: "Telungu", value: "Telungu" },
  { id: 5, name: "Hindi", value: "hindi" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export const getArrSlider = (start, end, number) => {
  const limit = start > end ? number : end;
  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};

export const handleNumber = (number) => {
  // let output = number / 1000;

  if (number > Math.pow(10, 6)) {
    return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`;
  } else {
    return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}K`;
  }
};
