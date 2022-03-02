import useFormState from './useFormState';
import FormInput from '../components/FormInput';
import { fireEvent, render, screen } from '@testing-library/react';

function DummyInputHandling () {
  const [data, , handleFormData] = useFormState('');

  return (
    <>
      <FormInput id="test" label="Form Input" value={data} onChange={handleFormData}/>
      <p data-testid="input-result">{data}</p>
    </>
  );
}

test('handleInput works correctly', () => {
  render(<DummyInputHandling/>);
  const input = screen.getByLabelText('Form Input');
  const result = screen.getByTestId('input-result');
  const value = 'Test';

  fireEvent.change(input, {
    target: {
      value,
    },
  });

  expect(result.innerHTML).toBe(value);
});
