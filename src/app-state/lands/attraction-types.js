import {
  argument,
  breakdown,
  caughtStuffingShoes,
  characterBreak,
  hurtBack,
  lameJoke,
  lostPhone,
  tallPerson,
} from '../attractions';
import { selectRandomChildren, selectRandomMembers } from '../party';

export const attractionTypes = {
  bad: {
    wait: 5,
    magic: -1,
    incidents: [],
    memberSelector: party => selectRandomMembers(party, party.length, party.length),
  },
  slow: {
    wait: 10,
    magic: 1,
    incidents: [breakdown, argument],
    memberSelector: party => selectRandomChildren(party, 1, 2),
  },
  thrillCoaster: {
    wait: 20,
    magic: 2,
    incidents: [breakdown, lostPhone, hurtBack, argument, caughtStuffingShoes],
    memberSelector: party => selectRandomMembers(party, 1, 3),
  },
  stageShow: {
    wait: 5,
    magic: 1,
    incidents: [argument, tallPerson],
    memberSelector: party => selectRandomMembers(party, 1, 2),
  },
  characterMeet: {
    wait: 15,
    magic: 2,
    incidents: [argument, lameJoke, characterBreak],
    memberSelector: party => selectRandomChildren(party, 1, 2),
  },
};
