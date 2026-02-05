export const projects = [
  {
    title: '모코코봇',
    description: '로스트아크 관련 봇인 모코코봇 사이트 입니다.',
    tags: ['React', 'JavaScript'],
    github: '#',
    demo: 'https://mococobot.kr',
    image: 'https://via.placeholder.com/400x300',
  },
  {
    title: 'asciiii',
    description: '이미지를 넣으면 ASCII 아트로 변환해주는 웹프로젝트입니다. 다양한 옵션을 제공합니다.',
    tags: ['React', 'TypeScript', 'tailwindcss'],
    github: '#',
    demo: '#',
    image: 'https://via.placeholder.com/400x300',
  },
  {
    title: '프로젝트 3',
    description: '프로젝트에 대한 간단한 설명을 작성하세요. 어떤 기술을 사용했고, 어떤 문제를 해결했는지 설명합니다.',
    tags: ['Vue', 'Firebase', 'CSS'],
    github: '#',
    demo: '#',
    image: 'https://via.placeholder.com/400x300',
  },
];
import { Mail, Github, Linkedin, Instagram} from 'lucide-react';
export const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:your.email@example.com', color: 'hover:text-red-500' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/yourusername', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', color: 'hover:text-blue-600' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/yourusername', color: 'hover:text-pink-500' },
  ];