export interface StatItem {
  id: string;
  platform: string;
  icon?: string;
  label: string;
  value: string | number;
  link: string;
  description?: string;
  color?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: string;
  link?: string;
}

export const codingStats: StatItem[] = [
  {
    id: "leetcode",
    platform: "LeetCode",
    label: "Problems Solved",
    value: "350+",
    link: "https://leetcode.com/u/jayeshvegda/",
    description: "Coding challenges solved",
    color: "#FFA116",
  },
  {
    id: "github-repos",
    platform: "GitHub",
    label: "Active Repos",
    value: "10+",
    link: "https://github.com/JayeshVegda",
    description: "Active repositories maintained",
    color: "#181717",
  },
  {
    id: "github-users",
    platform: "GitHub",
    label: "Plugin Users",
    value: "100+",
    link: "https://github.com/JayeshVegda",
    description: "Users using my plugins",
    color: "#181717",
  },
  {
    id: "aciojob",
    platform: "ACIOJOB",
    label: "Problems Solved",
    value: "350+",
    link: "https://storage.googleapis.com/acciojob-user-content/profileShareLink/8a3897be-134d-4056-a3bc-f7eb41a09ba7-2305112110037@paruluniversity.ac.in2025-11-07T12:51:12.333Z.jpeg",
    description: "Coding challenges solved",
    color: "#6366F1",
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "coding-milestone",
    title: "350+ LeetCode Problems Solved",
    description: "Solved 350+ coding problems across various difficulty levels, demonstrating strong problem-solving skills and algorithmic thinking",
    date: "2024",
    link: "https://leetcode.com/u/jayeshvegda/",
  },
  {
    id: "github-achievement",
    title: "Active Open Source Contributor",
    description: "Maintaining 10+ active repositories and contributing consistently to open-source projects. One of my plugins has 100+ active users",
    date: "2024",
    link: "https://github.com/JayeshVegda",
  },
  {
    id: "aciojob-achievement",
    title: "350+ ACIOJOB Challenges Solved",
    description: "Solved 350+ coding challenges on ACIOJOB platform, enhancing algorithmic thinking and problem-solving capabilities",
    date: "2024",
  },
];

