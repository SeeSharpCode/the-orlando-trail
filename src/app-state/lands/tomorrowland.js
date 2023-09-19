import { attractionTypes } from './attraction-types';
import { selectRandomChildren, selectRandomMembers } from '../party';

export const tomorrowland = {
  name: 'Tomorrowland',
  video: 'tomorrowland.mp4',
  attractions: [
    {
      name: 'Space Mountain',
      type: attractionTypes.thrillCoaster,
      logMessage: 'Space Mountain is freaking awesome!',
    },
    {
      name: "Buzz Lightyear's Spin",
      type: attractionTypes.slow,
      logMessage: "The kids can't read big numbers and think they got a high score on Buzz Lightyear!",
    },
    {
      name: "Monster's, Inc Laugh Floor",
      type: attractionTypes.stageShow,
      logMessage: 'Your joke was used in the show!',
    },
    {
      name: 'TTA PeopleMover',
      type: {
        ...attractionTypes.slow,
        magic: 2,
        memberSelector: party => selectRandomMembers(party, party.length, party.length),
      },
      logMessage: 'OMG I freaking love PeopleMover, everyone have some magic!',
    },
    {
      name: 'Carousel of Progress',
      type: { ...attractionTypes.stageShow, magic: -1 },
      logMessage: "Uncle Orville's jokes fly right over the kids' heads",
    },
    {
      name: 'Astro Orbiter',
      type: { ...attractionTypes.thrillCoaster, magic: -1, memberSelector: party => selectRandomChildren(party, 1, 2) },
      logMessage: "The kids weren't ready for this one yet!",
    },
    {
      name: "Stitch's Great Escape",
      type: attractionTypes.bad,
      logMessage: 'Nice try. This was closed years ago, dummy!',
    },
    {
      name: 'Tomorrowland Speedway',
      type: attractionTypes.bad,
      logMessage: 'No one likes Tomorrowland Speedway',
    },
  ],
};
