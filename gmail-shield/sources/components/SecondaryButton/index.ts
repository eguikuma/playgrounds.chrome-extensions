import { Component } from '@/utilities';

export class SecondaryButton extends Component {
  static build({
    id,
    label,
    handler,
  }: {
    id: string;
    label: string;
    handler?: (e: MouseEvent) => Promise<void> | void;
  }) {
    const GmailShieldSecondaryButton = document.createElement('button');
    GmailShieldSecondaryButton.className = 'gmail-shield-button secondary';
    GmailShieldSecondaryButton.id = id;
    GmailShieldSecondaryButton.textContent = label;

    handler && GmailShieldSecondaryButton.addEventListener('click', handler);

    return GmailShieldSecondaryButton;
  }
}
