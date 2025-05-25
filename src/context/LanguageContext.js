import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    welcome: "Welcome to Esraa Movies",
    home: "Home",
    favorites: "Favorites",
    register: "Register",
    login: "Login",
    signIn: "Sign In",
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to continue to Esraa Movies",
    emailAddress: "Email Address",
    password: "Password",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create Account",
    joinEsraa: "Join Esraa Movies and start exploring movies",
    name: "Name",
    username: "Username",
    enterName: "Enter your name",
    chooseUsername: "Choose a username",
    createPassword: "Create a password",
    alreadyHaveAccount: "Already have an account?",
    searchMovies: "Search movies...",
    popular: "Popular",
    topRated: "Top Rated",
    nowPlaying: "Now Playing",
    upcoming: "Upcoming",
    search: "Search",
    clear: "Clear",
    myFavoriteMovies: "My Favorite Movies",
    noFavorites: "No favorite movies yet. Add some movies to your favorites!"
  },
  ar: {
    welcome: "مرحباً بك في أفلام إسراء",
    home: "الرئيسية",
    favorites: "المفضلة",
    register: "تسجيل",
    login: "تسجيل الدخول",
    signIn: "تسجيل الدخول",
    welcomeBack: "مرحباً بعودتك",
    signInToContinue: "سجل دخولك للاستمرار في أفلام إسراء",
    emailAddress: "البريد الإلكتروني",
    password: "كلمة المرور",
    enterEmail: "أدخل بريدك الإلكتروني",
    enterPassword: "أدخل كلمة المرور",
    dontHaveAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    joinEsraa: "انضم إلى أفلام إسراء وابدأ استكشاف الأفلام",
    name: "الاسم",
    username: "اسم المستخدم",
    enterName: "أدخل اسمك",
    chooseUsername: "اختر اسم مستخدم",
    createPassword: "أنشئ كلمة مرور",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    searchMovies: "ابحث عن أفلام...",
    popular: "الأكثر شعبية",
    topRated: "الأعلى تقييماً",
    nowPlaying: "يعرض الآن",
    upcoming: "قريباً",
    search: "بحث",
    clear: "مسح",
    myFavoriteMovies: "أفلامي المفضلة",
    noFavorites: "لا توجد أفلام مفضلة بعد. أضف بعض الأفلام إلى المفضلة!"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}; 