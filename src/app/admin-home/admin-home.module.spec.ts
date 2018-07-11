import { AdminHomeModule } from './admin-home.module';

describe('AdminHomeModule', () => {
  let adminHomeModule: AdminHomeModule;

  beforeEach(() => {
    adminHomeModule = new AdminHomeModule();
  });

  it('should create an instance', () => {
    expect(adminHomeModule).toBeTruthy();
  });
});
