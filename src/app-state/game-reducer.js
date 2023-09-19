import { START_GAME } from './actions';
import { LOSE_PARTY_MEMBER, handleLoseMember } from './party';
import { log } from './logs';
import {
  ARGUMENT,
  BREAKDOWN,
  CHARACTER_BREAK,
  EXPERIENCE_ATTRACTION,
  HURT_BACK,
  LAME_JOKE,
  LOST_PHONE,
  TALL_PERSON,
  handleArgument,
  handleBreakdown,
  handleCharacterBreak,
  handleExperienceAttraction,
  handleHurtBack,
  handleLameJoke,
  handleLostPhone,
  handleTallPerson,
} from './attractions';
import {
  BUY_MICKEY_BALOON,
  SHOP_MAIN_STREET,
  TAKE_CASTLE_PICTURES,
  handleBuyMickeyBalloon,
  handleShopMainStreet,
  handleTakeCastlePictures,
} from './lands/main-street';
import {
  ARRIVE_AT_LAND,
  CHANGE_LAND,
  DOWNPOUR,
  DROPPED_ICE_CREAM,
  DYSNEYTERRY,
  LOST_STROLLER,
  handleArriveAtLand,
  handleChangeLand,
  handleDownpour,
  handleDroppedIceCream,
  handleDysneyterry,
  handleLostStroller,
} from './lands/walking';
import { BUY_DOLE_WHIP, handleBuyDoleWhip } from './lands/adventureland';
import { SHOP_CHRISTMAS, handleShopChristmas } from './lands/liberty-square';

// TODO add Redux slices for party (members, supplies) and land (details, options)
// TODO use Immer reducers for brevity (covered by RTK)
// TODO map of action type to function instead of case
export function gameReducer(state, action) {
  switch (action.type) {
    case START_GAME: {
      const { type, ...rest } = action;
      return { ...state, ...rest };
    }
    case LOSE_PARTY_MEMBER:
      return handleLoseMember(state, action);
    case SHOP_MAIN_STREET:
      return handleShopMainStreet(state, action);
    case TAKE_CASTLE_PICTURES:
      return handleTakeCastlePictures(state, action);
    case BUY_MICKEY_BALOON:
      return handleBuyMickeyBalloon(state, action);
    case CHANGE_LAND:
      return handleChangeLand(state, action);
    case ARRIVE_AT_LAND:
      return handleArriveAtLand(state, action);
    case DOWNPOUR:
      return handleDownpour(state, action);
    case DROPPED_ICE_CREAM:
      return handleDroppedIceCream(state, action);
    case BUY_DOLE_WHIP:
      return handleBuyDoleWhip(state);
    case EXPERIENCE_ATTRACTION:
      return handleExperienceAttraction(state, action);
    case BREAKDOWN:
      return handleBreakdown(state, action);
    case LOST_PHONE:
      return handleLostPhone(state, action);
    case ARGUMENT:
      return handleArgument(state, action);
    case DYSNEYTERRY:
      return handleDysneyterry(state, action);
    case LAME_JOKE:
      return handleLameJoke(state, action);
    case CHARACTER_BREAK:
      return handleCharacterBreak(state, action);
    case HURT_BACK:
      return handleHurtBack(state, action);
    case TALL_PERSON:
      return handleTallPerson(state, action);
    case SHOP_CHRISTMAS:
      return handleShopChristmas(state, action);
    case LOST_STROLLER:
      return handleLostStroller(state, action);
    default:
      return { ...state, logs: [...state.logs, log(`Unknown action: ${action.type}`)] };
  }
}
