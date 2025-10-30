import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface LibraryGame {
  id: number;
  title: string;
  image: string;
  lastPlayed: string;
  hoursPlayed: number;
  progress: number;
  achievements: { unlocked: number; total: number };
}

const libraryGames: LibraryGame[] = [
  {
    id: 1,
    title: 'Dragon Quest Legends',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/16cc42a4-51c3-4f82-a1b4-3db2b514705b.jpg',
    lastPlayed: '2 часа назад',
    hoursPlayed: 127,
    progress: 85,
    achievements: { unlocked: 42, total: 50 }
  },
  {
    id: 2,
    title: 'Neon Velocity',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/a31a91f0-a46a-4860-8a22-dd51599bd498.jpg',
    lastPlayed: 'Вчера',
    hoursPlayed: 64,
    progress: 100,
    achievements: { unlocked: 30, total: 30 }
  },
  {
    id: 3,
    title: 'Stellar Odyssey',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/2d727aff-6c61-4c66-9f3f-42c6b419e7bc.jpg',
    lastPlayed: '3 дня назад',
    hoursPlayed: 201,
    progress: 67,
    achievements: { unlocked: 88, total: 120 }
  },
  {
    id: 4,
    title: 'Shadow Strike',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/c3575195-1ee8-4ac7-abd5-a1393aa7c87b.jpg',
    lastPlayed: 'Неделю назад',
    hoursPlayed: 89,
    progress: 45,
    achievements: { unlocked: 15, total: 40 }
  }
];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'hours' | 'name'>('recent');

  const filteredGames = libraryGames
    .filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'hours') return b.hoursPlayed - a.hoursPlayed;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  const totalHours = libraryGames.reduce((sum, game) => sum + game.hoursPlayed, 0);
  const totalAchievements = libraryGames.reduce((sum, game) => sum + game.achievements.unlocked, 0);

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
                  <Button variant="ghost" className="text-primary">
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-heading font-bold mb-4">Моя библиотека</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Icon name="Gamepad2" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{libraryGames.length}</p>
                    <p className="text-sm text-muted-foreground">Игр в библиотеке</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalHours}</p>
                    <p className="text-sm text-muted-foreground">Часов сыграно</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Icon name="Trophy" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalAchievements}</p>
                    <p className="text-sm text-muted-foreground">Достижений получено</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск в библиотеке..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'recent' ? 'default' : 'outline'}
              onClick={() => setSortBy('recent')}
            >
              Недавние
            </Button>
            <Button
              variant={sortBy === 'hours' ? 'default' : 'outline'}
              onClick={() => setSortBy('hours')}
            >
              По времени
            </Button>
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              onClick={() => setSortBy('name')}
            >
              По названию
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredGames.map((game) => (
            <Card key={game.id} className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full md:w-72 h-48 object-cover"
                />
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-heading font-bold mb-2">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Последний запуск: {game.lastPlayed}
                      </p>
                    </div>
                    <Button>
                      <Icon name="Play" size={18} className="mr-2" />
                      Играть
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Прогресс прохождения</span>
                        <span className="text-sm font-semibold">{game.progress}%</span>
                      </div>
                      <Progress value={game.progress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="text-sm">{game.hoursPlayed} часов сыграно</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Trophy" size={16} className="text-yellow-400" />
                        <span className="text-sm">
                          {game.achievements.unlocked} / {game.achievements.total} достижений
                        </span>
                        {game.achievements.unlocked === game.achievements.total && (
                          <Badge className="bg-secondary">100%</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Игры не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
}
