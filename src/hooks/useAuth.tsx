import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '@/api/Services/User';
import { AxiosError } from 'axios';
import { AuthService } from '@/api/Services/Auth';
import { useCustomToast } from './useCustomToast';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toast = useCustomToast();

  // 로그인된 상태인지
  const checkLoginStatus = async () => {
    try {
      const result = await UserServices.get();
      if (result) {
        setIsLoggedIn(true);
      }
      console.log(isLoggedIn);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 410) {
        fetchAccessToken();
      }
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

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

  return { isLoggedIn, handleLoginOrLogout, setIsLoggedIn };
};
