import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GameData {
  id: number;
  title: string;
  image: string;
  genre: string[];
  rating: number;
  players: string;
  description: string;
  detailedDescription: string;
  developer: string;
  releaseDate: string;
  size: string;
  requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
  };
}

const gamesData: Record<number, GameData> = {
  1: {
    id: 1,
    title: 'Dragon Quest Legends',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/16cc42a4-51c3-4f82-a1b4-3db2b514705b.jpg',
    genre: ['RPG', 'Fantasy', 'Adventure'],
    rating: 4.8,
    players: '2.5M',
    description: 'Эпическое фэнтезийное приключение в мире драконов и магии',
    detailedDescription: 'Погрузитесь в захватывающий мир Dragon Quest Legends, где древние драконы правят небесами, а магия пронизывает каждый уголок земли. Создайте своего уникального героя, исследуйте огромный открытый мир, сражайтесь с легендарными существами и раскройте тайны забытых цивилизаций. Динамичная боевая система, глубокая кастомизация персонажа и увлекательный сюжет ждут вас!',
    developer: 'Epic Games Studio',
    releaseDate: '15 марта 2024',
    size: '45 GB',
    requirements: {
      os: 'Windows 10/11',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GTX 1060 / AMD RX 580'
    }
  },
  2: {
    id: 2,
    title: 'Neon Velocity',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/a31a91f0-a46a-4860-8a22-dd51599bd498.jpg',
    genre: ['Racing', 'Cyberpunk', 'Action'],
    rating: 4.6,
    players: '1.8M',
    description: 'Футуристические гонки в неоновом киберпанк-городе',
    detailedDescription: 'Испытайте адреналин в мире Neon Velocity! Гоняйте на футуристических болидах по неоновым улицам киберпанк-мегаполиса. Кастомизируйте свой автомобиль, участвуйте в нелегальных гонках и станьте легендой ночного города.',
    developer: 'Neon Dreams Interactive',
    releaseDate: '8 июня 2024',
    size: '28 GB',
    requirements: {
      os: 'Windows 10/11',
      processor: 'Intel Core i5-9400F / AMD Ryzen 5 3600',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GTX 1660 / AMD RX 5600'
    }
  }
};

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const game = gamesData[Number(id)] || gamesData[1];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/">
                <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                  freePlay
                </h1>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <Icon name="Home" size={18} className="mr-2" />
                    Главная
                  </Button>
                </Link>
                <Link to="/library">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <Icon name="Library" size={18} className="mr-2" />
                    Библиотека
                  </Button>
                </Link>
                <Link to="/store">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Магазин
                  </Button>
                </Link>
              </nav>
            </div>
            <Avatar className="cursor-pointer border-2 border-primary hover:border-accent transition-colors">
              <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="relative h-[500px] overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-6xl font-heading font-bold mb-4">{game.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={24} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={24} />
                    <span className="text-xl">{game.players} игроков</span>
                  </div>
                  <div className="flex gap-2">
                    {game.genre.map((g) => (
                      <Badge key={g} variant="outline" className="text-sm">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="Play" size={20} className="mr-2" />
                  Играть бесплатно
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Plus" size={20} className="mr-2" />
                  В библиотеку
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">Описание</TabsTrigger>
                <TabsTrigger value="requirements">Требования</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-heading font-bold mb-4">Об игре</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {game.detailedDescription}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Разработчик</p>
                        <p className="font-semibold">{game.developer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Дата выхода</p>
                        <p className="font-semibold">{game.releaseDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Размер</p>
                        <p className="font-semibold">{game.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Жанры</p>
                        <p className="font-semibold">{game.genre.join(', ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-4">Особенности</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Одиночная кампания</p>
                          <p className="text-sm text-muted-foreground">Увлекательная история на 40+ часов</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Многопользовательский режим</p>
                          <p className="text-sm text-muted-foreground">Кооператив до 4 игроков</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Достижения</p>
                          <p className="text-sm text-muted-foreground">50+ достижений для коллекционеров</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Облачные сохранения</p>
                          <p className="text-sm text-muted-foreground">Играйте на любом устройстве</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-heading font-bold mb-6">Системные требования</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Операционная система</p>
                        <p className="font-semibold">{game.requirements.os}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Процессор</p>
                        <p className="font-semibold">{game.requirements.processor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Оперативная память</p>
                        <p className="font-semibold">{game.requirements.memory}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Видеокарта</p>
                        <p className="font-semibold">{game.requirements.graphics}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Место на диске</p>
                        <p className="font-semibold">{game.size}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-heading font-bold">Отзывы игроков</h2>
                      <Button>Написать отзыв</Button>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-border pb-4 last:border-0">
                          <div className="flex items-start gap-3 mb-2">
                            <Avatar>
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">Игрок {i}</p>
                                <div className="flex">
                                  {[...Array(5)].map((_, j) => (
                                    <Icon key={j} name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">2 дня назад</p>
                              <p className="text-sm">
                                Отличная игра! Графика потрясающая, геймплей захватывающий. Рекомендую всем любителям жанра!
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-4">Статистика</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Активных игроков</span>
                    <span className="font-semibold">{game.players}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Средняя оценка</span>
                    <span className="font-semibold">{game.rating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Всего отзывов</span>
                    <span className="font-semibold">12,543</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-4">Похожие игры</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                      <img
                        src={game.image}
                        alt="Similar game"
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Похожая игра {i}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">4.{8 - i}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
