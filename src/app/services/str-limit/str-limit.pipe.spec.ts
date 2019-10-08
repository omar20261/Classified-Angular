import { StrLimitPipe } from './str-limit.pipe';

describe('StrLimitPipe', () => {
  it('create an instance', () => {
    const pipe = new StrLimitPipe();
    expect(pipe).toBeTruthy();
  });
});
