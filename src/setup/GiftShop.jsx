import './GiftShop.css';
import SetupStep from './SetupStep';

export default function GiftShop({ occupation, supplies, setSupplies, handlePreviousStep, handleNextStep }) {
  const totalCost = () => {
    return Object.values(supplies).reduce((acc, item) => (acc += item.unitPrice * (item.quantity ?? 0)), 0);
  };

  return (
    <SetupStep handlePrevious={handlePreviousStep} handleNext={handleNextStep}>
      <table>
        <caption>Gift Shop</caption>
        <tbody>
          {Object.entries(supplies).map(([key, item]) => (
            <tr key={key}>
              <td>
                <input
                  type="number"
                  max={10}
                  min={0}
                  value={item.quantity ?? 0}
                  onChange={e =>
                    setSupplies({
                      ...supplies,
                      [key]: { ...supplies[key], quantity: e.currentTarget.valueAsNumber },
                    })
                  }
                />
              </td>
              <td>
                <p>
                  {item.name} (${item.unitPrice})
                </p>
              </td>
              <td>
                <p>${item.unitPrice * (item.quantity || 0)}</p>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              Total: ${totalCost()}/${occupation.cash}
            </td>
          </tr>
        </tfoot>
      </table>
    </SetupStep>
  );
}
