import React from 'react';
import About from './About';
import CardHeader from './CardHeader';
import Contact from './Contact';
import DetailBoard from './DetailBoard';
import ForActivity from './ForActivity';
import ForParticipant from './ForParticipant';
import ForProgram from './ForProgram';
import Join from './Join';
import SSS from './SSS';
import UseFullInformation from './UseFullInformation';

const ActivitiesDetail = () => {
  return null;
};

ActivitiesDetail.About = About;
ActivitiesDetail.CardHeader = CardHeader;
ActivitiesDetail.Contact = Contact;
ActivitiesDetail.Join = Join;
ActivitiesDetail.SSS = SSS;
ActivitiesDetail.ForActivity = ForActivity;
ActivitiesDetail.ForProgram = ForProgram;
// ActivitiesDetail.ForParticipant = ForParticipant; // Bu alan ilk faz içinden kaldırıldı
ActivitiesDetail.DetailBoard = DetailBoard;
ActivitiesDetail.UseFullInformation = UseFullInformation;

ActivitiesDetail.displayName = 'ActivitiesDetail';
export default ActivitiesDetail;
