import {
  handleGainMagic,
  handleLoseMagic,
  selectRandomAdult,
  selectRandomAdults,
  selectRandomChildren,
  selectRandomMembers,
} from './party';

export const EXPERIENCE_ATTRACTION = 'experience-attraction';
export function experienceAttraction(state, attraction) {
  const members = attraction.type.memberSelector(state.party);
  return { type: EXPERIENCE_ATTRACTION, attraction, members };
}

export function handleExperienceAttraction(state, { attraction, members }) {
  const { name, type, logMessage } = attraction;
  const { magic } = type;
  const partyState =
    magic > 0
      ? handleGainMagic(state, members, magic, logMessage)
      : handleLoseMagic(state, members, -magic, logMessage);
  return {
    ...partyState,
    submittedOptions: [...state.submittedOptions, name],
  };
}

export const BREAKDOWN = 'breakdown';
export function breakdown(attraction, party) {
  return { type: BREAKDOWN, attraction, members: selectRandomMembers(party, 1, 3) };
}

export function handleBreakdown(state, { attraction, members }) {
  return {
    ...handleLoseMagic(state, members, 2, `You were next in line when ${attraction.name} broke down`),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const LOST_PHONE = 'lost-phone';
export function lostPhone(attraction, party) {
  return { type: LOST_PHONE, attraction, member: selectRandomAdult(party) };
}

export function handleLostPhone(state, { attraction, member }) {
  const name = state.party[member].name;
  return {
    ...handleLoseMagic(state, [member], 3, `${name} dropped their phone while riding ${attraction.name}`),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const HURT_BACK = 'hurt-back';
export function hurtBack(attraction, party) {
  return { type: HURT_BACK, attraction, member: selectRandomAdult(party) };
}

export function handleHurtBack(state, { attraction, member }) {
  const name = state.party[member].name;
  return {
    ...handleLoseMagic(state, [member], 3, `${name} hurt their back while riding ${attraction.name}`),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const ARGUMENT = 'argument';
export function argument(attraction, party) {
  return { type: ARGUMENT, attraction, members: selectRandomMembers(party, 2, 2) };
}

export function handleArgument(state, { attraction, members }) {
  const names = members.map(i => state.party[i].name);
  const logMessage = `${names.join(' and ')} have an argument while waiting for ${attraction.name}`;
  return {
    ...handleLoseMagic(state, members, 1, logMessage),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const TALL_PERSON = 'tall-person';
export function tallPerson(attraction, party) {
  return { type: TALL_PERSON, attraction, members: selectRandomChildren(party, 1, 2) };
}

export function handleTallPerson(state, { attraction, members }) {
  return {
    ...handleLoseMagic(
      state,
      members,
      1,
      `A 7 foot tall person sits in front of you just before ${attraction.name} starts`
    ),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const CAUGHT_STUFFING_SHOES = 'caught-stuffing-shoes';
export function caughtStuffingShoes(attraction, party) {
  return { type: CAUGHT_STUFFING_SHOES, attraction, members: selectRandomAdults(party, 1, 1) };
}

export function handleCaughtStuffingShoes(state, { attraction, members }) {
  const names = members.map(i => state.party[i].name);
  const logMessage = `${names.join(' and ')} was caught stuffing the kids' shoes for ${attraction.name}`;
  return {
    ...handleLoseMagic(state, members, 2, logMessage),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const LAME_JOKE = 'lame-joke';
export function lameJoke(attraction, party) {
  return { type: LAME_JOKE, attraction, member: selectRandomAdult(party) };
}

export function handleLameJoke(state, { attraction, member }) {
  const name = state.party[member].name;
  const log = `${attraction.characterName} didn't laugh at ${name}'s lame joke`;
  return {
    ...handleLoseMagic(state, [member], 1, log),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}

export const CHARACTER_BREAK = 'character-break';
export function characterBreak(attraction, party) {
  return { type: CHARACTER_BREAK, attraction, members: selectRandomMembers(party) };
}

export function handleCharacterBreak(state, { attraction, members }) {
  return {
    ...handleLoseMagic(state, members, 2, `You were next in line when ${attraction.characterName} took a break`),
    submittedOptions: [...state.submittedOptions, attraction.name],
  };
}
