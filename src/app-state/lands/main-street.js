import { handleGainMagic, handleLoseMagic, selectRandomChildren } from '../party';
import { deductCash, selectRandomSupply, handleBuySupplies } from '../supplies';

export const SHOP_MAIN_STREET = 'shop-main-street';
export function shopMainStreet({ supplies }) {
  return { type: SHOP_MAIN_STREET, supply: selectRandomSupply(supplies) };
}

export const TAKE_CASTLE_PICTURES = 'take-castle-pictures';
export function takeCastlePictures(state) {
  return { type: TAKE_CASTLE_PICTURES, members: selectRandomChildren(state.party, 0, 2) };
}

export const BUY_MICKEY_BALOON = 'buy-mickey-balloon';
export function buyMickeyBalloon(member) {
  return { type: BUY_MICKEY_BALOON, member };
}

export function handleShopMainStreet(state, { supply }) {
  return {
    ...state,
    ...handleBuySupplies(state, supply, 2),
    submittedOptions: [...state.submittedOptions, SHOP_MAIN_STREET],
  };
}

export function handleTakeCastlePictures(state, { members }) {
  return {
    ...state,
    ...handleLoseMagic(state, members, 1, 'You spend 15 minutes taking castle pictures'),
    submittedOptions: [...state.submittedOptions, TAKE_CASTLE_PICTURES],
  };
}

const balloonPrice = 15;

export function handleBuyMickeyBalloon(state, { member }) {
  const { occupation, party, submittedOptions } = state;
  const memberIndex = party.findIndex(m => m.name === member.name);
  const angryChildren = party
    .map((m, i) => (m.age === 'Child' && m.name !== member.name ? i : undefined))
    .filter(i => i !== undefined);
  const angryNames = angryChildren.map(i => party[i].name);

  let nextPartyState = handleGainMagic(
    state,
    [memberIndex],
    2,
    `You spend $${balloonPrice} on a balloon for ${member.name}`
  );
  if (angryChildren) {
    nextPartyState = handleLoseMagic(
      nextPartyState,
      angryChildren,
      2,
      `${angryNames.join(' and ')} throw a jealousy tantrum`
    );
  }

  return {
    occupation: deductCash(occupation, balloonPrice),
    ...nextPartyState,
    submittedOptions: [...submittedOptions, `${BUY_MICKEY_BALOON}-${member.name}`],
  };
}

export const mainStreet = {
  name: 'Main Street USA',
  video: 'main-street-usa.mp4',
  options: state => [
    {
      id: SHOP_MAIN_STREET,
      label: 'Shop Main Street',
      action: state => shopMainStreet(state),
    },
    {
      id: TAKE_CASTLE_PICTURES,
      label: 'Take castle pictures',
      action: state => takeCastlePictures(state),
    },
    ...state.party
      .filter(m => m.age === 'Child' && !m.hasBalloon)
      .map(child => ({
        id: `${BUY_MICKEY_BALOON}-${child.name}`,
        label: `Buy ${child.name} a Mickey balloon`,
        action: () => buyMickeyBalloon(child),
        condition: ({ occupation }) => occupation.cash > 15,
      })),
  ],
};
