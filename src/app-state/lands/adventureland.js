import { attractionTypes } from './attraction-types';
import { deductCash } from '../supplies';
import { selectRandomMembers, handleGainMagic } from '../party';

export const BUY_DOLE_WHIP = 'buy-dole-whip';
function buyDoleWhip() {
  return { type: BUY_DOLE_WHIP };
}

export function handleBuyDoleWhip(state) {
  const { party } = state;
  const cost = party.length * 7;
  return {
    ...state,
    ...handleGainMagic(
      state,
      selectRandomMembers(party, party.length, party.length),
      2,
      `You spend $${cost} on a round of delicious dole whips!`
    ),
    occupation: deductCash(state.occupation, cost),
    submittedOptions: [...state.submittedOptions, BUY_DOLE_WHIP],
  };
}

export const adventureland = {
  name: 'Adventureland',
  video: 'adventureland.mp4',
  options: () => [
    {
      label: 'Buy Dole Whips',
      action: () => buyDoleWhip(),
      condition: ({ occupation, party }) => occupation.cash > party.length * 7,
    },
  ],
  attractions: [
    {
      name: 'Jungle Cruise',
      type: { ...attractionTypes.slow, wait: 20 },
      logMessage: "The skipper's hilarious puns lift everyone's spirits!",
    },
    {
      name: 'Pirates of the Caribbean',
      type: attractionTypes.slow,
      logMessage: 'Dead men tell no tales!',
    },
    {
      name: 'Magic Carpets',
      type: { ...attractionTypes.slow, wait: 5 },
      logMessage: 'The kids enjoy the Magic Carpets!',
    },
    {
      name: 'Enchanted Tiki Room',
      type: { ...attractionTypes.stageShow, magic: -1 },
      logMessage: "Tiki Tiki Tiki room is now stuck in the group's head",
    },
    {
      name: 'Meet Aladdin',
      type: attractionTypes.characterMeet,
      characterName: 'Aladdin',
      logMessage: 'The kids have a magical moment with Aladdin!',
    },
    {
      name: 'Meet Jasmine',
      type: attractionTypes.characterMeet,
      characterName: 'Jasmine',
      logMessage: 'The kids have a magical moment with Jasmine!',
    },
    {
      name: 'Meet Jack Sparrow',
      type: attractionTypes.characterMeet,
      characterName: 'Jack Sparrow',
      logMessage: 'The kids have a magical moment with Jack Sparrow!',
    },
  ],
};
