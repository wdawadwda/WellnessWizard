import { Text, View } from "react-native";
import { type CaloriesPropitris } from "./сalories.type";
import { Button } from "../../../shared/ui/Button/Button";
import { useState } from "react";

export default function Calories({ theme, type, title }: CaloriesPropitris) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Button onPress={() => setIsVisible(!isVisible)}>
        <Text>{title}</Text>
      </Button>
      {/* {isVisible && (
        // Нужно сделать компонент
        // будет инпут
        // анологичный recepi analyzer при добавлении продукта он записываеться под инпут на нём кнопка удалить
        // при нажатии на продукт, открываеться дитальный вид продукта с его весом, бжу и калориями
        // при добавлении нужно записывать в массив в редакс
      )} */}
    </View>
  );
}
