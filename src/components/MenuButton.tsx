'use client';
import Word from './Word'

interface ComponentProps {
  color?: string
}

const Component = ({ color = 'white' }: ComponentProps) => {
  return (
    <div pload-opacity="" className='menu-btn'>
      <Word text="Menu" color={color} />
    </div>
  );
}

export default Component