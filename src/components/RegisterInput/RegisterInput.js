import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword, signOut, updateProfile
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../../utils/firebaseConfig';
import useInput from '../../hooks/useInput';
import '../LoginInput/LoginInput.scss';

function RegisterInput() {
  const [name, nameChange] = useInput('');
  const [email, emailChange] = useInput('');
  const [password, passwordChange] = useInput('');
  const [passwordConfirm, passwordConfirmChange] = useInput('');

  const navigate = useNavigate();

  const registerFormHandle = async (e) => {
    e.preventDefault();

    try {
      if (password === passwordConfirm) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
          displayName: name,
        });
        await signOut(auth);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Akun berhasil dibuat',
          confirmButtonColor: '#00adb5',
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Konfirmasi password tidak sama',
          confirmButtonColor: '#00adb5',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.code,
        confirmButtonColor: '#00adb5',
      });
    }
  };

  return (
    <form onSubmit={registerFormHandle}>
      <label className="d-block text-primary fw-bold" htmlFor="name">
        Nama
        <input
          className="form-control border-0 rounded-0 border-bottom border-2 shadow-none p-0 pt-1 border-primary"
          type="text"
          id="name"
          onChange={nameChange}
          required
        />
      </label>
      <label className="d-block mt-3 text-primary fw-bold" htmlFor="email">
        Email
        <input
          className="form-control border-0 rounded-0 border-bottom border-2 shadow-none p-0 pt-1 border-primary"
          type="email"
          id="email"
          onChange={emailChange}
          required
        />
      </label>
      <label className="d-block mt-3 text-primary fw-bold" htmlFor="password">
        Password
        <input
          className="form-control border-0 rounded-0 border-bottom border-2 shadow-none p-0 pt-1 border-primary"
          type="password"
          id="password"
          onChange={passwordChange}
          required
        />
      </label>
      <label className="d-block mt-3 text-primary fw-bold" htmlFor="passwordConfirm">
        Konfirmasi Password
        <input
          className="form-control border-0 rounded-0 border-bottom border-2 shadow-none p-0 pt-1 border-primary"
          type="password"
          id="passwordConfirm"
          onChange={passwordConfirmChange}
          required
        />
      </label>
      <button className="btn btn-primary p-2 text-white border-0 mt-3 w-100 login-input__btn-login" type="submit">Buat akun baru</button>
    </form>
  );
}

export default RegisterInput;
