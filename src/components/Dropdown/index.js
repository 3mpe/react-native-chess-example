import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Dropdown} from './../../utils';
import styles from './styled';
import colors from '../../utils/colors';
import inputHOC from '../Form/inputHOC';
import View from '../View';
const CustomDropdown = ({
  data,
  flex,
  center,
  alignCenter,
  between,
  around,
  evenly,
  start,
  end,
  stretch,
  baseline,
  row,
  column,
  wrap,
  children,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
  height,
  borderRadius,
  borderWidth,
  borderColor,
  bgColor,
  value,
  onChange,
  onChangeText,
  ...rest
}) => {
  const styled = styles();
  const [selectedValue, setSelectedValue] = React.useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <View
      flex={flex}
      center={center}
      alignCenter={alignCenter}
      between={between}
      around={around}
      evenly={evenly}
      start={start}
      end={end}
      stretch={stretch}
      baseline={baseline}
      row={row}
      column={column}
      wrap={wrap}
      padding={padding}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      width={width}
      height={height}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      style={[styled.container, rest.style]}>
      <Dropdown
        placeholder="Seçiniz"
        searchPlaceholder="Arama..."
        onChange={e => {
          setSelectedValue(e.value);
          if (onChange) {
            onChange(e);
          } else if (onChangeText) onChangeText(e.value);
        }}
        iconStyle={styled.iconStyle}
        {...rest}
        style={[styled.dropdown]}
        itemTextStyle={{color: colors.default10}}
        selectedTextStyle={{color: colors.default10}}
        inputSearchStyle={{color: colors.default10}}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{backgroundColor: colors.neutral2, marginTop: 20}}
        dropdownPosition="auto"
        data={data}
        labelField="label"
        valueField="value"
        value={selectedValue}
        // placeholderStyle={styled.placeholderStyle}
        // selectedTextStyle={styled.selectedTextStyle}
        // inputSearchStyle={styled.inputSearchStyle}
      />
    </View>
  );
};
CustomDropdown.DisplayName = 'CustomDropdown';
CustomDropdown.prototypes = {
  ref: PropTypes.oneOfType([
    PropTypes.shape({current: PropTypes.any}),
    PropTypes.func,
  ]),
  testID: PropTypes.string,
  itemTestIDField: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedTextProps: PropTypes.object,
  itemContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  itemTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputSearchStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  fontFamily: PropTypes.string,
  iconColor: PropTypes.string,
  activeColor: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.any,
  ]),
  placeholder: PropTypes.string,
  labelField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  searchField: PropTypes.string,
  search: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  disable: PropTypes.bool,
  autoScroll: PropTypes.bool,
  showsVerticalScrollIndicator: PropTypes.bool,
  dropdownPosition: PropTypes.oneOf(['auto', 'top', 'bottom']),
  flatListProps: PropTypes.object,
  keyboardAvoiding: PropTypes.bool,
  backgroundColor: PropTypes.string,
  confirmSelectItem: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  itemAccessibilityLabelField: PropTypes.string,
  inverted: PropTypes.bool,
  mode: PropTypes.oneOf(['default', 'modal', 'auto']),
  closeModalWhenSelectedItem: PropTypes.bool,
  excludeItems: PropTypes.array,
  excludeSearchItems: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  renderLeftIcon: PropTypes.func,
  renderRightIcon: PropTypes.func,
  renderItem: PropTypes.func,
  renderInputSearch: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  searchQuery: PropTypes.func,
  onChangeText: PropTypes.func,
  onConfirmSelectItem: PropTypes.func,
};

export default inputHOC(CustomDropdown);
