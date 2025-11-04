import { EntityState, PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { MagicChangePayload, UseSupplyEvent, UseSupplyPayload } from './game-loop';
import { RootState } from './store';

export type Age = 'Adult' | 'Child' | 'All';

export interface Member {
  id: string;
  name: string;
  age: Age;
  magic: number;
}

export type OccupationName =
  | 'Stay-at-Home Parent'
  | 'Fitness Instructor'
  | 'Teacher'
  | 'Undercover Agent'
  | 'Software Engineer'
  | 'Business Executive';

export interface PlayerOccupation {
  name: OccupationName;
  description: string;
  cash: number;
}

export type SupplyId = 'Water Bottle' | 'Snack' | 'Set of Clothes';

export interface SupplyItem {
  id: SupplyId;
  unitPrice: number;
  quantity: number;
}

const membersAdapter = createEntityAdapter<Member>();
const suppliesAdapter = createEntityAdapter<SupplyItem>();

export interface LogMessage {
  text: string;
  hoverText?: string;
}

export interface GameState {
  gameLoopInterval: number;
  occupation: string;
  members: EntityState<Member, string>;
  supplies: EntityState<SupplyItem, SupplyId>;
  logs: LogMessage[];
}

const initialState: GameState = {
  gameLoopInterval: 0,
  occupation: '',
  members: membersAdapter.getInitialState(),
  supplies: suppliesAdapter.getInitialState(undefined, [
    { id: 'Water Bottle', quantity: 2, unitPrice: 1 },
    { id: 'Set of Clothes', quantity: 3, unitPrice: 1 },
  ]),
  logs: [{ text: 'Welcome to Main Street USA!' }],
};

export const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    resetGame: () => initialState,
    runLoop: state => {
      state.gameLoopInterval++;
    },
    setOccupation: (state, action: PayloadAction<string>) => {
      state.occupation = action.payload;
    },
    setAllMembers: (state, action: PayloadAction<Member[]>) => {
      membersAdapter.setAll(state.members, action.payload);
    },

    magicChange: (state, { payload }: PayloadAction<MagicChangePayload>) => {
      const { member, magic, logText } = payload;
      membersAdapter.updateOne(state.members, { id: member.id, changes: { magic: member.magic + magic } });
      state.logs.push({ text: logText, hoverText: `${magic} magic` });
    },

    useSupply: (state, { payload }: PayloadAction<UseSupplyPayload>) => {
      const { supplyId, logText } = payload;
      const existing: SupplyItem = state.supplies.entities[supplyId];
      suppliesAdapter.updateOne(state.supplies, { id: payload.supplyId, changes: { quantity: existing.quantity - 1 } });
      state.logs.push(logText);
    },

    logMessage: (state, action: PayloadAction<LogMessage>) => {
      state.logs.push(action.payload);
    },
  },
});

export const { selectAll: selectAllMembers } = membersAdapter.getSelectors((state: RootState) => state.game.members);
export const { selectById: selectSupplyById } = suppliesAdapter.getSelectors((state: RootState) => state.game.supplies);
export const { setOccupation, setAllMembers, logMessage, runLoop, magicChange, useSupply } = gameSlice.actions;

export default gameSlice.reducer;
