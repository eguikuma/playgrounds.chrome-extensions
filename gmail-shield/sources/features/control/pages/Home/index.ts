import { ThemeToggle } from '@/components';
import { PageComponent } from '@/utilities';

import { Control } from '../..';
import {
  Container,
  Divider,
  LoggingOptions,
  ModeOptions,
  ReactivateOptions,
  StateToggle,
  Title,
} from '../../components';

export class Home extends PageComponent {
  static async render() {
    const PageContainer = Container.build();

    const GmailShieldControlWrapper = document.createElement('div');
    GmailShieldControlWrapper.className = 'gmail-shield-control-wrapper';

    const GmailShieldControlBottomWrapper = document.createElement('div');
    GmailShieldControlBottomWrapper.className = 'gmail-shield-control-bottom-wrapper';

    GmailShieldControlWrapper.appendChild(await ModeOptions.build());
    GmailShieldControlWrapper.appendChild(Divider.build());
    GmailShieldControlWrapper.appendChild(await ReactivateOptions.build());
    GmailShieldControlWrapper.appendChild(Divider.build());
    GmailShieldControlWrapper.appendChild(await LoggingOptions.build());
    PageContainer.appendChild(Title.build());
    PageContainer.appendChild(GmailShieldControlWrapper);
    GmailShieldControlBottomWrapper.appendChild(await ThemeToggle.build());
    GmailShieldControlBottomWrapper.appendChild(await StateToggle.build());
    PageContainer.appendChild(GmailShieldControlBottomWrapper);

    Control.replace(PageContainer);
  }
}
