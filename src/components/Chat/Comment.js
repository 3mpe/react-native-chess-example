import React, {useState} from 'react';
import {View, Typography, Avatar, Button, Image} from './../';

const CommentItem = ({
  name,
  second,
  commentText,
  isLiked = false,
  showAnswer = false,
  onPressLike = () => {},
  onPressAnswer = () => {},
}) => {
  return (
    <View row between marginBottom={8}>
      <View flex={1} row>
        <Avatar
          width={44}
          height={44}
          containerProps={{height: 48, width: 48}}
        />
        <View center>
          <View center>
            <Typography
              variant="p2"
              color="default10"
              semibold
              marginBottom={2}
              numberOfLines={1}
              marginRight={80}
              ellipsizeMode="tail">
              {name}
            </Typography>
            <Typography variant="p4" color="default7" marginBottom={2}>
              {second}
            </Typography>
          </View>
          <Typography
            variant="p3"
            color="default7"
            marginBottom={2}
            marginRight={80}
            numberOfLines={2}>
            {commentText}
          </Typography>
          {showAnswer && (
            <Button onPress={onPressAnswer}>
              <Typography variant="p3" color="primary6" semibold>
                Cevapla
              </Typography>
            </Button>
          )}
        </View>
      </View>
      <View alignCenter center marginRight={12} marginLeft={12}>
        <View
          bgColor={isLiked ? 'primary6' : 'transparent'}
          borderRadius={100}
          padding={6}
          center
          alignCenter>
          <Button onPress={onPressLike}>
            <Image name="hearth" tintColor={isLiked ? 'white' : 'primary6'} />
          </Button>
        </View>
      </View>
    </View>
  );
};
const Comment = () => {
  const [data] = useState([
    {
      name: 'Aydilge Muşçuoğlu',
      commentText: 'Harika bir yol, iyi yolculuklar :)',
      second: '2 dakika ',
      isLiked: true,
    },
    {
      name: 'Ayşe Fatma Hayriye',
      commentText: 'Sen neden bizimle gelmedin?',
      second: '99 dakika ',
    },
    {
      name: 'Melek Mussolo',
      commentText: 'Yoldaki kuşlar tam bir şölen yaptı, harikasınız 💫💙',
      second: '99 dakika ',
    },
    {
      name: 'Aydilge Muşçuoğlu',
      commentText: 'Harika bir yol, iyi yolculuklar :)',
      second: '2 dakika ',
    },
    {
      name: 'Ayşe Fatma Hayriye',
      commentText: 'Sen neden bizimle gelmedin?',
      second: '99 dakika ',
    },
    {
      name: 'Melek Mussolo',
      commentText: 'Yoldaki kuşlar tam bir şölen yaptı, harikasınız 💫💙',
      second: '99 dakika ',
    },
  ]);
  return (
    <View>
      {data.map((item, i) => (
        <CommentItem
          key={i}
          name={item.name}
          commentText={item.commentText}
          second={item.second}
          isLiked={item.isLiked}
        />
      ))}
    </View>
  );
};
export default Comment;
