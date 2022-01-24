import { QLabel, FlexLayout, QPushButton, QLineEdit, QPixmap } from '@nodegui/nodegui';
import { GesAPI } from 'myges'
import mygesLogo from '../assets/logo_myges.png';
import { ProfilLayout } from './ProfilLayout';

export class LoginLayout {

  image: QLabel;
  title: QLabel;
  error: QLabel;
  login: QLineEdit;
  password: QLineEdit;
  button: QPushButton;
  layout: FlexLayout;

  constructor(layout: FlexLayout) {
    this.layout = layout;

    this.image = new QLabel();
    this.image.setPixmap(new QPixmap(mygesLogo));

    this.title = new QLabel();
    this.title.setObjectName("title");
    this.title.setText("Entrez votre identifiant et votre mot de passe.");
    this.title.setInlineStyle(`
      font-size: 16px;
    `);

    this.error = new QLabel();
    this.error.setObjectName("error");
    this.error.hide();

    this.login = new QLineEdit();
    this.login.setPlaceholderText('Identifiant');
    this.login.setObjectName('input')

    this.password = new QLineEdit();
    this.password.setPlaceholderText('Mot de passe');
    this.password.setEchoMode(2)
    this.password.setObjectName('input')

    this.button = new QPushButton();
    this.button.setText('Connexion');
    this.button.setObjectName('btn-primary');
    this.button.addEventListener('clicked', () => {
      this.loginAttempt(this.login, this.password, this.error);
    });
  }

  render() {
    this.layout.addWidget(this.image);
    this.layout.addWidget(this.title);
    this.layout.addWidget(this.error);
    this.layout.addWidget(this.login);
    this.layout.addWidget(this.password);
    this.layout.addWidget(this.button);
  }

  destroy() {
    this.layout.removeWidget(this.image);
    this.layout.removeWidget(this.title);
    this.layout.removeWidget(this.error);
    this.layout.removeWidget(this.login);
    this.layout.removeWidget(this.password);
    this.layout.removeWidget(this.button);
    this.image.hide();
    this.title.hide();
    this.error.hide();
    this.login.hide();
    this.password.hide();
    this.button.hide();
  }

  async loginAttempt(login: QLineEdit, password: QLineEdit, error: QLabel) {
    const successStyle = {
      'color': "#34D399",
      'message': "Connexion réussie!"
    }

    const errorStyle = {
      'color': "#F56565",
      'message': "Identifiants invalides."
    }

    function render(style: any) {
      error.setText(style.message);
      error.setStyleSheet(`
        background-color: ${style.color};
        border: 1px solid ${style.color};
      `);
      error.show();

      login.setInlineStyle(`
        border: 1px solid ${style.color};
      `);
      password.setInlineStyle(`
        border: 1px solid ${style.color};
      `);
    }

    try {
      let token = await GesAPI.generateAccessToken(login.text(), password.text());

      render(successStyle);

      if (token?.token_type != null && token.access_token != null) {
        this.destroy();

        const profilLayout = new ProfilLayout(this.layout, token.token_type, token.access_token);
        await profilLayout.render()
      }
    } catch (e) {
      render(errorStyle);
    }
  }
}