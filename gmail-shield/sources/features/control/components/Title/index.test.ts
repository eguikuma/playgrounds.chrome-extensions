import { describe, it, expect } from 'vitest';

import { Title } from '.';

describe('Title', () => {
  it('タイトル要素にアイコン、タイトル、サブタイトルが含まれていること', () => {
    const wrapper = Title.build();

    expect(wrapper.className).toBe('gmail-shield-control-title-wrapper');
    expect(wrapper.querySelector('.gmail-shield-control-symbol')).not.toBeNull();
    expect(wrapper.querySelector('.gmail-shield-control-symbol')?.innerHTML).not.toBe('');
    expect(wrapper.querySelector('.gmail-shield-control-title')).not.toBeNull();
    expect(wrapper.querySelector('.gmail-shield-control-title')?.textContent).toBe('Gmail Shield');
    expect(wrapper.querySelector('.gmail-shield-control-subtitle')).not.toBeNull();
    expect(wrapper.querySelector('.gmail-shield-control-subtitle')?.textContent).toBe(
      '拡張機能の設定を変更できます'
    );
  });
});
