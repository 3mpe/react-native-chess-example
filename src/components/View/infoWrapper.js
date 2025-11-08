/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import RNView from './index';
import Image from '../Image';
import Typography from '../Typography';

/**
 * @typedef {import('.').CustomViewProps & {
 *   text: string | import('react').ReactNode;
 *   icon?: string;
 *   tintColor?: string;
 * }} InfoWrapperProps
 */

/**
 * Belirli bir metni ve ikonu bir çerçeve içinde gösteren bilgilendirme bileşeni.
 * @param {InfoWrapperProps} props - InfoWrapper bileşeninin propları.
 * @returns {JSX.Element}
 */
const InfoWrapper = ({
  text = '',
  icon = 'infoModal',
  tintColor,
  color = 'default10',
  htmlContent = null,
  ...rest
}) => {
  return (
    <RNView>
      <RNView
        row
        bgColor="neutral2"
        borderColor="primary6"
        borderWidth={1}
        borderRadius={8}
        padding={16}
        {...rest}
      >
        <Image
          name={icon}
          width={24}
          height={24}
          tintColor={tintColor}
          margin={0}
        />
        <Typography
          variant="p3"
          color={color}
          marginLeft={8}
          marginRight={8}
          paddingRight={8}
          htmlContent={htmlContent}
        >
          {typeof text === 'string' ? text : <>{text}</>}
        </Typography>
      </RNView>
    </RNView>
  );
};

InfoWrapper.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  icon: PropTypes.string,
  tintColor: PropTypes.string,
};

export default InfoWrapper;
