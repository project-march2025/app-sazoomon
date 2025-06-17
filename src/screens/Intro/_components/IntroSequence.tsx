import { useEffect, useState } from 'react';
import { View } from 'react-native';
import IntroStep1Animation from './IntroStep1Animation';
import IntroStep2Animation from './IntroStep2Animation';

export default function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    // 각 단계별 애니메이션 길이에 맞게 타이머 설정
    if (introStep === 0) {
      timer = setTimeout(() => setIntroStep(1), 3300); // 1초 대기 + 1.5초 문 열림 + 0.8초 Blur FadeIn
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [introStep, onFinish]);

  // 각 단계별로 다른 애니메이션/컴포넌트 렌더링
  const renderStep = () => {
    switch (introStep) {
      case 0:
        return <IntroStep1Animation />;
      case 1:
        return <IntroStep2Animation onFinish={onFinish} />;
    }
  };

  return <View style={{ flex: 1 }}>{renderStep()}</View>;
}
