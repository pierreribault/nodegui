import { QLabel, FlexLayout, QPixmap } from '@nodegui/nodegui';
import { GesAPI } from 'myges'
import axios from 'axios';

export class ProfilLayout {

  ges: GesAPI;
  image: QLabel;
  title: QLabel;
  ine: QLabel;
  birthday: QLabel;
  mobile: QLabel;
  email: QLabel;
  address: QLabel;
  layout: FlexLayout;

  constructor(layout: FlexLayout, token_type: string, access_token: string) {

    this.ges = new GesAPI({
      'token_type': token_type,
      'access_token': access_token
    });

    this.layout = layout;

    this.image = new QLabel();
    this.image.setInlineStyle(`
      margin: 20px 0;
    `);

    this.title = new QLabel();
    this.title.setObjectName("title");
    this.title.setInlineStyle(`
      font-size: 16px;
       margin: 5px 0;
    `);

    this.ine = new QLabel();
    this.ine.setObjectName("ine");

    this.birthday = new QLabel();
    this.birthday.setObjectName("birthday");

    this.mobile = new QLabel();
    this.mobile.setObjectName("mobile");

    this.email = new QLabel();
    this.email.setObjectName("email");

    this.address = new QLabel();
    this.address.setObjectName("address");
  }

  async render() {
    let profil = await this.getProfil();

    const { data } = await axios.get('https://ges-dl.kordis.fr/public/dEkj-aOcIw52B9RsgY-opzkMREiXj9IWCZSMwXEBz3M?pfdrid_c=true', { responseType: 'arraybuffer' });
    const pixmap = new QPixmap();
    pixmap.loadFromData(data);
    
    this.image.setPixmap(pixmap);
    this.layout.addWidget(this.image);

    this.title.setText(`Bienvenue ${profil.civility} ${profil.name} ${profil.firstname}`);
    this.layout.addWidget(this.title);

    this.ine.setText(`Code INE: ${profil.ine}`);
    this.layout.addWidget(this.ine);

    const birthday = new Date(profil.birthday);
    this.birthday.setText(`Date de naissance: ${birthday.getDate()} ${birthday.getMonth()} ${birthday.getFullYear()}`);
    this.layout.addWidget(this.birthday);

    this.mobile.setText(`Téléphone: ${profil.mobile}`);
    this.layout.addWidget(this.mobile);

    this.email.setText(`Email: ${profil.email}`);
    this.layout.addWidget(this.email);

    this.address.setText(`Adresse: ${profil.address1} ${profil.city} ${profil.zipcode} ${profil.country}`);
    this.layout.addWidget(this.address);
  }

  async getProfil() {
    return await this.ges.getProfile();
  }
}