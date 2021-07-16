
import { getSteps} from '../Map';


test('generating map steps', () => {

    const prev = {latitude: 10, longitude: 10};
    const next = {latitude: 20, longitude: 20};
    const steps = 10;

    const expectedResult = [
        {latitude: 11, longitude: 11},
        {latitude: 12, longitude: 12},
        {latitude: 13, longitude: 13},
        {latitude: 14, longitude: 14},
        {latitude: 15, longitude: 15},
        {latitude: 16, longitude: 16},
        {latitude: 17, longitude: 17},
        {latitude: 18, longitude: 18},
        {latitude: 19, longitude: 19},
        {latitude: 20, longitude: 20}]

    const actualResults = getSteps(prev, next, steps);

    expect(actualResults.length).toBe(steps);
    expect(actualResults).toEqual(expectedResult);
    expect(actualResults[actualResults.length-1]).toEqual(next);
  });