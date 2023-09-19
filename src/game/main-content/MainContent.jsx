import './MainContent.css';
import { useDispatch, useGame } from '../../app-state/GameContext';
import Dialog from '../dialog/Dialog';
import Land from './land/Land';
import Walking from './walking/Walking';
import { losePartyMember } from '../../app-state/party';

const renderMainContent = (party, isWalking, dispatch) => {
  const isGameLost = party.length === 0;
  const faintedMemberIndex = party.findIndex(m => m.magic === 0);
  const faintedMember = party[faintedMemberIndex];

  if (isGameLost) {
    return <Dialog title="Your party did not survive The Orlando Trail." message="See ya real soon!" />;
  } else if (faintedMemberIndex > -1) {
    const title = faintedMember.hasDysneyterry
      ? `${faintedMember.name} has fainted from Dysneyterry`
      : `${faintedMember.name} has fainted`;
    return (
      <Dialog
        title={title}
        img={faintedMember.age === 'Child' ? 'child-stroller.png' : 'asleep-on-bench.png'}
        onConfirm={() => dispatch(losePartyMember(faintedMemberIndex))}
      />
    );
  } else if (isWalking) {
    return <Walking />;
  } else {
    return <Land />;
  }
};

// TODO is this component necessary?
export default function MainContent() {
  const { party, isWalking } = useGame();
  const dispatch = useDispatch();

  return <div id="main-content">{renderMainContent(party, isWalking, dispatch)}</div>;
}
