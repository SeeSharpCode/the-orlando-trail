import { log, logRed } from '../logs';
import { handleLoseMagic, selectRandomAdults, selectRandomChild, selectRandomMember, updateMembers } from '../party';
import { handleLoseSupplies } from '../supplies';

export const CHANGE_LAND = 'change-land';
export function changeLand(land) {
  return { type: CHANGE_LAND, land };
}

export function handleChangeLand(state, { land }) {
  return {
    ...state,
    land,
    visitedLands: [...state.visitedLands, land.name],
    submittedOptions: [],
    isWalking: true,
  };
}

export const ARRIVE_AT_LAND = 'arrive-at-land';
export function arriveAtLand(land) {
  return { type: ARRIVE_AT_LAND, land };
}

export function handleArriveAtLand(state, action) {
  return { ...state, logs: [...state.logs, log(`Welcome to ${action.land.name}!`)], isWalking: false };
}

export const DOWNPOUR = 'downpour';

export function downpour(party) {
  return { type: DOWNPOUR, members: selectRandomMember(party) };
}

export function handleDownpour(state, { members }) {
  return state.supplies.clothes.quantity > 0
    ? handleLoseSupplies(state, 'clothes', 1, 'Your clothes get soaked in a torrential downpour')
    : handleLoseMagic(state, members, -1, 'Your clothes get soaked in a torrential downpour and you have no extras');
}

export const DROPPED_ICE_CREAM = 'dropped-ice-cream';

export function droppedIceCream(party) {
  return { type: DROPPED_ICE_CREAM, member: selectRandomChild(party) };
}

export function handleDroppedIceCream(state, { member }) {
  const name = state.party[member].name;
  return {
    ...state,
    ...handleLoseMagic(state, [member], 1, `${name} dropped their ice cream`),
  };
}

export const DYSNEYTERRY = 'dysneyterry';

export function dysneyterry(party) {
  const sickMember = party.findIndex(m => m.hasDysneyterry);
  console.log(`sickMember: ${sickMember}`);
  const member = sickMember > -1 ? sickMember : selectRandomMember(party);
  console.log(`member: ${member}`);
  return { type: DYSNEYTERRY, member };
}

export function handleDysneyterry(state, { member }) {
  const { party, logs } = state;
  const affectedMember = party[member];
  if (affectedMember.hasDysneyterry) {
    return {
      ...state,
      ...handleLoseMagic(state, [member], affectedMember.magic, `${affectedMember.name} has fainted of Dysneyterry`),
    };
  } else {
    return {
      ...state,
      party: updateMembers(party, [member], () => ({ hasDysneyterry: true })),
      logs: [...logs, logRed(`${affectedMember.name} has Dysneyterry`)],
    };
  }
}

export const LOST_STROLLER = 'lost-stroller';

export function lostStroller(party) {
  return { type: LOST_STROLLER, members: selectRandomAdults(party, 1, 1) };
}

export function handleLostStroller(state, { members }) {
  return handleLoseMagic(state, members, -1, 'A cast member moved your stoller far away');
}

// const walkingIncidents = [downpour, droppedIceCream, dysneyterry, lostStroller];
const walkingIncidents = [dysneyterry];

export function randomWalkingIncident(party) {
  const incident = walkingIncidents[Math.floor(Math.random() * walkingIncidents.length)];
  return incident(party);
}
