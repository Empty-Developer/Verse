
import { Stack } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>News</Label>
        <Icon sf="textformat.characters" drawable="md-main" selectedColor={"#6e6a6aff"}/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="library">
        <Icon sf="book.pages" drawable="md-person" selectedColor={'#6e6a6aff'}/>
        <Label>Library</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="book">
        <Icon sf="fleuron" drawable="md-person" selectedColor={'#6e6a6aff'}/>
        <Label>AI Book</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="profile">
        <Icon sf="person" drawable="md-person" selectedColor={'#6e6a6aff'}/>
        <Label>Profile</Label>
      </NativeTabs.Trigger>

      {/* <NativeTabs.Trigger name="search" role='search'>
        <Label>Search</Label>
      </NativeTabs.Trigger> */}
    </NativeTabs>
  );
}
