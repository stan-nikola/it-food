import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';

import { useAuth } from 'components/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useEffect, useState } from 'react';

import { FaCameraRetro } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import PhoneInput from 'react-phone-input-2';

export const LogOutForm = ({ modalToggle }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { name, avatarUrl, email, phone } = user;

  const [avatarImage, setAvatarImage] = useState(null);
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

  const handleLogOut = () => {
    dispatch(logOut());
    modalToggle();
  };

  const handleAvatarChange = e => {
    console.log(e.target.files);
    setAvatarImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSaveUserData = () => {
    console.log('handleSaveUserData');
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <div className={s.inputWrapper}>
        <img
          className={`${s.logOut_avatar}`}
          src={avatarImage || avatarUrl}
          alt="user avatar"
        />
        {showEditProfile && (
          <>
            {avatarImage ? (
              <button
                className={s.clear_image_btn}
                type="button"
                onClick={() => setAvatarImage(null)}
              >
                <RxCross1 />
              </button>
            ) : (
              <form
                className={s.inputContainer}
                method="post"
                encType="multipart/form-data"
              >
                <label htmlFor="apply">
                  <input
                    className={s.inputField}
                    onChange={handleAvatarChange}
                    type="file"
                    name=""
                    id="apply"
                    accept="image/*"
                  />
                  <FaCameraRetro />
                </label>
              </form>
            )}
          </>
        )}
      </div>
      <p className={s.logOut_text}>{email}</p>
      {showEditProfile ? (
        <form>
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
        </form>
      ) : (
        <div className={s.user_edit_info}>
          <p className={`${s.logOut_text} ${s.logOut_text_name}`}>{name}</p>

          <p className={s.logOut_text}>{phone}</p>
        </div>
      )}

      {showEditProfile ? (
        <button
          onClick={handleSaveUserData}
          className={s.signIn_btn}
          type="button"
        >
          SAVE CHANGES
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
        <button onClick={handleLogOut} className={s.signIn_btn} type="button">
          LOG OUT
        </button>
      )}
    </div>
  );
};
