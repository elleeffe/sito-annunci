import {fireEvent, render, screen} from '../../test-utils';
import MyButton from '../../components/Buttons/MyButton';

describe('MyButton', () => {
  it('Should render correcty', () => {
    render(<MyButton>Label</MyButton>);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('Disabled prop', () => {
    render(<MyButton disabled>Label</MyButton>);

    expect(screen.getByText('Label')).toBeDisabled();
  });

  it('OnClick prop', () => {
    const action = jest.fn();
    render(<MyButton onClick={action}>Label</MyButton>);

    fireEvent.click(screen.getByText('Label'));
    expect(action).toHaveBeenCalled();
  });

  it('Loading prop', () => {
    render(<MyButton loading>Label</MyButton>);

    expect(screen.getByLabelText('loader')).toBeInTheDocument();
  });
});
