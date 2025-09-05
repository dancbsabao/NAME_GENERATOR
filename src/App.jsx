import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import AdContainer from './components/AdContainer';
import ModeSelector from './components/ModeSelector';
import GenderSelector from './components/GenderSelector';

// Simple Copy and Check icons as SVG components
const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);


// Enhanced Name Generation Algorithm with Mathematical Mode
class NameGenerator {
  constructor() {
    // Phonetic building blocks for natural-sounding names
    this.consonants = {
      start: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W'],
      middle: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w'],
      clusters: ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sl', 'sm', 'sn', 'sp', 'st', 'tr', 'ch', 'sh']
    };
    
    this.vowels = ['a', 'e', 'i', 'o', 'u'];
    this.vowelCombos = ['ai', 'au', 'ea', 'ee', 'ie', 'oa', 'ou', 'ae'];
    
    // Fictional name components for fantasy/sci-fi feel
    this.fictionalPrefixes = ['Ae', 'Al', 'Ar', 'As', 'Cal', 'Dar', 'El', 'Era', 'Gal', 'Ily', 'Kae', 'Lyr', 'Mor', 'Nar', 'Ori', 'Syl', 'Thal', 'Val', 'Xen', 'Zar'];
    this.fictionalSuffixes = ['ael', 'ain', 'aris', 'ath', 'dor', 'eon', 'ian', 'iel', 'ion', 'ith', 'las', 'lyn', 'nys', 'oth', 'rae', 'ren', 'ron', 'thi', 'wyn', 'xis'];
    
    // Baby name components for more traditional feel
    this.babyPrefixes = ['Ad', 'Al', 'An', 'Av', 'Ben', 'Br', 'Ca', 'Da', 'El', 'Em', 'Ev', 'Ga', 'Ha', 'Is', 'Ja', 'Jo', 'Ka', 'La', 'Li', 'Ma', 'Na', 'Ol', 'Sa', 'So'];
    this.babySuffixes = ['an', 'den', 'der', 'el', 'en', 'er', 'eth', 'ia', 'ie', 'la', 'len', 'lie', 'lin', 'lyn', 'na', 'son', 'ton', 'wen', 'y'];
    
    // Gender-specific endings
    this.maleEndings = ['an', 'en', 'er', 'on', 'or', 'son', 'ton'];
    this.femaleEndings = ['a', 'e', 'ia', 'ie', 'la', 'len', 'lyn', 'na'];
    this.unisexEndings = ['y', 'ie', 'lee', 'len', 'son', 'ton'];
    
    // Mathematical mode mappings
    this.mathLetterMap = {
      0: 'a', 1: 'e', 2: 'i', 3: 'o', 4: 'u', 5: 'l', 6: 'n', 7: 'r', 8: 's', 9: 't',
      10: 'b', 11: 'c', 12: 'd', 13: 'f', 14: 'g', 15: 'h', 16: 'j', 17: 'k', 18: 'm', 19: 'p'
    };
  }

  // Generate syllable with proper vowel/consonant patterns
  generateSyllable(isFirst = false, mode = 'fictional') {
    const patterns = mode === 'baby' ? ['CV', 'CVC', 'VCV'] : ['CV', 'CV', 'CVC', 'CVC', 'VC', 'CCV'];
    const pattern = this.randomChoice(patterns);
    let syllable = '';
    
    for (let idx = 0; idx < pattern.length; idx++) {
      const char = pattern[idx];
      if (char === 'C') {
        if (pattern.startsWith('CC') && idx === 0) {
          syllable += this.randomChoice(this.consonants.clusters);
        } else if (isFirst && mode !== 'baby' && Math.random() > 0.6) {
          syllable += this.randomChoice(this.consonants.clusters);
        } else {
          syllable += this.randomChoice(isFirst && idx === 0 ? this.consonants.start : this.consonants.middle);
        }
      } else if (char === 'V') {
        if (mode === 'baby' || Math.random() > 0.7) {
          syllable += this.randomChoice(this.vowelCombos);
        } else {
          syllable += this.randomChoice(this.vowels);
        }
      }
    }
    
    return syllable.toLowerCase();
  }

  // Generate names using syllable construction
  generateSyllableName(gender, mode, length = null) {
    const syllableCount = mode === 'baby' ? this.randomRange(1, 2) : this.randomRange(2, 3);
    let name = '';
    
    for (let i = 0; i < syllableCount; i++) {
      let syl = this.generateSyllable(i === 0, mode);
      const cons = /[bcdfghjklmnpqrstvw]/i;
      if (name && cons.test(name.slice(-1)) && cons.test(syl[0])) {
        syl = this.randomChoice(this.vowels) + syl;
      }
      name += syl;
    }
    
    // Add gender-appropriate ending
    const endings = gender === 'male' ? this.maleEndings :
                   gender === 'female' ? this.femaleEndings : this.unisexEndings;
    
    if (mode === 'baby' || Math.random() > 0.8) {
      name += this.randomChoice(endings);
    }
    
    return this.capitalizeName(name);
  }

  // Generate names using prefix/suffix combinations
  generateCombinationName(mode, gender) {
    const prefixes = mode === 'fictional' ? this.fictionalPrefixes : this.babyPrefixes;
    const suffixes = mode === 'fictional' ? this.fictionalSuffixes : this.babySuffixes;
    
    let name = this.randomChoice(prefixes) + this.randomChoice(suffixes);
    
    // Add gender-appropriate modifications
    if (mode === 'baby' || (gender === 'male' && Math.random() > 0.8)) {
      name += this.randomChoice(this.maleEndings);
    } else if (mode === 'baby' || (gender === 'female' && Math.random() > 0.8)) {
      name += this.randomChoice(this.femaleEndings);
    }
    
    // Ensure at least one vowel in every 3 letters
    if (!/[aeiou].{0,2}[aeiou]/i.test(name)) {
      name = name.slice(0, 2) + this.randomChoice(this.vowels) + name.slice(2);
    }
    
    return this.capitalizeName(name);
  }

  // Generate names using linguistic patterns
  generatePatternName(mode, gender) {
    const patterns = mode === 'fictional' ? 
      ['CVCVC', 'CVCCV', 'CCVCV'] : ['CVCV', 'CVCCV', 'VCV'];
    
    const pattern = this.randomChoice(patterns);
    let name = '';
    
    for (let i = 0; i < pattern.length; i++) {
      const char = pattern[i];
      if (char === 'C') {
        if (i > 0 && pattern[i - 1] === 'C') {
          name += this.randomChoice(this.consonants.clusters)[1];
        } else {
          name += this.randomChoice(i === 0 ? this.consonants.start : this.consonants.middle);
        }
      } else if (char === 'V') {
        if (mode === 'baby' || Math.random() > 0.7) {
          name += this.randomChoice(this.vowelCombos);
        } else {
          name += this.randomChoice(this.vowels);
        }
      }
    }
    
    return this.capitalizeName(name);
  }

  // New mathematical name generation
  generateMathName(gender, isWeird = false) {
    const sequenceLength = this.randomRange(4, 6);
    const sequence = Array.from({length: sequenceLength}, () => this.randomRange(0, 19));
    
    let name = '';
    
    if (isWeird) {
      for (let num of sequence) {
        if (num in this.mathLetterMap) {
          name += this.mathLetterMap[num];
        } else {
          name += this.randomChoice(['x', 'z', 'q']);
        }
      }
      if (Math.random() > 0.7) {
        name += this.randomChoice(['xys', 'zor']);
      }
    } else {
      const syllableCount = this.randomRange(2, 3);
      let seqIndex = 0;
      for (let i = 0; i < syllableCount; i++) {
        let syllable = '';
        const pattern = this.randomChoice(['CVC', 'CV']);
        
        for (let char of pattern) {
          if (seqIndex >= sequence.length) break;
          const num = sequence[seqIndex];
          if (char === 'C') {
            if (num >= 5 && num <= 19) {
              syllable += this.mathLetterMap[num];
            } else {
              syllable += this.randomChoice(this.consonants[i === 0 ? 'start' : 'middle']);
            }
          } else if (char === 'V') {
            if (num >= 0 && num <= 4) {
              syllable += this.mathLetterMap[num];
            } else {
              syllable += this.randomChoice([...this.vowels, ...this.vowelCombos]);
            }
          }
          seqIndex++;
        }
        name += syllable;
      }
      const endings = gender === 'male' ? this.maleEndings :
                     gender === 'female' ? this.femaleEndings : this.unisexEndings;
      if (Math.random() > 0.8) {
        name += this.randomChoice(endings);
      }
    }
    
    name = this.cleanupName(name);
    if (name.length < 3 || name.length > 8 || this.isGibberish(name)) {
      return this.generateMathName(gender, isWeird);
    }
    
    return this.capitalizeName(name);
  }

  // Check for gibberish patterns
  isGibberish(name) {
    // 2+ consecutive consonants unless valid cluster
    if (/[bcdfghjklmnpqrstvw]{2,}/gi.test(name.replace(/(bl|br|cl|cr|dr|fl|fr|gl|gr|pl|pr|sl|sm|sn|sp|st|tr|ch|sh)/gi, ''))) return true;
    // 3+ consecutive vowels
    if (/[aeiou]{3,}/gi.test(name)) return true;
    // Triple repeated letters
    if (/(.)\1\1/gi.test(name)) return true;
    // Specific unpronounceable sequences
    if (/(shg|nujy|gutr|tuij|xua|blz)/gi.test(name)) return true;
    // Simple pronounceability score: count CV alternations
    let score = 0;
    for (let i = 0; i < name.length - 1; i++) {
      if (/[aeiou]/i.test(name[i]) && /[bcdfghjklmnpqrstvw]/i.test(name[i + 1])) score++;
      if (/[bcdfghjklmnpqrstvw]/i.test(name[i]) && /[aeiou]/i.test(name[i + 1])) score++;
    }
    if (score < name.length / 2) return true;
    return false;
  }

  // Main generation method
  generateName(mode, gender, isWeird = false) {
    const methods = mode === 'math' ? 
      [() => this.generateMathName(gender, isWeird)] :
      [
        () => this.generateSyllableName(gender, mode),
        () => this.generateCombinationName(mode, gender),
        () => this.generatePatternName(mode, gender)
      ];
    
    let method;
    if (mode === 'math') {
      method = methods[0];
    } else if (mode === 'fictional') {
      method = this.randomChoice(methods);
    } else {
      method = this.randomChoice([methods[0], methods[1]]); // Exclude pattern for baby
    }
    
    let name = method();
    
    if (name.length < 3 || name.length > 8 || this.isGibberish(name)) {
      return this.generateName(mode, gender, isWeird);
    }
    
    name = this.cleanupName(name);
    
    return name;
  }

  // Helper methods
  randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  cleanupName(name) {
    const problematic = ['xxx', 'qqq', 'zzz', 'bbb', 'ccc', 'ddd', 'fff', 'ggg', 'hhh', 'jjj', 'kkk', 'lll', 'mmm', 'nnn', 'ppp', 'rrr', 'sss', 'ttt', 'vvv', 'www'];
    for (let combo of problematic) {
      name = name.replace(new RegExp(combo, 'gi'), combo.charAt(0));
    }
    
    name = name.replace(/([aeiou]{2,})/gi, (match) => match.substring(0, 2));
    name = name.replace(/([a-z])\1/gi, '$1');
    
    const badPairs = ['xk', 'xq', 'qc', 'qb', 'zx', 'wz', 'kf', 'pv', 'tj', 'shg', 'nuj'];
    for (let pair of badPairs) {
      name = name.replace(new RegExp(pair, 'gi'), pair[0] + this.randomChoice(this.vowels) + pair[1]);
    }
    
    return name;
  }


  // Helper methods
  randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  cleanupName(name) {
    // Remove problematic letter combinations
    const problematic = ['xxx', 'qqq', 'zzz', 'bbb', 'ccc', 'ddd', 'fff', 'ggg', 'hhh', 'jjj', 'kkk', 'lll', 'mmm', 'nnn', 'ppp', 'rrr', 'sss', 'ttt', 'vvv', 'www'];
    for (let combo of problematic) {
      name = name.replace(new RegExp(combo, 'gi'), combo.charAt(0));
    }
    
    // Ensure vowels aren't too clustered
    name = name.replace(/([aeiouy]{3,})/gi, (match) => match.substring(0, 2));
    
    // Remove double letters
    name = name.replace(/([a-z])\1/gi, '$1');
    
    // Fix bad consonant pairs by inserting a vowel
    const badPairs = ['xk', 'xq', 'qc', 'qb', 'zx', 'wz', 'kf', 'pv', 'tj'];
    for (let pair of badPairs) {
      name = name.replace(new RegExp(pair, 'gi'), pair[0] + this.randomChoice(this.vowels) + pair[1]);
    }
    
    return name;
  }
}

// Initialize the name generator
const nameGen = new NameGenerator();

const NameDisplay = ({ name, onGenerate, onCopy, copied }) => (
  <div className="text-center mb-8">
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-12 mb-6 min-h-[200px] flex items-center justify-center relative group">
      <h2 
        className="text-4xl md:text-6xl font-light text-white uppercase tracking-wider text-center cursor-pointer hover:text-blue-400 transition-colors"
        onClick={() => name && onCopy(name)}
        title="Click to copy"
      >
        {name || 'PRESS ENTER TO GENERATE'}
      </h2>
      {name && (
        <button
          onClick={() => onCopy(name)}
          className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all"
          title="Copy name"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      )}
    </div>
    <button
      onClick={onGenerate}
      className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-lg shadow-lg"
    >
      Generate Name
    </button>
    <p className="text-gray-400 text-sm mt-3">Or press Enter • Click name to copy</p>
  </div>
);

export default function App() {
  const [mode, setMode] = useState('fictional');
  const [gender, setGender] = useState('male');
  const [isWeird, setIsWeird] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameHistory, setNameHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const generateName = async () => {
    setIsLoading(true);
    
    // Generate name using selected mode and weirdness
    setTimeout(() => {
      const generatedName = nameGen.generateName(mode, gender, isWeird);
      setCurrentName(generatedName);
      
      // Add to history
      setNameHistory(prev => [generatedName, ...prev.slice(0, 9)]); // Keep last 10
      setIsLoading(false);
    }, 300); // Slightly longer for mystical effect
  };

  const handleCopy = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log(`Copied name: ${name}`);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleHistoryNameClick = (name) => {
    setCurrentName(name);
    handleCopy(name);
  };

  // Handle Enter key for generation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && currentPage === 'home') {
        generateName();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'generator':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Name Generator</h1>
              <p className="text-gray-400 text-lg">Generate unique names for any purpose</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <ModeSelector mode={mode} setMode={setMode} />
              <GenderSelector gender={gender} setGender={setGender} />
              <div className="mb-6">
                <h3 className="text-white text-lg font-medium mb-3 text-center">Style</h3>
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setIsWeird(false)}
                    className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                      !isWeird
                        ? 'bg-white text-black shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">📘</span>
                      <span>Normal</span>
                      <span className="text-xs opacity-70">Structured Names</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsWeird(true)}
                    className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                      isWeird
                        ? 'bg-white text-black shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">🌀</span>
                      <span>Weird</span>
                      <span className="text-xs opacity-70">Experimental Names</span>
                    </div>
                  </button>
                </div>
              </div>
              <NameDisplay 
                name={isLoading ? 'CHANNELING COSMIC ENERGY...' : currentName} 
                onGenerate={generateName}
                onCopy={handleCopy}
                copied={copied}
              />
              
              {nameHistory.length > 0 && (
                <div className="mt-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-white text-lg font-medium mb-4 text-center">Recent Names</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {nameHistory.map((name, index) => (
                      <button
                        key={index}
                        onClick={() => handleHistoryNameClick(name)}
                        className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors text-sm border border-gray-600 hover:border-gray-500"
                        title="Click to select and copy"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">About NameGen</h1>
              <p className="text-gray-400 text-lg">Discover the magic behind our name generation</p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <h2 className="text-white text-2xl mb-4">Our Technology</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Advanced Algorithms</h3>
                    <p className="text-gray-400 text-sm">Linguistic patterns and mathematical sequences create unique names</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Cosmic Generation</h3>
                    <p className="text-gray-400 text-sm">Multiple algorithms combine for unique creative output</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Quality Control</h3>
                    <p className="text-gray-400 text-sm">Automated filtering ensures pronounceable, memorable names</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <h2 className="text-white text-2xl mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Three distinct generation modes</li>
                    <li>✓ Gender-specific customization</li>
                    <li>✓ Normal/Weird style toggle</li>
                    <li>✓ One-click copy functionality</li>
                  </ul>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Keyboard shortcuts (Enter to generate)</li>
                    <li>✓ Mobile-responsive design</li>
                    <li>✓ No registration required</li>
                    <li>✓ Completely free to use</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-400 text-lg">Learn how we protect your data</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <h2 className="text-white text-2xl mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-300 mb-4">
                At NameGen, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
              </p>
              <h3 className="text-white text-lg font-semibold mb-2">Information We Collect</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>We do not collect personal information unless you voluntarily provide it (e.g., through contact forms).</li>
                <li>We may collect non-personal data such as browser type, device information, and usage patterns to improve our services.</li>
                <li>Generated names and user preferences are stored locally on your device and are not transmitted to our servers.</li>
              </ul>
              <h3 className="text-white text-lg font-semibold mb-2">How We Use Your Information</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>To enhance and personalize your experience on our platform.</li>
                <li>To analyze usage trends and improve our services.</li>
                <li>To respond to inquiries or feedback if you contact us.</li>
              </ul>
              <h3 className="text-white text-lg font-semibold mb-2">Data Sharing and Security</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>We do not sell, trade, or share your personal information with third parties, except as required by law.</li>
                <li>We implement industry-standard security measures to protect any data we collect.</li>
                <li>Third-party services (e.g., analytics or advertising) may use cookies or similar technologies, subject to their own privacy policies.</li>
              </ul>
              <h3 className="text-white text-lg font-semibold mb-2">Your Rights</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>You can opt out of analytics tracking via your browser settings.</li>
                <li>Contact us at support@namegen.com to request access to or deletion of any personal data we may hold.</li>
              </ul>
              <p className="text-gray-300">
                Last updated: September 4, 2025. For questions, contact us at support@namegen.com.
              </p>
            </div>
          </div>
        );

      default: // home
        return (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">NAME CHANNELER</h1>
              <p className="text-gray-400 text-lg">Channel the cosmic energies to discover the perfect nomenclature</p>
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <ModeSelector mode={mode} setMode={setMode} />
              <GenderSelector gender={gender} setGender={setGender} />
              <div className="mb-6">
                <h3 className="text-white text-lg font-medium mb-3 text-center">Style</h3>
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setIsWeird(false)}
                    className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                      !isWeird
                        ? 'bg-white text-black shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">📘</span>
                      <span>Normal</span>
                      <span className="text-xs opacity-70">Structured Names</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsWeird(true)}
                    className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                      isWeird
                        ? 'bg-white text-black shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">🌀</span>
                      <span>Weird</span>
                      <span className="text-xs opacity-70">Experimental Names</span>
                    </div>
                  </button>
                </div>
              </div>
              <NameDisplay 
                name={isLoading ? 'CHANNELING COSMIC ENERGY...' : currentName} 
                onGenerate={generateName}
                onCopy={handleCopy}
                copied={copied}
              />
              
              {nameHistory.length > 0 && (
                <div className="mt-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-white text-lg font-medium mb-4 text-center">Recent Mystical Names</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {nameHistory.map((name, index) => (
                      <button
                        key={index}
                        onClick={() => handleHistoryNameClick(name)}
                        className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors text-sm border border-gray-600 hover:border-gray-500"
                        title="Click to select and copy"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center mt-16 text-gray-500 text-sm">
              <p>© 2025 NOT-SO-NORMAL NAME GENERATOR. Channeling cosmic wisdom since the beginning of non-normalcy.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <AdContainer />
      {renderContent()}
    </div>
  );
}