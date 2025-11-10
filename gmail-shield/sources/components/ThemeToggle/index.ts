import dark from '@/assets/themes/dark.svg';
import light from '@/assets/themes/light.svg';
import { LogLevels, MessageKinds, Themes } from '@/constants';
import { NotFoundElement } from '@/exceptions';
import { Component } from '@/utilities';
import { Messenger, Storage } from '@/utilities';

export class ThemeToggle extends Component {
  private static _symbol: HTMLElement | null = null;

  static async build(args: { fixed: boolean } = { fixed: false }) {
    const theme = await Storage.getOne('theme');

    const GmailShieldThemeContainer = document.createElement('div');
    GmailShieldThemeContainer.id = 'gmail-shield-theme-container';
    GmailShieldThemeContainer.className = `gmail-shield-theme-container ${args.fixed ? 'fixed' : ''} ${theme === Themes.Dark ? 'dark-mode' : 'light-mode'}`;

    const GmailShieldThemeButton = document.createElement('button');
    GmailShieldThemeButton.className = 'gmail-shield-theme-button';
    GmailShieldThemeButton.id = 'gmail-shield-theme';
    GmailShieldThemeButton.addEventListener('click', () => this.toggle());

    const GmailShieldThemeSymbol = document.createElement('span');
    GmailShieldThemeSymbol.className = 'gmail-shield-theme-symbol';
    GmailShieldThemeSymbol.innerHTML = theme === Themes.Dark ? light : dark;

    GmailShieldThemeButton.appendChild(GmailShieldThemeSymbol);
    GmailShieldThemeContainer.appendChild(GmailShieldThemeButton);

    this._element = GmailShieldThemeContainer;
    this._symbol = GmailShieldThemeSymbol;

    return GmailShieldThemeContainer;
  }

  static async rebuild(args: { fixed: boolean } = { fixed: false }) {
    if (!this._element) throw new NotFoundElement();

    this._element.remove();

    this._element = await this.build(args);

    return this._element;
  }

  static async toggle() {
    if (!this._element || !this._symbol) throw new NotFoundElement();

    const theme = await Storage.getOne('theme');

    const newTheme = theme === Themes.Dark ? Themes.Light : Themes.Dark;

    await Storage.save({ theme: newTheme });

    this._symbol.innerHTML = newTheme === Themes.Dark ? light : dark;

    const elements = document.querySelectorAll('.dark-mode, .light-mode');

    elements.forEach((element) => {
      element.classList.toggle('dark-mode');
      element.classList.toggle('light-mode');
    });

    Messenger.cast({
      kind: MessageKinds.Theme,
      value: newTheme,
      logger: {
        level: LogLevels.Info,
        value: `テーマを"${newTheme === Themes.Dark ? 'ダークモード' : 'ライトモード'}"にしました`,
      },
    });
  }
}
