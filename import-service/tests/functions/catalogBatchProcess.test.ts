import { handler } from '../../src/functions/catalogBatchProcess';
import { queueRecords } from '../fixtures';

jest.mock('@aws-sdk/client-sns', () => ({
  ...jest.requireActual('@aws-sdk/client-sns'),
  PublishCommand: jest.fn(),
  SNSClient: class SNSMock {
    send() {
      return;
    } 
  },
}));
jest.mock('pg', () => ({
  ...jest.requireActual('pg'),
  Client: jest.fn(() => ({
    connect: jest.fn(),
    end: jest.fn(),
  })),
}));
jest.mock('../../src/utils', () => ({
  ...jest.requireActual('../../src/utils'),
  createProducts: jest.fn(() => jest.fn()),
}));

describe('catalogBatchProcess', () => {
  it('should return response with 201 code on success', async () => {
    const res = await handler({ Records: [{ body: JSON.stringify(queueRecords) }] }, {});

    expect(res).toEqual(expect.objectContaining({
      statusCode: 201,
    }));
  });

  it('should return response with 500 code on internal error', async () => {
    const res = await handler({}, {});

    expect(res).toEqual(expect.objectContaining({
      statusCode: 500,
    }));
  });
});
