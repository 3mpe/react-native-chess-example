import Typography from '.';
import View from '../View';

const HeaderTitle = ({title, color = 'default10', bgColor = 'surface1'}) => (
  <View
    bgColor={bgColor}
    padding={16}
    borderTopEndRadius={8}
    borderTopStartRadius={8}>
    <Typography variant="s3" semibold color={color}>
      {title}
    </Typography>
  </View>
);

export default HeaderTitle;
