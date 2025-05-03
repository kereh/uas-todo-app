import { LifeBuoy, Send, SquareTerminal } from "lucide-react";

export const menus = {
  navMain: [
    {
      title: "To-Do",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};
