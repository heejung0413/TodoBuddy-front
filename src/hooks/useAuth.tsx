import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserServices } from '@/api/Services/User';
import { AxiosError } from 'axios';
import { AuthService } from '@/api/Services/Auth';
import { useCustomToast } from './useCustomToast';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toast = useCustomToast();
  const location = useLocation();

  // 로그인된 상태인지
  const checkLoginStatus = async () => {
    try {
      await UserServices.get();
      setIsLoggedIn(true);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 410) {
        fetchAccessToken();
      }
      setIsLoggedIn(false);
    }
  };

  const fetchAccessToken = async () => {
    try {
      await AuthService.post();
    } catch (e) {
      return e;
    }
  };

  const handleLoginOrLogout = () => {
    if (isLoggedIn) {
      handleSignOut();
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = async () => {
    try {
      await UserServices.logout();
      navigate('/login');
      toast.info('로그아웃되었습니다.');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('로그아웃 에러', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn, location.pathname]);

  return { isLoggedIn, handleLoginOrLogout, setIsLoggedIn };
};
