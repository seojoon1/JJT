import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                안녕하세요! 저는 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                새로운 기술을 배우고 적용하는 것을 즐기며, 팀과 협업하여 더 나은 제품을 만드는 것을 좋아합니다.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                현재는 React와 TypeScript를 주로 사용하여 프로젝트를 진행하고 있습니다.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">🎓 Education</h3>
                <p className="text-gray-600 dark:text-gray-400">학교명 / 전공</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">2020 - 2024</p>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">💼 Experience</h3>
                <p className="text-gray-600 dark:text-gray-400">회사명 / 포지션</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">2024 - Present</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
