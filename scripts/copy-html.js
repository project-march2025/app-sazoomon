const fs = require('fs-extra');
const path = require('path');

// 소스 HTML 파일 경로
const sourceDir = path.join(__dirname, '../assets/webview');

// Android 대상 경로
const androidDir = path.join(__dirname, '../android/app/src/main/assets');

// iOS 대상 경로
const iosDir = path.join(__dirname, '../ios/sazoomon');

// HTML 파일 복사 함수
async function copyHtmlFiles() {
  try {
    // Android로 복사
    await fs.copy(sourceDir, androidDir);
    console.log('✅ HTML files copied to Android assets');

    // iOS로 복사
    await fs.copy(sourceDir, iosDir);
    console.log('✅ HTML files copied to iOS assets');
  } catch (err) {
    console.error('Error copying HTML files:', err);
  }
}

copyHtmlFiles();
