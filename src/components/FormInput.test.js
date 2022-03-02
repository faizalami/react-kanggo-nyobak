import { render, screen } from '@testing-library/react';
import FormInput, { FormLabel } from './FormInput';

describe('Form Input and Label', () => {
  test('label matches snapshot', () => {
    expect(render(<FormLabel>Test</FormLabel>)).toMatchSnapshot();
  });

  test('render correct input component', () => {
    render(
      <>
        <FormInput id="text-input" label="Text Input"/>
        <FormInput id="textarea-input" label="Textarea Input" type="textarea"/>
      </>
    );
    const textField = screen.getByLabelText('Text Input');
    expect(textField.tagName).toBe('INPUT');

    const textAreaField = screen.getByLabelText('Textarea Input');
    expect(textAreaField.tagName).toBe('TEXTAREA');
  });
});
