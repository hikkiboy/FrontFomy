import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

function PasswordReset() {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Email de recuperação de senha enviado. Verifique sua caixa de entrada.');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar o email de recuperação de senha. Verifique o endereço de email fornecido.');
    }
  }

  return (
    <div>
      <h2>Recuperação de Senha</h2>
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Enviar Email de Recuperação</button>
    </div>
  );
}

export default PasswordReset;
