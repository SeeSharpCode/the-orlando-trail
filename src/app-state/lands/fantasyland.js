import { attractionTypes } from './attraction-types';
import { argument, breakdown, experienceAttraction } from '../attractions';

export const fantasyland = {
  name: 'Fantasyland',
  video: 'fantasyland.mp4',
  attractions: [
    {
      name: 'Seven Dwarves Mine Train',
      type: attractionTypes.thrillCoaster,
      logMessage: 'Seven Dwarves is a great ride for all ages!',
    },
    {
      name: 'Under the Sea',
      type: attractionTypes.slow,
      logMessage: 'The group loves the music and ambience of Under the Sea!',
    },
    {
      name: 'Enchanted Tales with Belle',
      type: attractionTypes.characterMeet,
      characterName: 'Belle',
      logMessage: 'The kids get to participate in Enchanted Tales with Belle!',
    },
    {
      name: "It's A Small World",
      type: { ...attractionTypes.slow, magic: -1 },
      incidents: [breakdown, argument],
      logMessage: 'Good luck getting "It\'s a Small World" out of your head!',
    },
    {
      name: "Peter Pan's Flight",
      type: { ...attractionTypes.slow, wait: 20, magic: 3 },
      logMessage: 'The group enjoys the classic Peter Pan ride!',
    },
    {
      name: 'Winnie the Pooh',
      type: attractionTypes.slow,
      logMessage: 'I mean, Winnie the Pooh is an okay ride',
    },
    {
      name: 'The Mad Tea Party',
      type: { ...attractionTypes.slow, magic: -2 },
      logMessage: 'Riding The Mad Tea Party after lunch was a bad idea...',
    },
    {
      name: 'Regal Carrousel',
      type: attractionTypes.slow,
      logMessage: 'The kids enjoy the Carrousel! (FYI, Carrousel is hard to spell)',
    },
    {
      name: 'PhilharMagic',
      type: attractionTypes.stageShow,
      logMessage: 'The PhilharMagic theater is a nice spot to rest and cool down',
    },
    {
      name: 'The Barnstormer',
      type: attractionTypes.slow,
      logMessage: 'The kids feel brave and strong after riding Barnstormer!',
    },
    {
      name: 'Dumbo',
      type: attractionTypes.slow,
      logMessage: 'The kids love pushing the buttons on Dumbo!',
    },
  ],
};
