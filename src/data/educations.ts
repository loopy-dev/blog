import type { Education } from '../models/Resume';

export const feDevCourse: Education = {
  title: '프로그래머스 프론트엔드 데브코스(2기)',
  startDate: '2022-03',
  endDate: '2022-08',
  introduction:
    '프로그래머스에서 진행하는 프론트엔드 데브코스에 참여하였습니다.',
  description: [
    '스스로 학습 목표를 세우고, 일일 스크럼을 통한 목표 공유 및 학습 내용을 정리',
    '팀 단위로 설계부터 배포까지 참여하며 한 사이클의 개발 과정을 경험',
  ],
  otherLinks: [
    {
      name: '데브코스 회고',
      url: 'https://velog.io/@mrbartrns/%ED%9A%8C%EA%B3%A0-%EB%8D%B0%EB%B8%8C%EC%BD%94%EC%8A%A4-2%EA%B8%B0%EB%A5%BC-%EB%A7%88%EC%B9%98%EB%A9%B0',
    },
  ],
};

export const soonsilUniversity: Education = {
  title: '숭실대학교',
  startDate: '2013-03',
  endDate: '2020-02',
  introduction: '유기신소재 파이버공학과(신소재공학과)',
};

export const educations = [feDevCourse, soonsilUniversity];
