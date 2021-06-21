import { SquareMetricMilesPipe } from './square-metric-miles-pipe';

describe('SquareMetricMilesPipe', () => {
  const pipe = new SquareMetricMilesPipe();
  
  it('should create an instance', () => {
    expect(new SquareMetricMilesPipe()).toBeTruthy();
  });
  
  it('should convert metric km to metric miles without decimals', () => {
    expect(pipe.transform(323802.0)).toBe('125020');
  })

  it('should handle null values', () => {
    expect(pipe.transform(null)).toBe('0');
  })

  it('should handle undefined values', () => {
    expect(pipe.transform(undefined)).toBe('0');
  })
});
