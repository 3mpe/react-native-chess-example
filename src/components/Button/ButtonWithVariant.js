import Button from '.';
import Typography from '../Typography';
import View from '../View';

const PrimaryButton = ({onPress = () => {}, text = '', ...rest}) => {
  return (
    <Button onPress={onPress} {...rest}>
      <View
        bgColor="primary6"
        paddingTop={10}
        paddingBottom={10}
        paddingLeft={16}
        paddingRight={16}>
        <Typography variant="s3" semibold color="neutral2">
          {text}
        </Typography>
      </View>
    </Button>
  );
};

export default PrimaryButton;
