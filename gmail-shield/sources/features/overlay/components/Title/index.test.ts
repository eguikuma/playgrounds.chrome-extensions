import { describe, it, expect } from 'vitest';

import { TitleSections } from '../../constants';

import { Title } from '.';

describe('Title', () => {
  it('セクション情報を使用してタイトル要素を生成すること', () => {
    const section = TitleSections.SetupPassword;
    const title = Title.build(section);
    const symbol = title.querySelector('.gmail-shield-symbol');
    const message = title.querySelector('.gmail-shield-message-wrapper');

    expect(title).toBeInstanceOf(HTMLDivElement);
    expect(title.className).toBe('gmail-shield-title-wrapper');
    expect(symbol).not.toBeNull();
    expect(symbol?.innerHTML).toContain('svg');
    expect(message).not.toBeNull();
    expect(message?.querySelector('.gmail-shield-primary-message')?.textContent).toBe(
      section.primary
    );
    expect(message?.querySelector('.gmail-shield-secondary-message')?.textContent).toBe(
      section.secondary
    );
  });
});
