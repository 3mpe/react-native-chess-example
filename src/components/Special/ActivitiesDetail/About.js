import React, {useCallback, useState} from 'react';
import {View, Typography, Button, Image} from '../../../components';

const About = ({data}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showToggleButton, setShowToggleButton] = useState(false);

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed(prevValue => !prevValue);
  }, []);

  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > 4) {
      setShowToggleButton(true);
    } else setShowToggleButton(false);
  }, []);

  if (
    !data?.activityContentDescription ||
    data.activityContentDescription.length < 1
  ) {
    return null;
  }

  if (!data?.activityContentSubtitle && !data?.activityContentDescription) {
    return null;
  }
  return (
    <View marginTop={16}>
      <Typography
        ifCond={!data.activityContentSubtitle}
        variant="s3"
        color="default10"
        semibold>
        {data.activityContentSubtitle}
      </Typography>
      <Typography
        ifCond={!data.activityContentDescription}
        paragraph
        variant="p2"
        color="default10"
        marginTop={8}
        onTextLayout={isCollapsed ? onTextLayout : undefined}
        numberOfLines={isCollapsed ? 4 : undefined}>
        {data.activityContentDescription}
      </Typography>
      {showToggleButton && (
        <View marginTop={16} end>
          <Button onPress={handleToggleCollapse}>
            <View row center alignCenter>
              <Typography variant="s4" color="primary6" semibold>
                Daha {isCollapsed ? 'Fazla' : 'Az'} Gör
              </Typography>
              <Image
                name={isCollapsed ? 'arrowDown' : 'arrowUp'}
                marginLeft={6}
              />
            </View>
          </Button>
        </View>
      )}
    </View>
  );
};

export default About;
