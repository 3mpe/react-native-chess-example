import {ScaledSheet, themeToken} from './../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -960,
      marginBottom: -960,
    },
    modalContainer: {
      height: '100%',
      width: '100%',
      // backgroundColor: tokens.colors.neutral2,
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      position: 'relative',
    },

    buttonContainer: {
      position: 'absolute',
      right: 0,
      top: '40@s',
      zIndex: 9,
    },
    infoModal: {
      container: {},
      content: {
        padding: '20@s',
        backgroundColor: tokens.colors.neutral2,
        borderRadius: '10@s',
        maxHeight: '85%',
        marginTop: '45@s',
        marginRight: '16@s',
        marginLeft: '16@s',
      },
      buttonContainer: {
        position: 'absolute',
        right: 0,
        top: '0@s',
        zIndex: 9,
      },
      successButton: {
        paddingTop: '10@s',
        paddingBottom: '10@s',
        paddingLeft: '16@s',
        paddingRight: '16@s',
        backgroundColor: tokens.colors.primary6,
        borderRadius: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      successButtonText: {
        color: tokens.colors.neutral2,
      },
      rejectButton: {
        paddingTop: '10@s',
        paddingBottom: '10@s',
        paddingLeft: '16@s',
        paddingRight: '16@s',
        backgroundColor: tokens.colors.neutral2,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: tokens.colors.primary6,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    userTicket: {
      container: {
        flex: 1,
      },
      containerWrapper: {},
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;
