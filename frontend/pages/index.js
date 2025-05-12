import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = ['Todos', ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  return (
    <Container>
      <Title>Catálogo de Produtos</Title>

      {/* Filtro de categorias */}
      <CategoryFilter>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => handleCategoryChange(category)}
            active={selectedCategory === category}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>

      {/* Lista de produtos */}
      <ProductsRow>
        {filteredProducts.map((product) => (
          <ProductCard key={product._id}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductDetails>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
              <AddToCartButton onClick={() => addToCart(product)}>
                Adicionar ao carrinho
              </AddToCartButton>
            </ProductDetails>
          </ProductCard>
        ))}
      </ProductsRow>
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

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? '#3498db' : '#ddd')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9;
    color: #fff;
  }
`;

const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Reduz o espaçamento entre os itens */
  justify-content: center;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  width: 200px; /* Define uma largura fixa */
  height: 300px; /* Define uma altura fixa */
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Garante espaçamento uniforme */
  overflow: hidden; /* Garante que o conteúdo não ultrapasse os limites */
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px; /* Define uma altura fixa para a imagem */
  object-fit: cover; /* Garante que a imagem se ajuste sem distorção */
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  height: 2.4rem; /* Define uma altura fixa para o nome */
  overflow: hidden; /* Esconde o texto que ultrapassar a altura */
  text-overflow: ellipsis; /* Adiciona reticências ao final do texto */
  white-space: nowrap; /* Impede que o texto quebre em várias linhas */
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #e74c3c;
  margin-top: 0px;
  margin-bottom: 3px;
`;

const AddToCartButton = styled.button`
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto; /* Garante que o botão fique na parte inferior */
  &:hover {
    background-color: #2980b9;
  }
`;
