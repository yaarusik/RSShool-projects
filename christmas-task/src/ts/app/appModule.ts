import BuilderModule, { IBuilderConfig } from '../builder/module';
import appComponent from './appComponent';
import appRoutes from './appRouts';
import appHeader from './common/appHeader';

class AppModule extends BuilderModule {
  constructor(config: IBuilderConfig) {
    super(config);
  }
}
const appModule = new AppModule({
  components: [appHeader],
  bootstrap: appComponent,
  routes: appRoutes,
});

export default appModule;
