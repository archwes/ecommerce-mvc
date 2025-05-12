import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      router.push('/login');
    } else {
      setError(data.message);
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Registrar</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">Usuário</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <RegisterButton type="submit">Registrar</RegisterButton>
        </Form>
        <LoginLink>
          Já tem uma conta? <a href="/login">Entrar</a>
        </LoginLink>
      </FormBox>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f6f8;
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const RegisterButton = styled.button`
  padding: 12px;
  background-color: #3498db;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 10px;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 0.95rem;
  color: #666;

  a {
    color: #3498db;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
