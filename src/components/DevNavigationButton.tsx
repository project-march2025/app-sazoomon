'use client';

import { sessionAtom, userProfileAtom } from '@/atoms/auth';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from './Text';

// 주요 route 목록을 여기에 추가하세요.
const ROUTES = [
  { name: 'AuthRouter', label: '인증 라우터 (스플래시 -> 로그인여부에 따른 동작 확인)' },
  { name: 'SignUp', label: '회원가입' },
  { name: 'TermsAgreement', label: '약관 동의' },
  { name: 'Intro', label: '인트로' },
  { name: 'EnterInformation', label: '정보입력' },
  { name: 'MainTab', label: '메인 탭' },
  // 필요에 따라 route 추가
];

export const DevNavigationButton = () => {
  const setSession = useSetAtom(sessionAtom);
  const setProfile = useSetAtom(userProfileAtom);
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const profile = useAtomValue(userProfileAtom);
  if (!__DEV__) {
    return null;
  } // 개발 환경에서만 노출

  return (
    <>
      <TouchableOpacity
        className="absolute right-2 bottom-10 bg-blue-400 rounded-xl w-14 h-14 items-center justify-center shadow-lg z-50 "
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <View className="relative w-full h-full items-center justify-center">
          <Text className="text-caption-strong text-black">dev</Text>
          {profile ? (
            <Text className="text-[10px] text-black">{profile.name}</Text>
          ) : (
            <Text className="text-[10px] text-black">비회원</Text>
          )}
        </View>
      </TouchableOpacity>
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/20 justify-end"
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        >
          <View className="bg-white m-4 rounded-xl p-2">
            <View className="flex flex-row justify-end">
              <TouchableOpacity className="" onPress={() => setIsOpen(false)}>
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="p-4 border-b border-gray-100">
              <Text className="font-bold mb-1">로그인 정보</Text>
              <Text className="text-xs">아이디: {profile?.id ?? '-'}</Text>
              <Text className="text-xs">이름: {profile?.name ?? '비회원'}</Text>
              <Text className="text-xs">이메일: {profile?.email ?? '-'}</Text>
              <Text className="text-xs">생년월일: {profile?.birthdate ?? '-'}</Text>
              <Text className="text-xs">성별: {profile?.gender ?? '-'}</Text>
              <Text className="text-xs">캘린더 아이디: {profile?.calendar_id ?? '-'}</Text>
              <Text className="text-xs">가입일: {profile?.created_at ?? '-'}</Text>
              <Text className="text-xs">
                약관 동의: {profile?.terms_agreed ? '동의' : '미동의'}
              </Text>
            </TouchableOpacity>

            <Text className="font-bold mb-1 pt-2 px-3">라우트 목록</Text>
            {ROUTES.map((route) => (
              <TouchableOpacity
                key={route.name}
                className="p-4 border-b border-gray-100"
                onPress={() => {
                  setIsOpen(false);
                  // @ts-ignore
                  navigation.navigate(route.name);
                }}
              >
                <Text>{route.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="p-4 border-b border-gray-100"
              onPress={() => {
                setSession(null);
                setProfile(null);
              }}
            >
              <Text>로그인 정보를 초기화 💥</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
