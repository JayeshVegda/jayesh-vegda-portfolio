import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@jayeshvegda",
    icon: Icons.gitHub,
    link: "https://github.com/jayeshvegda",
  },
  {
    name: "LinkedIn",
    username: "Jayesh Vegda",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/jayeshvegda/",
  },
  {
    name: "LeetCode",
    username: "@jayeshvegda",
    icon: Icons.zap,
    link: "https://leetcode.com/jayeshvegda",
  },
  {
    name: "Gmail",
    username: "jayeshvegda198",
    icon: Icons.gmail,
    link: "mailto:jayeshvegda198@gmail.com",
  },
];
