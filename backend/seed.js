require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function runSeed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB para seed');

    await Product.deleteMany({});

    const products = [
      { name: 'Camiseta Básica', price: 49.9, category: 'Roupas', imageUrl: 'https://eloemcomum.com/cdn/shop/files/aff08a0f3a7f5427a798d776af284bee.jpg?v=1712212585&width=1445' },
      { name: 'Camiseta CS 1.6', price: 79.9, category: 'Roupas', imageUrl: 'https://ih1.redbubble.net/image.92332368.8189/ssrco,slim_fit_t_shirt,flatlay,101010:01c5ca27c6,front,wide_portrait,x1000-bg,f8f8f8.1.webp' },
      { name: 'Camiseta Portal', price: 79.9, category: 'Roupas', imageUrl: 'https://res.cloudinary.com/teepublic/image/private/s--W1nNDGqK--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1446182183/production/designs/113776_0.jpg' },
      { name: 'Caneca Bolso-Tsé', price: 29.9, category: 'Utensílios', imageUrl: 'https://down-br.img.susercontent.com/file/6528c5ae5edbabebe33b59173b2fc72b' },
      { name: 'Lança-Chamas', price: 8000.9, category: 'Utensílios', imageUrl: 'https://i.guim.co.uk/img/media/3cc758472189c8f9b76e00cbf6bbabd2da1d7a76/103_0_1295_777/master/1295.png?width=1200&quality=85&auto=format&fit=max&s=ab78e409f6d0ac0198b81ff81015dd3a' },      
      { name: 'Agenda 2025', price: 39.9, category: 'Papelaria', imageUrl: 'https://cdn.sistemawbuy.com.br/arquivos/7c5da54be73df74017175ddfc29b8df3/produtos/6769b304362f8/agenda-2025-com-caneta-ano-vazado-1-f7kmg6a73a-6769b364b37c8.jpg' },
      { name: 'Pokémon TCG Trainer Box', price: 1880.9, category: 'Papelaria', imageUrl: 'https://m.media-amazon.com/images/I/81M2GcPdrcL.jpg' },
      { name: 'Alcorão', price: 59.9, category: 'Livros', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Qur%27ans.jpg' },
      { name: 'Ikigai', price: 49.9, category: 'Livros', imageUrl: 'https://ikkadukka.com/cdn/shop/products/ikigai-the-japanese-secret-to-a-long-and-happy-life-book-books-house-home-lifestyle-newarrivals-product-type-ikkadukka-store-ikka-dukka-eclectic-online_580.jpg?v=1584737493' }
    ];
    await Product.insertMany(products);
    console.log(`Seed finalizada: ${products.length} produtos inseridos`);
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err);
    process.exit(1);
  }
}

runSeed();
