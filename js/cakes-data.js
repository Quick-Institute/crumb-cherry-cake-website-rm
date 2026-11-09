/* ==========================================
   ALL CAKES DATA - EDIT THIS FILE ONLY
   One entry per cake, with its sizes inside.
   cat   : Chocolate, Fruity, Coffee, Classic, Special diet
   pic   : (optional) your own photo, e.g. 'images/redvelvet.jpg'
   stock : (optional) 'out' = out of stock, 'call' = call to order
   Prices are in rupees.
   ========================================== */

// Phone number used by the "Call to order" button
const SHOP_PHONE = '+94000000000';

// Filter buttons
const CAKE_CATS = ['All', 'Chocolate', 'Fruity', 'Coffee', 'Classic', 'Special diet'];

// Photo used when a cake has no photo of its own
const CAKE_PIC = {
  Chocolate: 'images/choc.webp',
  Fruity: 'images/lemon.webp',
  Coffee: 'images/turtle.jpg',
  Classic: 'images/oreo.jpg',
  'Special diet': 'images/blue.webp'
};

const CAKES = [
  { id: 'c1', name: 'Perfect Chocolate Cake', cat: 'Chocolate',pic:'images/Perfect Chocolate Cake.png', sizes: [
    { label: '6″ 500g', price: 3200 }, { label: '8″ 1kg', price: 5700 }, { label: '2kg', price: 11000 } ] },
  { id: 'c2', name: 'Ribbon Cake', cat: 'Classic',pic:'images/Ribbon Cake.png', sizes: [
    { label: '6″ 500g', price: 2900 }, { label: '8″ 1kg', price: 5100 }, { label: '2kg', price: 9500 } ] },
  { id: 'c3', name: 'Butter Cake with Cashew', cat: 'Classic', sizes: [
    { label: 'Mini', price: 1300 }, { label: '1.2kg', price: 4300, stock: 'call' } ] },
  { id: 'c4', name: 'Butter Cake', cat: 'Classic', sizes: [
    { label: 'Mini', price: 1100 }, { label: '1.1kg', price: 3700, stock: 'call' } ] },
  { id: 'c5', name: 'Hazelnut Caramel Sponge', cat: 'Classic', sizes: [
    { label: '6″ 500g', price: 4500, stock: 'out' }, { label: '8″ 1kg', price: 8500, stock: 'out' } ] },
  { id: 'c6', name: 'Battenburg', cat: 'Classic',pic:'images/Battenburg.png', sizes: [
    { label: 'Mini, 4 slices', price: 2000 }, { label: 'Loaf, 8 slices', price: 4000 } ] },
  { id: 'c7', name: 'To Die For Chocolate Cake', cat: 'Chocolate', sizes: [
    { label: '6″', price: 5200 }, { label: '8″', price: 9500 } ] },
  { id: 'c8', name: 'Chocolate Treat', cat: 'Chocolate', sizes: [
    { label: '8″ 1kg', price: 6500 } ] },
  { id: 'c9', name: 'Ribbon Surprise', cat: 'Classic', sizes: [
    { label: '6″ 800g', price: 4500 }, { label: '8″ 1.5kg', price: 8000 } ] },
  { id: 'c10', name: 'Ultimate Chocolate Bliss', cat: 'Chocolate', sizes: [
    { label: '8″', price: 9300 } ] },
  { id: 'c11', name: 'Coffee Mocha', cat: 'Coffee', sizes: [
    { label: '6″ 500g', price: 3400 }, { label: '8″ 1kg', price: 6700 } ] },
  { id: 'c12', name: 'Coffee Cake', cat: 'Coffee', sizes: [
    { label: '6″ 500g', price: 3400 }, { label: '8″ 1kg', price: 6700 } ] },
  { id: 'c13', name: 'Chocolate Nougat Cake', cat: 'Chocolate', sizes: [
    { label: '6″ 500g', price: 3600 }, { label: '8″ 1kg', price: 6600 } ] },
  { id: 'c14', name: 'Orange Cake', cat: 'Fruity', sizes: [
    { label: '6″ 500g', price: 3800 }, { label: '8″ 1.2kg', price: 6900 } ] },
  { id: 'c15', name: 'Hummingbird Cake', cat: 'Fruity', sizes: [
    { label: '8″', price: 8300 } ] },
  { id: 'c16', name: 'Carrot Cake', cat: 'Classic', sizes: [
    { label: '6″', price: 4200 }, { label: '8″', price: 8200 } ] },
  { id: 'c17', name: 'Eggless Chocolate Cake', cat: 'Special diet', sizes: [
    { label: '6″ 500g', price: 3000 }, { label: '8″ 1kg', price: 5700 } ] },
  { id: 'c18', name: 'Gluten Free Hazelnut Cake', cat: 'Special diet', sizes: [
    { label: '880g', price: 7800, stock: 'out' } ] },
  { id: 'c19', name: 'Lemon Burst', cat: 'Fruity', sizes: [
    { label: '6″ 500g', price: 4200 }, { label: '8″ 1kg', price: 8100 } ] },
  { id: 'c20', name: 'Red Velvet Cake', cat: 'Classic', sizes: [
    { label: '8″ 1.3kg', price: 8800 } ] },
  { id: 'c21', name: 'Chocolate Pineapple Cake', cat: 'Chocolate', sizes: [
    { label: '6″', price: 5200 }, { label: '8″', price: 9400 } ] },
  { id: 'c22', name: 'Passion Paradise', cat: 'Fruity', sizes: [
    { label: '6″', price: 3400 }, { label: '8″', price: 6200 } ] },
  { id: 'c23', name: 'Good Old Chocolate Cake', cat: 'Chocolate', sizes: [
    { label: '6″ 500g', price: 3600 }, { label: '8″ 1kg', price: 6800 } ] },
  { id: 'c24', name: 'Almond Crunch', cat: 'Classic', sizes: [
    { label: '7″', price: 5100 } ] },
  { id: 'c25', name: 'Fruit Loaf', cat: 'Classic', sizes: [
    { label: '300g', price: 2000, stock: 'call' } ] },
  { id: 'c26', name: 'Midnight Mandarin', cat: 'Fruity', sizes: [
    { label: '6″ 500g', price: 3400 }, { label: '8″ 1kg', price: 6200 } ] },
  { id: 'c27', name: 'Chocolate Mud Cake', cat: 'Chocolate', sizes: [
    { label: '8″', price: 6700 } ] },
  { id: 'c28', name: 'Passion Loaf', cat: 'Fruity', sizes: [
    { label: 'Loaf', price: 1400 } ] },
  { id: 'c29', name: 'Lemon Loaf', cat: 'Fruity', sizes: [
    { label: 'Loaf', price: 1400 } ] },
  { id: 'c30', name: 'Vanilla Chocolate Chip', cat: 'Classic', sizes: [
    { label: '8″', price: 6200, stock: 'call' } ] },
  { id: 'c31', name: 'Victoria Sponge', cat: 'Classic', sizes: [
    { label: '6″', price: 3600, stock: 'call' }, { label: '8″ 1kg', price: 6900, stock: 'call' } ] },
  { id: 'c32', name: 'Jaggery Surprise', cat: 'Classic', sizes: [
    { label: '8″ 1kg', price: 6800 } ] }
];
