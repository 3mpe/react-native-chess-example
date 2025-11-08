import {Storage, format} from '../utils';

export const MockService = {
  isMock: async (data = null) => {
    let user = await Storage.getStorageObject(Storage.keys.USER);
    if (user === null) user = data;

    if (!user && !data) return false;

    const isSuccess =
      user &&
      user?.emailOrIdentifier?.toUpperCase() === 'U000000' &&
      user?.password === '123' &&
      (user?.phoneNumber === '05555555555' ||
        user?.phoneNumber === '905555555555');

    return !!isSuccess;
  },
  login: async (data = {}) => {
    const prepared = Object.assign(
      {
        accessToken: '',
        refreshToken: '',
        accessTokenExpiration: '',
        refreshTokenExpiration: '',
        smsRefId: '',
        testURL: '',
        isSuccessful: true,
        isPassOtp: false, // OTP doğrulamasını geçsin
        info: {
          company: 'Yapı ve Kredi Bankası A.Ş.',
          department: 'Test Departmanı',
          email: 'test@test.com.tr',
          firstName: 'test',
          fullName: 'test test',
          guid: '8bd0e434-a1a3-4b67-b9c6-9de0b8405255',
          identityNumber: 'u000000',
          jobTitle: 'Test Job Engineer',
          lastName: 'test',
          managerName: 'No Manager Name',
          officeName: 'Yapı Kredi Teknoloji',
          picture:
            'https://www.etkinlikmobile.yapikredi.com.tr/getavatar/205b64d7-f1ac-48e7-9399-71566b310158/avatar.jpeg?maxsidesize=9394&width=86&height=86&mediaprotectionhash=dfc7f182dbfed2af14fee0329102b801d2479221c8e909ac4a6590365194d0e2',
          emailOrIdentifier: 'u000000',
          phoneNumber: '905555555555',
          password: '123',
        },
      },
      data,
    );
    prepared.info.firstName = format.getFirstName(prepared.info);
    prepared.info.lastName = format.getLastName(prepared.info);
    await Storage.setStorageObject(Storage.keys.USER, prepared);
    await Storage.setStorageValue(Storage.keys.TOKEN, prepared.accessToken);
    await Storage.setStorageValue(
      Storage.keys.REFRESH_TOKEN,
      prepared.refreshToken,
    );

    return Promise.resolve({
      data: prepared,
      isSuccessful: true,
    });
  },
  getConsents: () => {
    return Promise.resolve({
      data: [
        {
          consentGuid: 'a465533b-a2a5-4d47-80d8-2d3d08306295',
          consentId: 1,
          hash: 'fe6216ef828d3ab5d473b75aefbb4f48fc25597feaf6a4d75cbff2d6a151ecf4',
          longText: `
    FİRMA, BANKA ve/veya İştirakleri tarafından aktarılan gerçek kişilere ilişkin her türlü bilginin, tüzel kişilere ilişkin olmakla birlikte gerçek kişilere ilişkin bilgileri içeren her türlü bilginin kişisel veri olduğunu, bu bilgilerin 6698 Sayılı &ldquo;Kişisel Verilerin Korunması Kanunu&#39;nu&quot; uygun olarak ve bu sözleşmedeki şartlarla işleneceğini kabul eder.<br />
    FİRMA, BANKA ve/veya İştirakleri&rsquo;nin aktardığı kişisel verileri, iş bu Sözleşmeye ilişkin hizmet kapsamında, Sözleşme amacına uygun, işlendiği amaçla bağlantılı ve sınırlı olarak işlemeyi, bu Sözleşme kapsamındaki hizmetin görülmesi için gerekli olan süre sonuna kadar muhafaza etmeyi, kişisel verilerin işlenmesini gerektiren sebeplerin ortadan kalkması halinde silmeyi, yok etmeyi veya anonim hâle getirmeyi kabul, beyan ve taahhüt eder.<br />
    FİRMA, BANKA ve/veya İştirakleri&rsquo;nin aktarmış olduğu kişisel verileri, BANKA&rsquo;nın bilgisi/izni olmadan hiçbir şekilde gerek yurt içindeki gerekse yurt dışındaki üçüncü kişilere ya da kurumlara aktarmamayı, kişisel verilere hukuka aykırı olarak erişilmesini ve/veya kişisel verilerin hukuka aykırı olarak işlenmesini önlemeyi, kişisel verilerin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeyi, her türlü teknik ve idari tedbirleri almayı, 6698 Sayılı &ldquo;Kişisel Verilerin Korunması Kanunu&rdquo; gereğince çıkarılacak tüm alt düzenlemelere uymayı ve gerekli olması halinde iş bu Sözleşme kapsamındaki işlemlerini uyumlu hale getirmeyi kabul, beyan ve taahhüt eder.<br />
    FİRMA, herhangi bir şekilde BANKA ve/veya İştirakleri&rsquo;nin iş bu Sözleşmedeki işlemler nedeni ile ve/veya veri sorumlusu sıfatıyla &ldquo;Kişisel Verileri Koruma Kuruluna&rdquo; şikayet edilmesi halinde BANKA ve/veya İştirakleri&rsquo;ne her türlü belge, bilgi ve hukuki desteği sağlayacağını, kişisel verisi işlenen gerçek kişi tarafından açılacak olan herhangi bir davada da yine her türlü belge bilgi ve hukuki desteği sağlayacağını, ayrıca FİRMA&rsquo;dan kaynaklanan bir nedenle davanın aleyhe neticelenmesi halinde BANKA ve/veya İştirakleri&rsquo;nin tüm zarar ve ziyanını ilk yazılı talep üzerine karşılamayı kabul, beyan ve taahhüt eder.<br />
    FİRMA, kendisinin ve/veya personelinin işbu Sözleşme kapsamında öngörülen haller dışında kendisine aktarılan kişisel verilerin herhangi bir üçüncü kişiye açıklanması, aktarılması halinde ya da üçüncü bir gerçek ya da tüzel kişinin bu Sözleşme kapsamındaki bilgilere herhangi bir şekilde ulaşması halinde, BANKA ve/veya İştirakleri&rsquo;nin sözleşmeyi tek yanlı olarak feshedebileceğini ve BANKA ve/veya İştirakleri&rsquo;nin doğmuş ve doğacak tüm zararını tazmin etmekle yükümlü olacağını kabul, beyan ve taahhüt eder.<br />
    FİRMA, ilgili mevzuat kapsamında meydana gelebilecek herhangi bir değişiklik veya güncelleme nedeniyle süreçlerinde bir değişiklik gerekmesi halinde, söz konusu değişikliği en geç ilgili yeni/güncel düzenleme yürürlüğe girmeden evvel tamamlamakla yükümlüdür. Bahsi geçen düzenlemenin işbu Sözleşme kapsamında bir değişiklik gerektirmesi halinde ise, FİRMA, Sözleşme&rsquo;nin uygun şekilde tadilini gerçekleştirmeyi kabul ve taahhüt eder. Değişiklik gereken Sözleşme hükmü, FİRMA bu hususta bir harekete geçmemiş olsa dahi yürürlük tarihi itibariyle güncel mevzuata uygun şekilde uygulanacaktır.<br />
    BANKA tarafından FİRMA&rsquo;ya aktarılacak kişisel veriler, aktarımları süresince ve sonrasında kesin olarak gizli tutulacak ve her ne şekilde olursa olsun işbu Sözleşme&rsquo;de belirtilen yükümlülükler, Gizli Bilgi&rsquo;nin gizliliği ve güvenliği başta olmak üzere, süresiz olarak devam edecektir.
  `,
          name: 'YKB_KVKK',
          shortText: 'KVKK Onay Metni',
        },
      ],
    });
  },

  getUserProfile: () => {
    return Promise.resolve({
      data: {
        firstName: 'test',
        lastName: 'test',
        emailOrIdentifier: 'u000000',
        phoneNumber: '905555555555',
        identityNumber: 'u000000',
        guid: '8bd0e434-a1a3-4b67-b9c6-9de0b8405255',
        picture:
          'https://www.etkinlikmobile.yapikredi.com.tr/getavatar/205b64d7-f1ac-48e7-9399-71566b310158/avatar.jpeg?maxsidesize=9394&width=86&height=86&mediaprotectionhash=dfc7f182dbfed2af14fee0329102b801d2479221c8e909ac4a6590365194d0e2',
      },
    });
  },
};

export default MockService;
