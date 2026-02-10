// 스킬 데이터를 관리하는 파일입니다.
// 필요에 따라 스킬을 추가/수정/삭제할 수 있습니다.

export interface Skill {
  name: string;
  icon?: string; // 선택: 아이콘 이미지 URL
  bgColor: string;
  textColor: string;
}

export interface SkillCategory {
  title: string;
  emoji: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Tech Stack',
    emoji: '✨',
    skills: [
      { name: 'JAVASCRIPT', bgColor: 'bg-yellow-400', textColor: 'text-black' },
      { name: 'TYPESCRIPT', bgColor: 'bg-blue-600', textColor: 'text-white' },
      { name: 'REACT', bgColor: 'bg-cyan-500', textColor: 'text-white' },
    ],
  },
  {
    title: 'Tools',
    emoji: '🛠️',
    skills: [
      { name: 'GIT', bgColor: 'bg-orange-600', textColor: 'text-white' },
      { name: 'GITHUB', bgColor: 'bg-gray-800', textColor: 'text-white' },
      { name: 'NOTION', bgColor: 'bg-white', textColor: 'text-black' },
      { name: 'VSCODE', bgColor: 'bg-blue-600', textColor: 'text-white' },
      { name: 'FIGMA', bgColor: 'bg-purple-600', textColor: 'text-white' },
    ],
  },
];

