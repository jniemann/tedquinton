'use client';

import { useAnimation } from '../contexts/AnimationContext';
import Word from './Word'

interface ComponentProps {
  color?: string
}

const Component = ({ color = 'white' }: ComponentProps) => {
  const { refs } = useAnimation()
  return (
    <div pload-opacity="" className='menu-btn' ref={refs?.menuOpenButtonRef}>
      <Word text="Menu" color={color} />
    </div>
  );
}

export default Component