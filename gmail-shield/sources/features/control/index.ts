import { Themes } from '@/constants';
import { EntryComponent, Storage } from '@/utilities';

import { Home } from './pages';

export class Control extends EntryComponent {
  static async start() {
    if (this._element) return;

    const theme = await Storage.getOne('theme');

    const GmailShieldControl = document.createElement('div');
    GmailShieldControl.className = `gmail-shield-control ${theme === Themes.Dark ? 'dark-mode' : 'light-mode'}`;

    document.documentElement.appendChild(GmailShieldControl);

    this._element = GmailShieldControl;

    await Home.render();
  }
}
