import React, { useState, useMemo } from 'react';
import { NounItem } from '../types';
import { NounCard } from './NounCard';
import { Search, Filter, Bookmark, Sparkles } from 'lucide-react';

interface VocabularyExplorerProps {
  nouns: NounItem[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const VocabularyExplorer: React.FC<VocabularyExplorerProps> = ({
  nouns,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'countable' | 'uncountable' | 'dual' | 'bookmarked'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'financial_docs', label: 'Financial Documents' },
    { id: 'assets_capital', label: 'Assets & Capital' },
    { id: 'metrics_data', label: 'Metrics & Data' },
    { id: 'tools_systems', label: 'Tools & Systems' },
    { id: 'people_entities', label: 'People & Entities' },
  ];

  const filteredNouns = useMemo(() => {
    return nouns.filter((noun) => {
      // Type match
      if (selectedType === 'countable' && noun.type !== 'countable') return false;
      if (selectedType === 'uncountable' && noun.type !== 'uncountable') return false;
      if (selectedType === 'dual' && noun.type !== 'dual') return false;
      if (selectedType === 'bookmarked' && !bookmarkedIds.includes(noun.id)) return false;

      // Category match
      if (selectedCategory !== 'all' && noun.category !== selectedCategory) return false;

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          noun.word.toLowerCase().includes(q) ||
          noun.definition.toLowerCase().includes(q) ||
          noun.example.toLowerCase().includes(q) ||
          (noun.pluralForm && noun.pluralForm.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [nouns, selectedType, selectedCategory, searchQuery, bookmarkedIds]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="bg-[#0a0a0a] p-5 rounded-sm border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search accounting terms (e.g. invoice, equipment)..."
              className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-xs font-mono-code text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono-code text-slate-400 hover:text-white uppercase"
              >
                Clear
              </button>
            )}
          </div>

          {/* Main Type Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all border ${
                selectedType === 'all'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              All ({nouns.length})
            </button>

            <button
              onClick={() => setSelectedType('countable')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all border ${
                selectedType === 'countable'
                  ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              Countable
            </button>

            <button
              onClick={() => setSelectedType('uncountable')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all border ${
                selectedType === 'uncountable'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              Uncountable
            </button>

            <button
              onClick={() => setSelectedType('dual')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all border ${
                selectedType === 'dual'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              Dual
            </button>

            <button
              onClick={() => setSelectedType('bookmarked')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono-code uppercase tracking-wider flex items-center gap-1.5 transition-all border ${
                selectedType === 'bookmarked'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              <Bookmark size={13} className={selectedType === 'bookmarked' ? 'fill-amber-300' : ''} />
              Saved ({bookmarkedIds.length})
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-white/10 no-scrollbar">
          <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter size={12} /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-sm text-xs font-mono-code whitespace-nowrap transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-950 border-white font-semibold'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Vocabulary Cards */}
      {filteredNouns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNouns.map((noun) => (
            <NounCard
              key={noun.id}
              noun={noun}
              isBookmarked={bookmarkedIds.includes(noun.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mx-auto">
            <Sparkles size={24} />
          </div>
          <h3 className="text-lg font-serif-italic text-white">No vocabulary found</h3>
          <p className="text-xs text-slate-400 font-light">
            {selectedType === 'bookmarked'
              ? "You haven't bookmarked any nouns yet. Click the bookmark icon on any card to save it here!"
              : 'Try clearing your search or choosing a different filter category.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-sm text-xs font-mono-code uppercase tracking-wider font-semibold transition-colors mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
