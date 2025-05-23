import React from "react";
import SelectMenu from "./SelectMenu";

export default {
  title: "Components/SelectMenu",
  component: SelectMenu,
};

const Template = (args) => <SelectMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Select an option",
  options: [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
  ],
  value: "Option 1",
};
