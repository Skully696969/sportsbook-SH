import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Wallet, ChevronDown, Clock, Star, Tv, Football, Baseball, Basketball, Goal, Golf, Gauge, Sword, Car, Cricket, Bug, Trophy, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * DEMO ONLY — NON-WAGERING
 * Safe for fantasy/affiliate/analytics frontends.
 */

const sports = [
  { icon: <Clock className="w-4 h-4" />, label: "Up Next" },
  { icon: <Star className="w-4 h-4" />, label: "Featured" },
  { icon: <Tv className="w-4 h-4" />, label: "Live" },
  { icon: <Football className="w-4 h-4" />, label: "Football" },
  { icon: <Baseball className="w-4 h-4" />, label: "Baseball" },
  { icon: <Basketball className="w-4 h-4" />, label: "Basketball" },
  { icon: <Goal className="w-4 h-4" />, label: "Soccer" },
  { icon: <Golf className="w-4 h-4" />, label: "Golf" },
  { icon: <Gauge className="w-4 h-4" />, label: "Tennis" },
  { icon: <Sword className="w-4 h-4" />, label: "MMA" },
  { icon: <Car className="w-4 h-4" />, label: "Auto Racing" },
  { icon: <Cricket className="w-4 h-4" />, label: "Cricket" },
  { icon: <Bug className="w-4 h-4" />, label: "Rugby" },
  { icon: <Trophy className="w-4 h-4" />, label: "Other" },
];

const mockEvents = [
  {
    id: 'evt-1',
    league: 'NCAAF',
    when: 'Sat 7:30 PM ET',
    teams: ['Georgia', 'Clemson'],
    moneyline: [-185, +155],
    spread: ['-3.5', '+3.5'],
    total: ['O 48.5', 'U 48.5'],
  },
  {
    id: 'evt-2',
    league: 'NFL',
    when: 'Sun 4:25 PM ET',
    teams: ['49ers', 'Cowboys'],
    moneyline: [-120, +100],
    spread: ['-1.5', '+1.5'],
    total: ['O 46.0', 'U 46.0'],
  },
  {
    id: 'evt-3',
    league: 'UFC',
    when: 'Sat 10:00 PM ET',
    teams: ['Fighter A', 'Fighter B'],
    moneyline: [-220, +180],
    spread: ['KO/TKO', 'Decision'],
    total: ['O 2.5r', 'U 2.5r'],
  },
];

function formatCurrency(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function App() {
  const [query, setQuery] = useState('');
  const [bets, setBets] = useState<{ id: string; label: string; price: number }[]>([]);

  const filteredEvents = useMemo(() => {
    if (!query) return mockEvents;
    return mockEvents.filter((e) =>
      e.teams.join(' ').toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const balance = 50;
  const pending = 0;
  const available = 300;

  function addBet(eId: string, label: string, price: number) {
    setBets((b) => {
      if (b.find((x) => x.id === `${eId}-${label}`)) return b;
      return [...b, { id: `${eId}-${label}`, label, price }];
    });
  }

  function removeBet(id: string) {
    setBets((b) => b.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 font-bold text-neutral-900">SB</div>
            <div className="text-lg font-semibold tracking-wide">Sunline Demo</div>
          </div>
          <div className="hidden flex-1 items-center gap-2 md:flex">
            <div className="relative w-full max-w-xl">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events…"
                className="pl-9 bg-neutral-900 border-neutral-700 focus-visible:ring-emerald-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-6 text-sm">
            <div className="hidden items-center gap-2 md:flex">
              <Wallet className="h-4 w-4" />
              <div className="flex items-center gap-4">
                <div>Balance <span className="text-emerald-400 font-semibold">{formatCurrency(balance)}</span></div>
                <div>Pending <span className="font-semibold">{formatCurrency(pending)}</span></div>
                <div>Available <span className="font-semibold">{formatCurrency(available)}</span></div>
              </div>
            </div>
            <Button variant="outline" className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
              <User className="mr-2 h-4 w-4" /> UGA161 <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border-b border-amber-500/30">
        <div className="mx-auto max-w-7xl px-4 py-2 text-sm text-amber-200">
          <strong>Demo Mode:</strong> Non-wagering interface for fantasy/analytics/affiliate use.
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[260px_minmax(0,1fr)_340px]">
        <aside className="hidden rounded-2xl border border-neutral-800 bg-neutral-950 md:block">
          <div className="border-b border-neutral-800 p-3 text-sm font-semibold">Sports Schedule</div>
          <nav className="max-h-[70vh] overflow-auto px-2 py-2">
            {sports.map((s, i) => (
              <button
                key={i}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-neutral-300 hover:bg-neutral-800/60"
              >
                {s.icon}
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-h-[70vh] rounded-2xl border border-neutral-800 bg-neutral-950 p-3 md:p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Featured</h2>
            <div className="md:hidden w-full max-w-xs">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events…"
                className="pl-9 bg-neutral-900 border-neutral-700 focus-visible:ring-emerald-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filteredEvents.map((evt) => (
              <Card key={evt.id} className="border-neutral-800 bg-neutral-900/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-neutral-300">
                    <span className="mr-2 rounded bg-neutral-800 px-2 py-0.5 text-xs">{evt.league}</span>
                    <span className="text-neutral-400">{evt.when}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                    <div className="flex items-center justify-between gap-3 md:justify-start">
                      <div className="text-base font-medium">{evt.teams[0]}</div>
                      <div className="text-neutral-500">vs</div>
                      <div className="text-base font-medium">{evt.teams[1]}</div>
                    </div>
                    <OddsGroup label="Moneyline">
                      <OddsButton onClick={() => addBet(evt.id, `${evt.teams[0]} ML ${evt.moneyline[0]}`, evt.moneyline[0])}>
                        {evt.teams[0]} {evt.moneyline[0] > 0 ? `+${evt.moneyline[0]}` : evt.moneyline[0]}
                      </OddsButton>
                      <OddsButton onClick={() => addBet(evt.id, `${evt.teams[1]} ML ${evt.moneyline[1]}`, evt.moneyline[1])}>
                        {evt.teams[1]} {evt.moneyline[1] > 0 ? `+${evt.moneyline[1]}` : evt.moneyline[1]}
                      </OddsButton>
                    </OddsGroup>
                    <OddsGroup label="Spread">
                      <OddsButton onClick={() => addBet(evt.id, `${evt.teams[0]} ${evt.spread[0]}`, -110)}>
                        {evt.teams[0]} {evt.spread[0]}
                      </OddsButton>
                      <OddsButton onClick={() => addBet(evt.id, `${evt.teams[1]} ${evt.spread[1]}`, -110)}>
                        {evt.teams[1]} {evt.spread[1]}
                      </OddsButton>
                    </OddsGroup>
                    <OddsGroup label="Total">
                      <OddsButton onClick={() => addBet(evt.id, `${evt.total[0]}`, -110)}>
                        {evt.total[0]}
                      </OddsButton>
                      <OddsButton onClick={() => addBet(evt.id, `${evt.total[1]}`, -110)}>
                        {evt.total[1]}
                      </OddsButton>
                    </OddsGroup>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <aside className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Bet Slip</h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-neutral-400 hover:text-neutral-100"
              onClick={() => setBets([])}
            >
              Clear
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {bets.length === 0 && (
              <div className="rounded-xl border border-neutral-800 p-4 text-sm text-neutral-400">
                Select lines to add them here. In a real product, this is where you’d collect entries for a fantasy contest or track picks.
              </div>
            )}
            {bets.map((b) => (
              <div key={b.id} className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium">{b.label}</div>
                    <div className="text-xs text-neutral-400">Price: {b.price > 0 ? `+${b.price}` : b.price}</div>
                  </div>
                  <button onClick={() => removeBet(b.id)} className="text-neutral-400 hover:text-neutral-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-2 text-sm">
                  <Input placeholder="Stake (demo)" className="h-9 bg-neutral-900 border-neutral-700" />
                  <Button className="h-9">Track</Button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-2 text-xs text-neutral-500">
        © {new Date().getFullYear()} Sunline Demo • Educational & compliant use (fantasy/analytics/affiliate).
      </footer>
    </div>
  );
}

function OddsGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-800 p-2">
      <div className="mb-2 text-xs uppercase tracking-wide text-neutral-400">{label}</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-2">{children}</div>
    </div>
  );
}

function OddsButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-left text-sm hover:border-emerald-600 hover:bg-neutral-800"
    >
      {children}
    </motion.button>
  );
}
