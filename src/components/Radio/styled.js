import {ScaledSheet, themeToken} from '../../utils';

const useStyle = ({token = {}, selected}) => {
  const tokens = Object.assign(themeToken, token);

  const styles = ScaledSheet.create({
    circleContainer: {
      width: '20@s',
      height: '20@s',
      borderRadius: '12@s',
      borderWidth: '1@s',
      borderColor: selected ? tokens.colors.primary6 : tokens.colors.default6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      width: '10@s',
      height: '10@s',
      borderRadius: '10@s',
      borderWidth: '1@s',
      borderColor: selected ? tokens.colors.primary6 : tokens.colors.default6,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;
