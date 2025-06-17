import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DialogBox from './DialogBox';
import { ImageSourcePropType } from 'react-native';

interface DialogItem {
  name: string;
  avatarImage: ImageSourcePropType;
  dialog: string;
  highlightText?: string;
  highlightStyle?: any;
}

interface DialogSequenceProps {
  dialogList: DialogItem[];
  onComplete?: () => void;
  className?: string;
}

export function DialogSequence({ dialogList, onComplete, className = '' }: DialogSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < dialogList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const currentDialog = dialogList[currentIndex];

  return (
    <TouchableOpacity onPress={handleNext} className={className}>
      <DialogBox
        name={currentDialog.name}
        avatarImage={currentDialog.avatarImage}
        highlightText={currentDialog.highlightText}
        highlightStyle={currentDialog.highlightStyle}
        isNext={currentIndex < dialogList.length - 1}
      >
        {currentDialog.dialog}
      </DialogBox>
    </TouchableOpacity>
  );
}
