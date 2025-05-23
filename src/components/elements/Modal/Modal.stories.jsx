import React from "react";
import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  children: (
    <div>
      <div>Modal Content</div>
      <div>Modal Content</div>
    </div>
  ),
  width: "500px",
};
