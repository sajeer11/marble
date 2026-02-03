
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { getMarbleAdvice } from './geminiService';
import { CartProvider } from './CartContext';

const MarbleAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    setLoading(true);

    const advice = await getMarbleAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: advice || '' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
        >
          <span className="material-icons">auto_awesome</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-surface-dark w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col h-[500px]">
          <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-primary text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="material-icons">auto_awesome</span>
              <span className="font-bold">Stone Consultant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="material-icons">close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-gray-400 text-sm text-center italic mt-10">Ask me anything about marble selection, care, or design!</p>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-800 dark:text-white rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-primary animate-pulse">Consultant is thinking...</div>}
          </div>
          <div className="p-4 border-t dark:border-gray-800 flex gap-2">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..." 
              className="flex-1 h-10 px-4 rounded-lg bg-gray-50 dark:bg-background-dark border-none focus:ring-1 focus:ring-primary text-sm"
            />
            <button onClick={handleSend} className="bg-primary text-white px-3 rounded-lg flex items-center justify-center">
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
          <MarbleAssistant />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
