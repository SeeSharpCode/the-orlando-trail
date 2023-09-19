import { attractionTypes } from './attraction-types';

export const frontierland = {
  name: 'Frontierland',
  video: 'frontierland.mp4',
  attractions: [
    {
      name: 'Country Bear Jamboree',
      type: attractionTypes.stageShow,
      logMessage: 'The group sings along merrily to the Country Bear Jamboree!',
    },
    {
      name: 'Splash Mountain',
      type: attractionTypes.thrillCoaster,
      logMessage: 'The group enjoys Splash Mountain!',
    },
    {
      name: 'Big Thunder Mountain',
      type: attractionTypes.thrillCoaster,
      logMessage: 'The group enjoys Big Thunder Mountain!',
    },
    {
      name: 'Tom Sawyer Island',
      type: attractionTypes.slow,
      logMessage: 'The kids love exploring Tom Sawyer Island!',
    },
    {
      name: "Shootin' Arcade",
      type: { ...attractionTypes.stageShow, magic: -2 },
      logMessage: "You didn't know you had to pay for the Shootin' Arcade.",
    },
  ],
};
