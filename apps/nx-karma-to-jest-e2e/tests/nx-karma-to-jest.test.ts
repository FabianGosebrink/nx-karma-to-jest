import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq
} from '@nrwl/nx-plugin/testing';
describe('nx-karma-to-jest e2e', () => {
  it('should create nx-karma-to-jest', async done => {
    const plugin = uniq('nx-karma-to-jest');
    ensureNxProject(
      '@offeringsolutions/nx-karma-to-jest',
      'dist/libs/nx-karma-to-jest'
    );
    await runNxCommandAsync(
      `generate @offeringsolutions/nx-karma-to-jest:nxKarmaToJest ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async done => {
      const plugin = uniq('nx-karma-to-jest');
      ensureNxProject(
        '@offeringsolutions/nx-karma-to-jest',
        'dist/libs/nx-karma-to-jest'
      );
      await runNxCommandAsync(
        `generate @offeringsolutions/nx-karma-to-jest:nxKarmaToJest ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async done => {
      const plugin = uniq('nx-karma-to-jest');
      ensureNxProject(
        '@offeringsolutions/nx-karma-to-jest',
        'dist/libs/nx-karma-to-jest'
      );
      await runNxCommandAsync(
        `generate @offeringsolutions/nx-karma-to-jest:nxKarmaToJest ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
