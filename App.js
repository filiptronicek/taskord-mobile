import React from "react";
import { useColorScheme } from "react-native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigation.component";

import { default as theme } from "./src/custom-theme.json"; // <-- Import app theme

export default () => {
  const colorTheme = useColorScheme() === "dark" ? eva.dark : eva.light;
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...colorTheme, ...theme }}>
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
};
