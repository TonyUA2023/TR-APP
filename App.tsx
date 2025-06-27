// App.tsx

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

// Importar pantallas
import SplashScreen from './src/screens/SplashScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import FormScreen from './src/screens/forms/FormScreen';
import CategoriesScreen from './src/screens/categories/CategoriesScreen';
import { FormsListScreen, DocumentLibraryScreen, CameraScreen } from './src/screens/PlaceholderScreens';
import { SettingsScreen } from './src/screens/Settings';

// Importar tipos y constantes
import { RootStackParamList, TabParamList } from './src/types';
import { COLORS } from './src/constants';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator Component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Camera':
              iconName = focused ? 'camera' : 'camera-outline';
              break;
            case 'Documents':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{ title: 'Categories' }}
      />
      <Tab.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ 
          title: 'Camera',
          tabBarStyle: { display: 'none' } // Ocultar tab bar en cámara
        }}
      />
      <Tab.Screen 
        name="Documents" 
        component={DocumentLibraryScreen}
        options={{ title: 'Documents' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          {/* Tab Navigator como pantalla principal */}
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          
          {/* Pantallas que se abren como modales/stack */}
          <Stack.Screen 
            name="FormsList" 
            component={FormsListScreen}
            options={{ 
              title: 'Select Form',
              presentation: 'modal'
            }}
          />
          
          <Stack.Screen 
            name="FormScreen" 
            component={FormScreen}
            options={{ 
              title: 'Inspection Form',
              presentation: 'modal'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});