// utils/AndroidOtpListener.js

import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { OTPModule } = NativeModules;

// Servisimizin durumu ve aboneleri tutacağı değişkenler
let emitter = null;
let otpSubscription = null;
let errorSubscription = null;

// Set, aynı callback'in birden fazla eklenmesini engeller
const otpCallbacks = new Set();
const errorCallbacks = new Set();

const OtpListenerService = {
  /**
   * Native modülü dinlemeye başlar. OTP ekranına girildiğinde çağrılır.
   */
  startListener: () => {
    if (Platform.OS !== 'android' || !OTPModule) {
      return;
    }
    // Zaten dinliyorsa tekrar başlatma.
    if (emitter) {
      console.log('OTP dinleyici zaten aktifti.');
      return;
    }

    emitter = new NativeEventEmitter(OTPModule);

    // Native'den gelen 'onOTPReceived' olayını dinle
    otpSubscription = emitter.addListener('onOTPReceived', otp => {
      console.log('Servis tarafından OTP mesajı alındı:', otp);
      otpCallbacks.forEach(callback => callback(otp));
    });

    // Native'den gelen 'onOTPError' olayını dinle
    errorSubscription = emitter.addListener('onOTPError', error => {
      console.error('Servis tarafından OTP hatası alındı:', error);
      errorCallbacks.forEach(callback => callback(error));
    });

    // Native tarafta dinlemeyi başlat
    OTPModule.startListeningForOTP();
  },

  /**
   * Native modülü dinlemeyi durdurur ve tüm kaynakları temizler. OTP ekranından çıkıldığında çağrılır.
   */
  stopListener: () => {
    if (!emitter) return;

    console.log('Native dinleyici durduruluyor ve kaynaklar temizleniyor...');
    OTPModule.stopListeningForOTP();

    otpSubscription?.remove();
    errorSubscription?.remove();

    emitter = null;
    otpSubscription = null;
    errorSubscription = null;
  },

  /**
   * OTP geldiğinde tetiklenecek bir callback fonksiyonu ekler (abone olur).
   * @param {function(string | null): void} callback OTP geldiğinde çağrılacak fonksiyon.
   * @returns {function(): void} Abonelikten çıkmak için kullanılabilecek bir fonksiyon döner.
   */
  subscribe(callback) {
    otpCallbacks.add(callback);
    // Aboneyi silmek için bir fonksiyon döndür
    return () => {
      otpCallbacks.delete(callback);
    };
  },

  /**
   * Bir hata oluştuğunda tetiklenecek bir callback fonksiyonu ekler.
   * @param {function(any): void} callback Hata oluştuğunda çağrılacak fonksiyon.
   * @returns {function(): void} Abonelikten çıkmak için kullanılabilecek bir fonksiyon döner.
   */
  subscribeToErrors(callback) {
    errorCallbacks.add(callback);
    return () => {
      errorCallbacks.delete(callback);
    };
  },
};

export default OtpListenerService;
