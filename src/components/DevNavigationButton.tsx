import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';

// 주요 route 목록을 여기에 추가하세요.
const ROUTES = [
  { name: 'AuthRouter', label: '인증 라우터' },
  { name: 'SignUp', label: '회원가입' },
  { name: 'TermsAgreement', label: '약관 동의' },
  { name: 'Intro', label: '인트로' },
  { name: 'OnboardingSetting', label: '온보딩 설정' },
  { name: 'MainTab', label: '메인 탭' },
  // 필요에 따라 route 추가
];

export const DevNavigationButton = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  if (!__DEV__) {
    return null;
  } // 개발 환경에서만 노출

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setIsOpen(true)} activeOpacity={0.7}>
        <Text style={styles.fabText}>🛠️</Text>
      </TouchableOpacity>
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={styles.menu}>
            {ROUTES.map((route) => (
              <TouchableOpacity
                key={route.name}
                style={styles.menuItem}
                onPress={() => {
                  setIsOpen(false);
                  // @ts-ignore
                  navigation.navigate(route.name);
                }}
              >
                <Text>{route.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 999,
  },
  fabText: { fontSize: 24 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 8,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
});
