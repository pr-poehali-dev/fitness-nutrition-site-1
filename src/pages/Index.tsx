import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Whey Protein Premium',
    category: 'Протеин',
    price: 2499,
    oldPrice: 2999,
    image: 'https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/d96b04e4-7505-47a1-874c-184d5ae8e7c5.jpg',
    badge: 'ХИТ',
  },
  {
    id: 2,
    name: 'Mass Gainer 3000',
    category: 'Гейнеры',
    price: 3299,
    image: 'https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/8fcd25cd-d893-458f-b5d5-b3e4bf2366cf.jpg',
  },
  {
    id: 3,
    name: 'Creatine Monohydrate',
    category: 'Креатин',
    price: 1299,
    image: 'https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/86066bb5-0b4d-47d1-b793-56c4e3efdb49.jpg',
    badge: 'НОВИНКА',
  },
  {
    id: 4,
    name: 'BCAA Complex',
    category: 'Аминокислоты',
    price: 1799,
    oldPrice: 2199,
    image: 'https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/d96b04e4-7505-47a1-874c-184d5ae8e7c5.jpg',
  },
  {
    id: 5,
    name: 'Pre-Workout Explosive',
    category: 'Предтреники',
    price: 2199,
    image: 'https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/8fcd25cd-d893-458f-b5d5-b3e4bf2366cf.jpg',
  },
  {
    id: 6,
    name: 'Glutamine Pure',
    category: 'Аминокислоты',
    price: 1499,
    image: 'https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/86066bb5-0b4d-47d1-b793-56c4e3efdb49.jpg',
    badge: 'СКИДКА',
  },
];

const reviews = [
  {
    id: 1,
    name: 'Алексей М.',
    rating: 5,
    text: 'Отличный магазин! Заказываю протеин уже третий раз. Качество на высоте, доставка быстрая.',
  },
  {
    id: 2,
    name: 'Дмитрий К.',
    rating: 5,
    text: 'Креатин работает отлично, результаты заметны уже через две недели. Рекомендую!',
  },
  {
    id: 3,
    name: 'Игорь В.',
    rating: 5,
    text: 'Лучшие цены на рынке. Всегда нахожу нужные добавки по акциям.',
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary">IRONFIT</h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setActiveSection('home')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === 'home' ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  Главная
                </button>
                <button
                  onClick={() => setActiveSection('catalog')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === 'catalog' ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  Каталог
                </button>
                <button
                  onClick={() => setActiveSection('delivery')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === 'delivery' ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  Доставка
                </button>
                <button
                  onClick={() => setActiveSection('reviews')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === 'reviews' ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  Отзывы
                </button>
                <button
                  onClick={() => setActiveSection('contacts')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === 'contacts' ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  Контакты
                </button>
              </nav>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{item.price * item.quantity} ₽</p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <>
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url(https://cdn.poehali.dev/projects/c04f4981-a003-4964-94f9-3f4b58e61f59/files/8fcd25cd-d893-458f-b5d5-b3e4bf2366cf.jpg)',
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                ПОСТРОЙ ИДЕАЛЬНОЕ ТЕЛО
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-foreground/90 max-w-2xl mx-auto">
                Профессиональное спортивное питание для достижения максимальных результатов
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover-scale"
                onClick={() => setActiveSection('catalog')}
              >
                Перейти в каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </section>

          <section className="py-16 bg-card/50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card hover-scale transition-all border-2 border-transparent hover:border-primary">
                  <CardContent className="p-8 text-center">
                    <Icon name="Zap" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-3">Быстрая доставка</h3>
                    <p className="text-muted-foreground">
                      Доставим ваш заказ в течение 1-3 дней по всей России
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card hover-scale transition-all border-2 border-transparent hover:border-primary">
                  <CardContent className="p-8 text-center">
                    <Icon name="Shield" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-3">100% Качество</h3>
                    <p className="text-muted-foreground">
                      Оригинальная продукция от ведущих мировых брендов
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card hover-scale transition-all border-2 border-transparent hover:border-primary">
                  <CardContent className="p-8 text-center">
                    <Icon name="Percent" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-3">Выгодные акции</h3>
                    <p className="text-muted-foreground">
                      Регулярные скидки и специальные предложения для клиентов
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold">Популярные товары</h2>
                <Button variant="outline" onClick={() => setActiveSection('catalog')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover-scale transition-all border-2 border-transparent hover:border-primary"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {product.badge && (
                        <Badge className="absolute top-4 right-4 z-10 bg-secondary">
                          {product.badge}
                        </Badge>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <h3 className="text-xl font-bold mb-4">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-primary">{product.price} ₽</span>
                        {product.oldPrice && (
                          <span className="text-lg line-through text-muted-foreground">
                            {product.oldPrice} ₽
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'catalog' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Каталог товаров</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover-scale transition-all border-2 border-transparent hover:border-primary"
                >
                  <div className="relative h-64 overflow-hidden">
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 z-10 bg-secondary">
                        {product.badge}
                      </Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <h3 className="text-xl font-bold mb-4">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-primary">{product.price} ₽</span>
                      {product.oldPrice && (
                        <span className="text-lg line-through text-muted-foreground">
                          {product.oldPrice} ₽
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Доставка и оплата</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="flex gap-4 mb-4">
                    <Icon name="Truck" size={32} className="text-primary" />
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Доставка</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Курьерская доставка по Москве - 300 ₽ (бесплатно от 3000 ₽)</li>
                        <li>• Доставка по России - 400 ₽ (бесплатно от 5000 ₽)</li>
                        <li>• Самовывоз из пункта выдачи - бесплатно</li>
                        <li>• Среднее время доставки: 1-3 дня</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <div className="flex gap-4 mb-4">
                    <Icon name="CreditCard" size={32} className="text-primary" />
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Оплата</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Банковские карты (Visa, Mastercard, МИР)</li>
                        <li>• Оплата при получении наличными</li>
                        <li>• Электронные кошельки (ЮMoney, QIWI)</li>
                        <li>• Безналичный расчет для юридических лиц</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Отзывы клиентов</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold">{review.name}</h3>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-4">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <div>
                      <h3 className="font-bold mb-2">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="Mail" size={24} className="text-primary" />
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <p className="text-muted-foreground">info@ironfit.ru</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    <div>
                      <h3 className="font-bold mb-2">Адрес</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Спортивная, д. 10</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="Clock" size={24} className="text-primary" />
                    <div>
                      <h3 className="font-bold mb-2">Режим работы</h3>
                      <p className="text-muted-foreground">Пн-Вс: 9:00 - 21:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Сообщение"
                        rows={4}
                        className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-black border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">IRONFIT</h3>
              <p className="text-muted-foreground">
                Профессиональное спортивное питание для достижения ваших целей
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Протеин</li>
                <li>Гейнеры</li>
                <li>Креатин</li>
                <li>Аминокислоты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Доставка и оплата</li>
                <li>Акции и скидки</li>
                <li>Отзывы</li>
                <li>О компании</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@ironfit.ru</li>
                <li>Москва, ул. Спортивная, 10</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 IRONFIT. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
