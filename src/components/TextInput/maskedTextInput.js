import React, {useState} from 'react';
import {TextInput} from './../';

const maskText = text => {
  if (!text || text.length < 2) {
    return text; // Eğer metin çok kısa ise, maskelenecek bir şey yok
  }

  const firstChar = text.charAt(0);
  const maskedChars = '_'.repeat(text.length - 1);

  return `${firstChar}${maskedChars}`;
};

const MaskedTextInput = ({value, onChangeText, ...props}) => {
  const [maskedValue, setMaskedValue] = useState('');

  const handleChangeText = text => {
    const maskedText = maskText(text);
    setMaskedValue(maskedText);
    onChangeText(text);
  };

  return (
    <TextInput {...props} value={maskedValue} onChangeText={handleChangeText} />
  );
};

export default MaskedTextInput;
