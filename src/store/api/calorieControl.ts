import axios from "axios";
import { BASE_URL } from "../../entities/const/api/urls";
import { type CalorieControlState } from "../calorieControl/calorieControl.type";

export const updateCalorieControl = async (userId: number, dataToUpdate: CalorieControlState) => {
  const apiUrl = `${BASE_URL}/calorie-control/${userId}/`;

  return axios
    .patch(apiUrl, dataToUpdate)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
