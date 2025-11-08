import colors from './colors';
import fontFamily from './fontAssets';

const tokens = {
  colors,
  header: {
    imageContainer: {
      container: {},
      loader: {},
      error: {},
      image: {},
    },
  },

  view: {
    base: {
      fontFamily: fontFamily.Ubuntu,
    },
    flex: {
      flex: 1,
      fontFamily: fontFamily.Ubuntu,
    },
    center: {
      justifyContent: 'center',
      fontFamily: fontFamily.Ubuntu,
    },
    alignCenter: {
      alignItems: 'center',
      fontFamily: fontFamily.Ubuntu,
    },
  },

  typography: {
    h1: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '64@s',
      color: colors.neutral1,
    },
    h2: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '48@s',
      color: colors.neutral1,
    },
    h3: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '40@s',
      color: colors.neutral1,
    },
    h4: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '32@s',
      color: colors.neutral1,
    },
    h5: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '28@s',
      color: colors.neutral1,
    },
    h6: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '24@s',
      color: colors.neutral1,
    },
    s1: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '20@s',
      color: colors.neutral1,
    },
    s2: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '18@s',
      color: colors.neutral1,
    },
    s3: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '16@s',
      color: colors.neutral1,
    },
    s4: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '14@s',
      color: colors.neutral1,
    },
    p1: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '16@s',
      color: colors.neutral1,
    },
    p2: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '14@s',
      color: colors.neutral1,
    },
    p3: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '12@s',
      color: colors.neutral1,
    },
    p4: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '10@s',
      color: colors.neutral1,
    },
    p5: {
      fontFamily: fontFamily.Ubuntu,
      fontSize: '8@s',
      color: colors.neutral1,
    },

    bold: {
      fontWeight: 700,
      fontFamily: fontFamily.Ubuntu_Bold,
    },
    semiBold: {
      fontWeight: 600,
      fontFamily: fontFamily.Ubuntu_Medium,
    },
    regular: {
      fontWeight: 400,
      fontFamily: fontFamily.Ubuntu_Regular,
    },
  },

  tag: {
    borderRadius: 4,
    fontFamily: fontFamily.Ubuntu,
  },
};

export default tokens;
