import style from './blockFunctional.module.scss'

interface BlockExtraInfoProps {
  text: string;
  variant?: 'info' | 'success';
}

export const BlockExtraInfo = ({ 
  text, 
  variant = 'info' 
}: BlockExtraInfoProps) => {
  return (
    <p className={`${style.extraInfo} ${style[`extraInfo--${variant}`]}`}>
      {text}
    </p>
  );
};


