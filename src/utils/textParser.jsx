import React from 'react';
import MarvelIcon from '../components/MarvelIcon';
import TraitTag from '../components/TraitTag';

const SHORTCODE_MAP = {
    'acceleration': 'a',
    'boost': 'b',
    'crisis': 'c',
    'damage': 'd',
    'energy': 'e',
    'amplify': 'f',
    'perplayer': 'g',
    'hazard': 'h',
    'ink': 'i',
    'mental': 'm',
    'infinity': 'n',
    'physical': 'p',
    'star': 's',
    'unique': 'u',
    'wild': 'w'
};

export const parseText = (text) => {
    const parts = text.split(/(\[\[[^\]]+\]\]|\[[^\]]+\])/g);
    
    return parts.map((part, index) => {
        const traitMatch = part.match(/^\[\[([^\]]+)\]\]$/);
        if (traitMatch) {
            return <TraitTag key={index} traits={traitMatch[1]} />;
        }
        
        const shortcodeMatch = part.match(/^\[([^\]]+)\]$/);
        if (shortcodeMatch) {
            const shortcode = shortcodeMatch[1].toLowerCase();
            const iconType = SHORTCODE_MAP[shortcode];
            
            if (iconType) {
                return <MarvelIcon key={index} iconType={iconType} />;
            } else {
                return <span key={index}>{part}</span>;
            }
        }
        
        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
}; 