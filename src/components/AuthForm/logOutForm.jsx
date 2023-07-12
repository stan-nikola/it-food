import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';

import { useAuth } from 'components/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useEffect, useState } from 'react';

import { FaCameraRetro } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import PhoneInput from 'react-phone-input-2';
import { changeUserData } from 'redux/user/operations';
import { toast } from 'react-toastify';
import { mainToast } from 'constants/toastConfig';
import { error } from 'redux/auth/authSlice';

export const LogOutForm = ({ modalToggle }) => {
  const { user, isError, isLoading } = useAuth();

  const dispatch = useDispatch();

  const { name, avatarUrl, email, phone, giftCoin } = user;

  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [userName, setUserName] = useState(name);
  const [userPhone, setUserPhone] = useState(phone);
  const [handleError, setHandleError] = useState(null);

  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    setHandleError(null);

    if (userName.length > 16 || userName.length < 3) {
      setHandleError('User name must be on 3 to 16');
    }
  }, [userName.length]);

  useEffect(() => {
    !isLoading && setAvatarImage(null);
    !isLoading && setShowEditProfile(prev => !prev);
  }, [isError, isLoading, modalToggle]);

  useEffect(() => {
    if (isError) {
      toast.error(isError.message, mainToast);
    }

    dispatch(error(null));
  }, [dispatch, isError]);

  const handleLogOut = () => {
    dispatch(logOut());
    modalToggle();
  };

  const handleAvatarChange = e => {
    setAvatarImage(URL.createObjectURL(e.target.files[0]));
    setAvatarFile(e.target.files[0]);
  };

  const handleSaveUserData = async () => {
    const data = new FormData();
    data.append('avatarImage', avatarFile);
    data.append('name', userName);
    data.append('phone', userPhone);

    dispatch(changeUserData(data));
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <div className={s.user_profile}>
        <img
          className={s.logOut_avatar}
          src={avatarImage || avatarUrl}
          alt="user avatar"
        />
        {showEditProfile ? (
          <>
            <form
              className={s.user_form}
              action="/users/changeUserData"
              method="patch"
              encType="multipart/form-data"
            >
              {avatarImage ? (
                <button
                  className={s.upload_button}
                  type="button"
                  onClick={() => setAvatarImage(null)}
                >
                  <RxCross1 />
                </button>
              ) : (
                <label className={s.upload_button} htmlFor="upload">
                  <input
                    className={s.uploadField}
                    onChange={handleAvatarChange}
                    type="file"
                    name=""
                    id="upload"
                    accept="image/*"
                  />
                  <FaCameraRetro />
                </label>
              )}

              <div>
                <label htmlFor="name">
                  <input
                    className={s.signIn_field}
                    placeholder="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                  />

                  {handleError && (
                    <div className={s.signIn_form_error}>{handleError}</div>
                  )}
                </label>
                <label htmlFor="phone">
                  <PhoneInput
                    className={s.signIn_phone}
                    inputClass={s.signIn_phone_input}
                    buttonClass={s.signIn_phone_flag}
                    id="phone"
                    name="phone"
                    type="phone"
                    isValid={value => {
                      if (value.length < 12) {
                        return;
                      } else {
                        return true;
                      }
                    }}
                    country={'ua'}
                    onChange={setUserPhone}
                    value={userPhone}
                  />
                  {/* {errors.phone && touched.phone && (
              <div className={s.signIn_form_error}>{errors.phone}</div>
            )} */}
                </label>
              </div>
            </form>
          </>
        ) : (
          <div className={s.user_edit_info}>
            <p className={`${s.logOut_text} ${s.logOut_text_name}`}>{name}</p>
            <p className={s.logOut_text}>{email}</p>
            <p className={s.logOut_text}>{phone}</p>
            <p className={s.logOut_text}>Gift coins:{giftCoin}</p>
          </div>
        )}
      </div>

      {showEditProfile ? (
        <button
          disabled={isLoading}
          onClick={handleSaveUserData}
          className={s.signIn_btn}
          type="button"
        >
          {isLoading ? 'LOADING...' : 'SAVE CHANGES'}
        </button>
      ) : (
        <button
          onClick={() => setShowEditProfile(prev => !prev)}
          className={s.signIn_btn}
          type="button"
        >
          EDIT PROFILE
        </button>
      )}

      {!showEditProfile && (
        <button
          disabled={isLoading}
          onClick={handleLogOut}
          className={s.signIn_btn}
          type="button"
        >
          LOG OUT
        </button>
      )}
    </div>
  );
};
