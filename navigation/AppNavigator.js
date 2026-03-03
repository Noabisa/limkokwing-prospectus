import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CareerGuideScreen from "../screens/CareerGuideScreen";
import CourseDetailsScreen from "../screens/CourseDetailsScreen";
import CoursesScreen from "../screens/CoursesScreen";
import HomeScreen from "../screens/HomeScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
        <Stack.Screen name="CareerGuide"component={CareerGuideScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}