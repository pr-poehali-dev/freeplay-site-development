import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface StoreGame {
  id: number;
  title: string;
  image: string;
  genre: string[];
  rating: number;
  players: string;
  description: string;
  discount?: number;
  featured?: boolean;
}

const storeGames: StoreGame[] = [
  {
    id: 7,
    title: 'Cyber Legends',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/a31a91f0-a46a-4860-8a22-dd51599bd498.jpg',
    genre: ['RPG', 'Cyberpunk', 'Action'],
    rating: 4.9,
    players: '1.2M',
    description: 'Новейшая киберпанк RPG с открытым миром',
    featured: true,
    discount: 30
  },
  {
    id: 8,
    title: 'Space Warriors',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/2d727aff-6c61-4c66-9f3f-42c6b419e7bc.jpg',
    genre: ['Sci-Fi', 'Strategy', 'Multiplayer'],
    rating: 4.7,
    players: '890K',
    description: 'Космическая стратегия с PvP-режимом',
    discount: 50
  },
  {
    id: 9,
    title: 'Fantasy Kingdoms',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/16cc42a4-51c3-4f82-a1b4-3db2b514705b.jpg',
    genre: ['Strategy', 'Fantasy', 'Building'],
    rating: 4.6,
    players: '2.1M',
    description: 'Постройте свое королевство с нуля',
    featured: true
  },
  {
    id: 10,
    title: 'Horror Mansion',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/c3575195-1ee8-4ac7-abd5-a1393aa7c87b.jpg',
    genre: ['Horror', 'Survival', 'Adventure'],
    rating: 4.8,
    players: '650K',
    description: 'Выживите в проклятом особняке',
    discount: 20
  },
  {
    id: 11,
    title: 'Racing Fury',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/1684be4f-57a1-4e3f-b2fc-10a6415ac633.jpg',
    genre: ['Racing', 'Action', 'Arcade'],
    rating: 4.5,
    players: '3.4M',
    description: 'Экстремальные уличные гонки'
  },
  {
    id: 12,
    title: 'Puzzle Quest',
    image: 'https://cdn.poehali.dev/projects/f2c5e1ff-8811-4af2-920c-a405ea2be983/files/c3575195-1ee8-4ac7-abd5-a1393aa7c87b.jpg',
    genre: ['Puzzle', 'Casual', 'Adventure'],
    rating: 4.4,
    players: '5.2M',
    description: 'Головоломки с увлекательным сюжетом',
    featured: true
  }
];

export default function Store() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const featuredGames = storeGames.filter(g => g.featured);
  const discountGames = storeGames.filter(g => g.discount);
  
  const filteredGames = selectedCategory === 'all' 
    ? storeGames 
    : storeGames.filter(g => g.genre.includes(selectedCategory));

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
                  <Button variant="ghost" className="text-primary">
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
        <section className="relative h-[450px] rounded-xl overflow-hidden mb-8 group cursor-pointer">
          <img
            src={featuredGames[0]?.image}
            alt="Featured"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <Badge className="mb-3 bg-accent text-accent-foreground">🔥 Новинка</Badge>
            <h2 className="text-5xl font-heading font-bold mb-3">{featuredGames[0]?.title}</h2>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
              {featuredGames[0]?.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{featuredGames[0]?.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Users" size={20} />
                <span>{featuredGames[0]?.players} игроков</span>
              </div>
              {featuredGames[0]?.discount && (
                <Badge className="bg-secondary text-secondary-foreground">
                  -{featuredGames[0].discount}%
                </Badge>
              )}
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Icon name="Download" size={20} className="mr-2" />
                Скачать бесплатно
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Info" size={20} className="mr-2" />
                Подробнее
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-heading font-bold mb-4">⚡ Специальные предложения</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {discountGames.map((game) => (
              <Card key={game.id} className="overflow-hidden cursor-pointer hover:border-primary transition-colors group" onClick={() => navigate(`/game/${game.id}`)}>
                <div className="relative">
                  <img src={game.image} alt={game.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" />
                  {game.discount && (
                    <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
                      -{game.discount}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-heading font-semibold mb-2">{game.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{game.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-heading font-bold">Все игры магазина</h3>
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="Action">Action</TabsTrigger>
              <TabsTrigger value="RPG">RPG</TabsTrigger>
              <TabsTrigger value="Strategy">Strategy</TabsTrigger>
              <TabsTrigger value="Racing">Racing</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={selectedCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <Card key={game.id} className="overflow-hidden cursor-pointer hover:border-primary transition-colors group" onClick={() => navigate(`/game/${game.id}`)}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {game.discount && (
                      <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
                        -{game.discount}%
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button className="w-full bg-primary" onClick={(e) => e.stopPropagation()}>
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать бесплатно
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold text-lg mb-2">{game.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{game.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {game.genre.slice(0, 2).map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span>{game.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
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
      </div>
    </div>
  );
}
