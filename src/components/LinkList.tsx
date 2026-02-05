import asciiiImage from '../assets/asciii.png';
import mococobotImage from '../assets/mococobot.png';
import kola from '../assets/kola.png';
export const projects = [
  {
    title: '모코코봇',
    description: '로스트아크 관련 봇인 모코코봇 사이트 입니다.',
    tags: ['React', 'JavaScript'],
    github: '#',
    demo: 'https://mococobot.kr',
    image: mococobotImage,
  },
  {
    title: 'asciiii',
    description: '이미지를 넣으면 ASCII 아트로 변환해주는 웹프로젝트입니다. 다양한 옵션을 제공합니다.',
    tags: ['React', 'TypeScript', 'tailwindcss'],
    github: '#',
    demo: '#',
    image: asciiiImage,
  },
  {
    title: 'KOLA',
    description: 'KOLA 는 라오스 국립 대학교 학생들과의 협업으로 만들어진 플러팅 멘트 소셜 서비스 입니다.',
    tags: ['React', 'TypeScript', 'tailwindcss'],
    github: 'https://github.com/seojoon1/MT',
    demo: '#',
    image: kola,
  },
];
import { Mail, Github, Linkedin, Instagram} from 'lucide-react';
export const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:kim1122aass@gmail.com', color: 'hover:text-red-500 dark:text-red-300' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/seojoon1', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/seojoon1', color: 'hover:text-blue-600 dark:text-blue-300' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/seojoon_12_6', color: 'hover:text-pink-500 dark:text-pink-300' },
  ];