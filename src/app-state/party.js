import { log, logGreen, logRed } from './logs';

export function selectRandomMembers(party, min, max) {
  return getRandomElements(
    party.map((_, i) => i),
    min,
    max
  );
}

export function selectRandomChildren(party, min, max) {
  return getRandomElements(selectChildren(party), min, max);
}

export function selectRandomAdults(party, min, max) {
  return getRandomElements(selectAdults(party), min, max);
}

export function selectRandomMember(party) {
  return Math.floor(Math.random() * party.length);
}

export function selectRandomChild(party) {
  return Math.floor(Math.random() * selectChildren(party).length);
}

function selectChildren(party) {
  return party.map((m, i) => (m.age === 'Child' ? i : undefined)).filter(i => i !== undefined);
}

export function selectRandomAdult(party) {
  return Math.floor(Math.random() * selectAdults(party).length);
}

function selectAdults(party) {
  return party.map((m, i) => (m.age === 'Adult' ? i : undefined)).filter(i => i !== undefined);
}

export const LOSE_PARTY_MEMBER = 'lose-party-member';
export function losePartyMember(member) {
  return { type: LOSE_PARTY_MEMBER, member };
}

export function handleChangeMagicAll(state, amount, actionLogMessage) {
  const { party, logs } = state;
  return {
    ...state,
    party: updateMembers(
      party,
      party.map((_, i) => i),
      m => ({ magic: m.magic + amount })
    ),
    logs: [...logs, amount > 0 ? logGreen(actionLogMessage) : logRed(actionLogMessage)],
  };
}

// TODO consolidate with handleGainMagic
export function handleLoseMagic(state, members, amount, logMessage) {
  const { party, logs } = state;
  const names = members.map(i => party[i].name);
  const nextLogs = [...logs, log(logMessage)];
  if (names.length > 0) {
    nextLogs.push(logRed(`${names.join(', ')} lost ${amount} magic`));
  }
  return {
    ...state,
    party: updateMembers(party, members, m => ({
      magic: Math.max(0, m.magic - amount),
    })),
    logs: nextLogs,
  };
}

export function handleGainMagic(state, members, amount, logMessage) {
  const { party, logs } = state;
  const names = members.map(i => party[i].name);
  const nextLogs = [...logs, log(logMessage)];
  if (names.length > 0) {
    nextLogs.push(logGreen(`${names.join(', ')} gained ${amount} magic`));
  }
  return {
    ...state,
    party: updateMembers(party, members, m => ({ magic: Math.min(10, m.magic + amount) })),
    logs: nextLogs,
  };
}

export function handleLoseMember(state, action) {
  const { party, faintedParty, logs } = state;
  const faintedMember = party[action.member];
  return {
    ...state,
    party: party.filter((_, i) => i !== action.member),
    faintedParty: [...faintedParty, faintedMember],
    logs: [...logs, logRed(`${faintedMember.name} has fainted`)],
    isWalking: false,
  };
}

export function updateMembers(party, members, updateFn) {
  return party.map((m, i) => (members.includes(i) ? { ...m, ...updateFn(m) } : m));
}

function getRandomElements(arr, min, max) {
  const numRandomElements = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = arr.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numRandomElements);
}
