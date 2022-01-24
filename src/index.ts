import { QMainWindow, QWidget, FlexLayout } from '@nodegui/nodegui';
import { LoginLayout } from './LoginLayout'

const win = new QMainWindow();
win.setWindowTitle("Myges Portal");

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");

let rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const loginLayout = new LoginLayout(rootLayout);
loginLayout.render();

win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #333333;
      height: 600px;
      width: 400px;
      align-items: 'center';
      justify-content: 'top';
    }
    #input {
      padding: 10px;
      font-size: 14px;
      width: 300px;
      border: 1px solid transparent;
      border-radius: 5px;
    }
    #error {
      padding: 5px;
      font-size: 16px;
      width: 300px;
      color: #FFF;
      border-radius: 5px;
      margin: 10px 0 5px 0;
    }
    #btn-primary {
      background-color: #217BB2;
      font-size: 16px;
      font-weight: 600;
      padding: 10px;
      border: 1px solid transparent;
      border-radius: 5px;
      cursor: pointer;
    }
  `
);
win.show();

(global as any).win = win;
