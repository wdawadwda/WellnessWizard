import React, { useEffect } from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();
export const GoogleSignInScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [, /*request*/ response, promptAsync] = Google.useAuthRequest({
    androidClientId: "",
    webClientId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (response?.type === "success") {
        const { authentication } = response;
        // Получение токена
        const token = authentication?.accessToken;

        try {
          // Отправка запроса к API Google с использованием токена
          const apiResponse = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Получение данных о пользователе из ответа API
          const userData = apiResponse.data;

          // Обновление состояния userInfo
          setUserInfo(userData);

          // Теперь у вас есть данные о пользователе в переменной userInfo
          console.log(userInfo);
        } catch (error) {
          console.error("Ошибка при запросе к API Google:", error);
        }
      }
    };

    fetchData();
  }, [response]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <View>
      <Button onPress={() => promptAsync()}>
        <AntDesign name="google" size={25} color="white" />
      </Button>
    </View>
  );
};
