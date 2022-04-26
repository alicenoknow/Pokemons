import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { ReactElement } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { FavsContextProvider } from "./components/FavsContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./utils/store";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache(),
});

export default function App(): ReactElement | null {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <FavsContextProvider>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
            </SafeAreaProvider>
          </FavsContextProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}
