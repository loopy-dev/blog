import type { Hobby } from '~/models/Resume';

const coffee: Hobby = {
  title: '커피',
  introduction:
    '커피를 즐겨마십니다. 다만 맛은 가리지 않고 카페라는 공간을 좋아합니다.',
  description: [
    '번화가 대형 커피전문점에서 파트타임으로 약 8개월정도 근무',
    '학교 생활과 병행했으며 주말 타임으로 근무하였음',
    '그 외 베이커리에서도 파트 타임 경력',
  ],
};

const travel: Hobby = {
  title: '여행',
  introduction: '국내, 해외 여행을 모두 가리지 않고 좋아합니다.',
  description: [
    '파리, 스위스, 스페인등 다양한 나라 방문',
    '최근에는 일본, 홍콩 등 근거리 여행 위주로 다니는 중',
    '한적한 곳을 좋아하며 반려견과 함께 있는 것을 좋아함',
  ],
};

const hobbies = [coffee, travel];

export default hobbies;
