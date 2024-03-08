import { useOutlet } from 'react-router-dom';

export default function BlankLayout() {
  const outlet = useOutlet();

  return outlet;
}
