import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FaintedMember, LogMessage, LogType, Member, NewMember, ParkArea, PartyStatus } from './model';
import { WritableDraft } from 'immer/dist/internal.js';

const logNormal = (message: string): LogMessage => ({ message, type: LogType.Normal });
const logBad = (message: string): LogMessage => ({ message, type: LogType.Bad });
const logGood = (message: string): LogMessage => ({ message, type: LogType.Good });

export interface GameState {
  members: Record<string, Member>;
  faintedMembers: Record<string, FaintedMember>;
  status: PartyStatus;
  parkArea: ParkArea;
  visitedAreas: ParkArea[];
  logs: LogMessage[];
  gameOverMessage: string;
}

const initialState: GameState = {
  members: {},
  faintedMembers: {},
  status: PartyStatus.Exploring,
  parkArea: 'Main Street USA',
  visitedAreas: ['Main Street USA'],
  logs: [logNormal('Welcome to Main Street USA!')],
  gameOverMessage: '',
};

export const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    resetGame: () => initialState,
    addMember: {
      reducer: (state, action: PayloadAction<Member>) => {
        state.members[action.payload.id] = action.payload;
      },
      prepare: (member: NewMember): { payload: Member } => ({
        payload: newPartyMember(member),
      }),
    },
    changeArea: (state, action: PayloadAction<ParkArea>) => {
      state.visitedAreas.push(state.parkArea);
      state.status = PartyStatus.Traveling;
      state.parkArea = action.payload;
      state.logs.push(logNormal(`Welcome to ${action.payload}!`));
    },
    arriveAtArea: state => {
      state.status = PartyStatus.Exploring;
    },
    confirmFainted: (state, action: PayloadAction<FaintedMember>) => {
      state.faintedMembers[action.payload.id].showDialog = false;
    },
    gameOver: (state, action: PayloadAction<string>) => {
      state.gameOverMessage = action.payload;
    },

    changeMagic: {
      reducer: (state, { payload }: PayloadAction<MagicChangePayload>) => {
        const { members, quantity } = payload;
        members.forEach(m => {
          const nextMagic = quantity > 0 ? Math.min(10, m.magic + quantity) : Math.max(0, m.magic + quantity);
          if (nextMagic > 0) {
            state.members[m.id].magic = nextMagic;
          } else {
            delete state.members[m.id];
            state.faintedMembers[m.id] = { ...m, faintedFrom: 'lost-magic', showDialog: true };
          }
        });
        state.logs.push({ ...logNormal(payload.logMessage), tooltip: `${quantity > 0 ? '+' : ''}${quantity} magic` });
      },
      prepare: prepareMagicChange,
    },

    dysneyterry: (state, action: PayloadAction<Member>) => {
      const member = state.members[action.payload.id];
      if (member.hasDysneyterry) {
        state.logs.push(logBad(`${member.name} has fainted from Dysneyterry`));
        delete state.members[member.id];
        state.faintedMembers[member.id] = { ...action.payload, faintedFrom: 'dysneyterry', showDialog: true };
      } else {
        state.logs.push(logBad(`${member.name} has Dysneyterry`));
        member.hasDysneyterry = true;
      }
    },

    // attractions
    breakdown: (state, { payload }: PayloadAction<{ members: Member[]; attractionName: string }>) => {
      handleLoseMagic(state, 1, payload.members, `You were next in line when ${payload.attractionName} broke down`);
    },
  },
});

export interface MagicChangePayload {
  members: Member[];
  quantity: number;
  logMessage: string;
}

function prepareMagicChange(members: Member[], quantity: number, logMessage: string): { payload: MagicChangePayload } {
  return { payload: { members, quantity, logMessage } };
}

function handleLoseMagic(state: WritableDraft<GameState>, quantity: number, members: Member[], log: string) {
  state.logs.push(logNormal(log));
  members.forEach(m => {
    const nextMagic = Math.max(0, m.magic - quantity);
    if (nextMagic > 0) {
      state.members[m.id].magic = nextMagic;
    } else {
      delete state.members[m.id];
      state.faintedMembers[m.id] = { ...m, faintedFrom: 'lost-magic', showDialog: true };
    }
  });
  const names = Object.keys(state.members).length === members.length ? 'Everyone' : members.map(m => m.name).join(', ');
  state.logs.push(logBad(`${names} lost ${quantity} magic`));
  if (Object.keys(state.members).length === 0) {
    state.gameOverMessage = 'All party members have fainted';
  }
}

function newPartyMember(member: NewMember): Member {
  return {
    ...member,
    id: `${member.name}-${member.age}`,
    magic: 10,
    hasBalloon: false,
    hasDysneyterry: false,
  };
}

export const { addMember, arriveAtArea, breakdown, changeArea, dysneyterry, confirmFainted, gameOver, changeMagic } =
  gameSlice.actions;

export default gameSlice.reducer;
