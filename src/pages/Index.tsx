import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  image: string;
  genre: string[];
  rating: number;
  players: string;
  description: string;
}

interface Friend {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'playing';
  game?: string;
  avatar: string;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Dragon Quest Legends',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/16cc42a4-51c3-4f82-a1b4-3db2b514705b.jpg',
    genre: ['RPG', 'Fantasy', 'Adventure'],
    rating: 4.8,
    players: '2.5M',
    description: 'Эпическое фэнтезийное приключение в мире драконов и магии'
  },
  {
    id: 2,
    title: 'Neon Velocity',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/a31a91f0-a46a-4860-8a22-dd51599bd498.jpg',
    genre: ['Racing', 'Cyberpunk', 'Action'],
    rating: 4.6,
    players: '1.8M',
    description: 'Футуристические гонки в неоновом киберпанк-городе'
  },
  {
    id: 3,
    title: 'Stellar Odyssey',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/2d727aff-6c61-4c66-9f3f-42c6b419e7bc.jpg',
    genre: ['Sci-Fi', 'Exploration', 'Survival'],
    rating: 4.9,
    players: '3.2M',
    description: 'Исследуйте далекие планеты и выживайте в космосе'
  },
  {
    id: 4,
    title: 'Shadow Strike',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/c3575195-1ee8-4ac7-abd5-a1393aa7c87b.jpg',
    genre: ['Action', 'Shooter', 'Tactical'],
    rating: 4.7,
    players: '4.1M',
    description: 'Тактический шутер с командной игрой'
  },
  {
    id: 5,
    title: 'Mystic Realms',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/1684be4f-57a1-4e3f-b2fc-10a6415ac633.jpg',
    genre: ['RPG', 'Fantasy', 'MMORPG'],
    rating: 4.5,
    players: '5.3M',
    description: 'Массовая многопользовательская ролевая игра'
  },
  {
    id: 6,
    title: 'Battle Royale Extreme',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/c3575195-1ee8-4ac7-abd5-a1393aa7c87b.jpg',
    genre: ['Action', 'Battle Royale', 'Survival'],
    rating: 4.4,
    players: '8.7M',
    description: '100 игроков, один победитель'
  }
];

const friends: Friend[] = [
  { id: 1, name: 'Алексей', status: 'online', game: 'Dragon Quest', avatar: '🎮' },
  { id: 2, name: 'Мария', status: 'playing', game: 'Neon Velocity', avatar: '👾' },
  { id: 3, name: 'Дмитрий', status: 'online', avatar: '🕹️' },
  { id: 4, name: 'Анна', status: 'offline', avatar: '🎯' },
  { id: 5, name: 'Сергей', status: 'playing', game: 'Stellar Odyssey', avatar: '🚀' }
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || game.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const onlineFriends = friends.filter(f => f.status === 'online' || f.status === 'playing');

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
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Trophy" size={18} className="mr-2" />
                  Достижения
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск игр..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-muted/50"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
              </Button>
              <Avatar className="cursor-pointer border-2 border-primary hover:border-accent transition-colors">
                <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <section className="relative h-[500px] rounded-xl overflow-hidden animate-fade-in group cursor-pointer">
              <img
                src={games[0].image}
                alt="Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-start justify-between">
                  <div className="max-w-2xl">
                    <Badge className="mb-3 bg-secondary text-secondary-foreground">🏆 Топ недели</Badge>
                    <h2 className="text-5xl font-heading font-bold mb-3">{games[0].title}</h2>
                    <p className="text-lg text-muted-foreground mb-4">{games[0].description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">{games[0].rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={20} />
                        <span className="text-lg">{games[0].players} игроков</span>
                      </div>
                      <div className="flex gap-2">
                        {games[0].genre.map((g) => (
                          <Badge key={g} variant="outline">{g}</Badge>
                        ))}
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
                      <Button size="lg" variant="outline" onClick={() => navigate(`/game/${games[0].id}`)}>
                        <Icon name="Info" size={20} className="mr-2" />
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Tabs defaultValue="all" onValueChange={setSelectedGenre}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-heading font-bold">Популярные игры</h3>
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="RPG">RPG</TabsTrigger>
                  <TabsTrigger value="Action">Action</TabsTrigger>
                  <TabsTrigger value="Racing">Racing</TabsTrigger>
                  <TabsTrigger value="Sci-Fi">Sci-Fi</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value={selectedGenre} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredGames.map((game) => (
                    <Card key={game.id} className="overflow-hidden game-card-hover cursor-pointer group" onClick={() => navigate(`/game/${game.id}`)}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <Button className="w-full bg-primary" onClick={(e) => {
                            e.stopPropagation();
                          }}>
                            <Icon name="Play" size={18} className="mr-2" />
                            Играть сейчас
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-heading font-semibold text-lg mb-2">{game.title}</h4>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {game.genre.map((g) => (
                            <Badge key={g} variant="secondary" className="text-xs">
                              {g}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            <span>{game.players}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <section className="mt-8">
              <h3 className="text-2xl font-heading font-bold mb-4">Новые релизы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {games.slice(3, 5).map((game) => (
                  <Card key={game.id} className="overflow-hidden cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/game/${game.id}`)}>
                    <div className="flex">
                      <img src={game.image} alt={game.title} className="w-40 h-32 object-cover" />
                      <CardContent className="p-4 flex-1">
                        <h4 className="font-heading font-semibold mb-2">{game.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                        <div className="flex items-center gap-2">
                          <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{game.rating}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold">Друзья</h3>
                  <Badge variant="outline">{onlineFriends.length} онлайн</Badge>
                </div>
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedFriend(friend);
                        setChatOpen(true);
                      }}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="text-2xl">{friend.avatar}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                            friend.status === 'online'
                              ? 'bg-green-500'
                              : friend.status === 'playing'
                              ? 'bg-primary animate-pulse-glow'
                              : 'bg-muted'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{friend.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {friend.status === 'playing' && friend.game
                            ? `Играет в ${friend.game}`
                            : friend.status === 'online'
                            ? 'В сети'
                            : 'Не в сети'}
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить друга
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold">Активность</h3>
                  <Icon name="Activity" size={18} className="text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Trophy" size={18} className="text-yellow-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Новое достижение!</p>
                      <p className="text-xs text-muted-foreground">Победитель турнира</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Gift" size={18} className="text-secondary mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Бесплатный контент</p>
                      <p className="text-xs text-muted-foreground">3 новых DLC доступны</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Zap" size={18} className="text-accent mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Эксклюзив недели</p>
                      <p className="text-xs text-muted-foreground">Stellar Odyssey + DLC</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {chatOpen && selectedFriend && (
        <div className="fixed bottom-4 right-4 w-80 bg-card border border-border rounded-lg shadow-2xl animate-scale-in z-50">
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-lg">{selectedFriend.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{selectedFriend.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedFriend.status === 'playing' ? 'Играет' : 'В сети'}
                </p>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setChatOpen(false)}>
              <Icon name="X" size={16} />
            </Button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-muted/10">
            <div className="flex flex-col gap-2">
              <div className="bg-primary/20 text-sm p-3 rounded-lg max-w-[80%]">
                Привет! Хочешь сыграть?
              </div>
              <div className="bg-accent/20 text-sm p-3 rounded-lg max-w-[80%] self-end">
                Давай! Запускаю игру
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Сообщение..." className="flex-1" />
              <Button size="icon" className="bg-primary">
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
