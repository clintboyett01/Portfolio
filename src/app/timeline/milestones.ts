export interface Milestone {
  title: string;
  description: string;
  isVisible: boolean; 
}

export const milestones: Milestone[] = [
  {
    title: 'Robotics',
    description: 'My fascination with programming began in the world of robotics. No one else knew how to code, so I thought I\'d give it a try, and thats when I found out how much I liked coding. As high school robotics team captain, I eventually lead my team to place second out of 86.',
    isVisible: true
  },
  {
    title: 'Java Competitions',
    description: 'Eventually, I dove into Computer Science UIL competitions. Three years of self-study honed my Java skills, earning me: 1st in my Local District, 1st in the ETX Region, and 7th in Texas. This period laid an incredible foundation for my future in programming.',
    isVisible: true
  },
  {
    title: 'First Big Project',
    description: 'After my competition days were over, I was ready to build something of my own. I developed "Frontier.io," a Unity game that gained over 10,000 downloads. This project taught me the complexities of managing larger-scale software and solidified my coding abilities.',
    isVisible: true
  },
  {
    title: 'CS Degree',
    description: 'I graduated highscool and decided it was time I pursued a Bachelor of Science in Computer Science, expanding my knowledge with new languages, skills, and more group leadership opportunities. This made me a more well rounded developer.',
    isVisible: true
  },
  {
    title: 'Data Analytics Lab',
    description: 'During my time at UT Tyler, I secured an internship at the Data Analytics Lab. Analyzing opioid trends in the FDA\'s FAERS 135 million record database, I contributed to research that resulted in three publications. These publications have been cited over 30 times by other papers.',
    isVisible: true
  },
  {
    title: 'Joining NacSpace',
    description: 'As a Full-Stack Mobile Developer at NacSpace, I\'ve had the opportunity to create real-world solutions. Working on apps and internal tools used across 180+ locations has deepened my expertise in mobile development. I also use, C#, VB.VET, ASP.NET and more for back end development. ',
    isVisible: true
  },
  {
    title: 'Ongoing Learning',
    description: 'I\'m always learning and expanding my skills – exploring Angular, Flutter, AI model implementations, and more through freelance projects and personal experimentation. The future interests and excites me. Staying on the cutting edge is part of what makes this field so exciting!',
    isVisible: true
  }
];