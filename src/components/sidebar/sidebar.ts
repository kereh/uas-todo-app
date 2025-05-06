import {
  MessageCircleQuestion,
  SquareTerminal,
  ShieldQuestion,
} from "lucide-react";

export const menus = {
  navMain: [
    {
      title: "To-Do",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Ask Developer",
      url: "https://wa.me/6289612225233",
      icon: MessageCircleQuestion,
      isActive: false,
    },
    {
      title: "About This",
      url: "https://github.com/kereh/uas-todo-app/blob/main/README.md",
      icon: ShieldQuestion,
      isActive: false,
    },
  ],
};
