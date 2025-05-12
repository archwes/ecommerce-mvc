import { useCart } from '../context/CartContext';
import { useState } from 'react';
import styled from 'styled-components';

export default function Checkout() {
  const { cartItems, updateQuantity } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '', paymentMethod: 'credit_card' });
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { ...form, items: cartItems, total };
    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const result = await res.json();
      console.log(result.message);
      alert('Pedido enviado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar pedido.');
    }
  };

  return (
    <Container>
      <Title>Checkout</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" name="name" placeholder="Nome"
          value={form.name} onChange={handleChange} required 
        />
        <Input 
          type="email" name="email" placeholder="E-mail"
          value={form.email} onChange={handleChange} required 
        />
        <Input 
          type="text" name="address" placeholder="Endereço"
          value={form.address} onChange={handleChange} required 
        />
        <Select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
          <option value="credit_card">Cartão de Crédito</option>
          <option value="boleto">Boleto</option>
          <option value="pix">Pix</option>
        </Select>
        <SubmitButton type="submit">Finalizar Pedido</SubmitButton>
      </Form>

      <CartSummary>
        <SummaryTitle>Resumo do Pedido</SummaryTitle>
        {cartItems.map((item) => (
          <SummaryItem key={item._id}>
            {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => updateQuantity(item._id, 1)}>+</button>
            <button onClick={() => updateQuantity(item._id, -1)}>-</button>
          </SummaryItem>
        ))}
        <TotalPrice><strong>Total:</strong> R$ {total.toFixed(2)}</TotalPrice>
      </CartSummary>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9;
  }
`;

const CartSummary = styled.div`
  margin-top: 40px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.h2`
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
`;

const TotalPrice = styled.p`
  font-size: 1.25rem;
  color: #e74c3c;
  font-weight: bold;
  margin-top: 20px;
`;
