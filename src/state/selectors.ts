import { Age, Member } from '.';

export function selectRandomMember(members: Record<string, Member>, age?: Age): Member {
  const memberValues = Object.values(members);
  const filtered = age ? memberValues.filter(m => m.age === age) : memberValues;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
