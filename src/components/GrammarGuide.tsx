import React from 'react';
import { BookOpen, Check, X, Info, Lightbulb, Scale } from 'lucide-react';
import auditImg from '../assets/images/audit_ledger_1784660327790.jpg';

export const GrammarGuide: React.FC = () => {
  const partitives = [
    { noun: 'Equipment', partitive: 'A piece of / An item of equipment', example: 'We bought three new items of equipment.' },
    { noun: 'Information', partitive: 'A piece of information', example: 'This is a crucial piece of financial information.' },
    { noun: 'Advice', partitive: 'A piece of advice / A word of advice', example: 'The tax advisor gave us two pieces of advice.' },
    { noun: 'Software', partitive: 'A program of / A suite of / A package of software', example: 'They upgraded to a cloud software package.' },
    { noun: 'Revenue', partitive: 'A stream of / An amount of revenue', example: 'Advertising provides a steady stream of revenue.' },
    { noun: 'Capital', partitive: 'An injection of / An amount of capital', example: 'The company needs an injection of venture capital.' },
    { noun: 'Paper', partitive: 'A sheet of / A ream of paper', example: 'Print the ledger on a sheet of A4 paper.' },
    { noun: 'Credit', partitive: 'A line of credit / A credit entry', example: 'The bank approved a $100,000 line of credit.' },
  ];

  const commonPitfalls = [
    {
      incorrect: 'How much invoices do we need to process today?',
      correct: 'How many invoices do we need to process today?',
      reason: '"Invoice" is countable. Use "many" or "number of".'
    },
    {
      incorrect: 'Our department purchased four new equipments.',
      correct: 'Our department purchased four new pieces of equipment.',
      reason: '"Equipment" is uncountable and never takes an -s ending.'
    },
    {
      incorrect: 'Please send me three informations about the budget audit.',
      correct: 'Please send me three pieces of information about the budget audit.',
      reason: '"Information" is uncountable in English.'
    },
    {
      incorrect: 'We raised a large number of capital from investors.',
      correct: 'We raised a large amount of capital from investors.',
      reason: 'Use "amount of" with uncountable nouns like "capital".'
    },
    {
      incorrect: 'He offered many valuable advices regarding tax filing.',
      correct: 'He offered much valuable advice / pieces of advice regarding tax filing.',
      reason: '"Advice" is uncountable.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      {/* Overview Banner */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/5 text-emerald-400 rounded-sm border border-white/10">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif-italic text-white">Accounting English Nouns Handbook</h2>
                <p className="text-xs font-mono-code text-slate-400 mt-1 uppercase tracking-wider">
                  A reference guide for accountants, auditors, and financial managers
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-white/10 font-light">
              In professional financial communication, precision matters. Confusing countable and uncountable nouns in financial reports or client emails can reduce clarity and sound ungrammatical. Use this reference guide to master quantifiers and partitive phrases.
            </p>
          </div>

          <div className="w-full md:w-48 h-32 rounded-sm overflow-hidden border border-white/10 shrink-0 relative bg-white/5 shadow-md">
            <img
              src={auditImg}
              alt="Accounting handbook audit ledger"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Countable Card */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif-italic text-sky-300">Countable Nouns</h3>
            <span className="text-[10px] font-mono-code bg-sky-500/10 text-sky-300 px-2.5 py-1 rounded-sm uppercase tracking-wider border border-sky-500/30">
              Can be counted
            </span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside font-light">
            <li>Have singular and plural forms (e.g., <em>one invoice, two invoices</em>).</li>
            <li>Take singular or plural verbs (e.g., <em>The receipt is... / Receipts are...</em>).</li>
            <li>Can use indefinite articles <strong>a / an</strong> (e.g., <em>an audit, a document</em>).</li>
          </ul>
          <div className="bg-white/5 p-3 rounded-sm text-xs space-y-1 font-mono-code text-sky-200 border border-white/10">
            <div className="font-semibold text-slate-400 mb-1 uppercase text-[10px] tracking-wider">Approved Quantifiers:</div>
            <div>• a / an / one / two</div>
            <div>• many / several / a few</div>
            <div>• a number of</div>
          </div>
        </div>

        {/* Uncountable Card */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif-italic text-emerald-400">Uncountable Nouns</h3>
            <span className="text-[10px] font-mono-code bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-sm uppercase tracking-wider border border-emerald-500/30">
              Mass / Concepts
            </span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside font-light">
            <li>Cannot be pluralized with -s (never say <em>equipments</em> or <em>informations</em>).</li>
            <li>Always take singular verbs (e.g., <em>Revenue has increased...</em>).</li>
            <li>Require <strong>partitives</strong> to count individual units (e.g., <em>a piece of equipment</em>).</li>
          </ul>
          <div className="bg-white/5 p-3 rounded-sm text-xs space-y-1 font-mono-code text-emerald-300 border border-white/10">
            <div className="font-semibold text-slate-400 mb-1 uppercase text-[10px] tracking-wider">Approved Quantifiers:</div>
            <div>• some / much</div>
            <div>• a little / a great deal of</div>
            <div>• an amount of</div>
          </div>
        </div>
      </div>

      {/* Partitives Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-serif-italic text-white flex items-center gap-2">
          <Lightbulb className="text-emerald-400" size={18} />
          Essential Accounting Partitive Phrases
        </h3>
        <p className="text-xs text-slate-400 font-light">
          Use these partitive expressions when you need to specify individual quantities for uncountable financial terms:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono-code uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Uncountable Noun</th>
                <th className="py-2.5 px-3">Standard Partitive Phrase</th>
                <th className="py-2.5 px-3">Professional Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-300">
              {partitives.map((p, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 font-serif-italic text-base text-sky-300">{p.noun}</td>
                  <td className="py-2.5 px-3 font-mono-code text-emerald-300">{p.partitive}</td>
                  <td className="py-2.5 px-3 italic font-serif-italic">{p.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Pitfalls Box */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-serif-italic text-rose-300 flex items-center gap-2">
          <Scale size={18} />
          Top 5 Accounting Grammar Mistakes to Avoid
        </h3>

        <div className="space-y-3">
          {commonPitfalls.map((pitfall, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-sm border border-white/10 text-xs space-y-1.5 font-mono-code">
              <div className="flex items-center gap-2 text-rose-400">
                <X size={14} className="shrink-0" />
                <span className="line-through">{pitfall.incorrect}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Check size={14} className="shrink-0" />
                <span>{pitfall.correct}</span>
              </div>
              <p className="text-slate-400 text-[11px] pt-1.5 border-t border-white/10 font-sans italic">
                💡 <em>{pitfall.reason}</em>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
