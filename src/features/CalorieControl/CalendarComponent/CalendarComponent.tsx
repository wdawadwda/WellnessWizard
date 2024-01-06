import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Button } from "../../../shared/ui/Button/Button";
import i18n from "../../../i18n";
import { type CustomDayObject } from "./calendarComponent.type";
import { getCurrentDate } from "./calendarComponent.utils";
import { calorieControlActions } from "../../../store/calorieControl/calorieControl.slice";
import { useAppDispatch } from "../../../store/store.types";

export const CalendarComponent = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const dispatch = useAppDispatch();

  const onDayPress = (day: CustomDayObject) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  useEffect(() => {
    dispatch(calorieControlActions.setSelectedDate(selectedDate));
  }, [selectedDate]);

  const updateCalendarLocale = () => {
    const locale = i18n.language.toLowerCase();
    const months: string[] = i18n.t("calendar.months", { returnObjects: true });
    const monthsShort: string[] = i18n.t("calendar.monthsShort", { returnObjects: true });
    const dayNames: string[] = i18n.t("calendar.dayNames", { returnObjects: true });
    const dayNamesShort: string[] = i18n.t("calendar.dayNamesShort", { returnObjects: true });
    LocaleConfig.locales[locale] = {
      monthNames: months,
      monthNamesShort: monthsShort,
      dayNames: dayNames,
      dayNamesShort: dayNamesShort,
    };
    LocaleConfig.defaultLocale = locale;
  };

  useEffect(() => {
    updateCalendarLocale();
  }, [i18n.language]);

  return (
    <View>
      {showCalendar ? (
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
          }}
          monthNames={i18n.t("calendar.monthNamesArray", { returnObjects: true })}
          monthNamesShort={i18n.t("calendar.monthNamesShortArray", { returnObjects: true })}
        />
      ) : (
        <Button onPress={() => setShowCalendar(true)}>
          <Text>{`${i18n.t("calendar.calendarButton")}: ${selectedDate}`}</Text>
        </Button>
      )}
    </View>
  );
};
