// TODO consistency with enums and union types

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

export type ParkArea =
  | 'Main Street USA'
  | 'Fantasyland'
  | 'Frontierland'
  | 'Adventureland'
  | 'Tomorrowland'
  | 'Liberty Square';

export interface TravelSeason {
  name: string;
  description: string;
  bonusMultiplier: number;
  temperature: string;
}

export type Age = 'Adult' | 'Child' | 'All';

export interface Member {
  id: string;
  name: string;
  age: Age;
  magic: number;
  hasBalloon: boolean;
  hasDysneyterry: boolean;
}

export type NewMember = Omit<Member, 'magic' | 'id' | 'hasBalloon' | 'hasDysneyterry'>;

export type FaintedMember = Omit<Member, 'magic' | 'hasBalloon' | 'hasDysneyterry'> & {
  showDialog: boolean;
  faintedFrom: 'lost-magic' | 'dysneyterry';
};

export type Supplies = Record<string, SupplyItem>;

export interface SupplyItem {
  name: string;
  unitPrice: number;
  quantity: number;
}

export enum TravelPace {
  Casual,
  RopeDrop = 'Rope drop or die!',
}

export enum PartyStatus {
  Traveling,
  Exploring,
  Waiting,
}

export enum LogType {
  Normal,
  Bad,
  Good,
}

export interface LogMessage {
  type: LogType;
  message: string;
  tooltip?: string;
}

export const BALLOON_COST = 15;
export const LUNCH_COST = 30;
export const DOLE_WHIP_COST = 7;
