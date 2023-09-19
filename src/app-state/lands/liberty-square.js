import { attractionTypes } from './attraction-types';
import { log } from '../logs';
import { selectRandomMembers } from '../party';
import { deductCash } from '../supplies';

export const SHOP_CHRISTMAS = 'shop-christmas';
function shopChristmas() {
  return { type: SHOP_CHRISTMAS };
}

const christmasShopCost = 20;

export function handleShopChristmas(state) {
  return {
    ...state,
    occupation: deductCash(state.occupation, christmasShopCost),
    submittedOptions: [...state.submittedOptions, SHOP_CHRISTMAS],
    logs: [...state.logs, log(`You spend ${christmasShopCost} on ornaments at Ye Olde Christmas Shoppe`)],
  };
}

export const libertySquare = {
  name: 'Liberty Square',
  video: 'frontierland.mp4',
  attractions: [
    {
      name: 'The Hall of Presidents',
      type: { ...attractionTypes.stageShow, magic: -1 },
      logMessage: 'Your kids get restless and loud during The Hall of Presidents',
    },
    {
      name: 'The Haunted Mansion',
      type: {
        ...attractionTypes.slow,
        magic: 2,
        memberSelector: party => selectRandomMembers(party, party.length, party.length),
      },
      logMessage: 'Haunted Mansion is frickin amazing, everyone have some magic!',
    },
  ],
  options: () => [
    {
      id: SHOP_CHRISTMAS,
      label: 'Shop Ye Ole Christmas Shoppe',
      action: () => shopChristmas(),
    },
  ],
};
