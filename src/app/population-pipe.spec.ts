import { PopulationPipe } from './population-pipe';

describe('PopulationPipe', () => {
  const pipe = new PopulationPipe();
  
  it('should create an instance', () => {
    expect(new PopulationPipe()).toBeTruthy();
  });
  
  it('should transform population to millions with one decimal', () => {
    expect(pipe.transform(5223256)).toBe('5.2');
  })

  it('should handle null values', () => {
    expect(pipe.transform(null)).toBe('0.0');
  })

  it('should handle undefined values', () => {
    expect(pipe.transform(undefined)).toBe('0.0');
  })
});
