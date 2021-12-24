import './style.scss';
// import './ts/toysPage/uislider';
// import './ts/toysPage/controller';
// import './ts/toysPage/entry';
// import './ts/toysPage/model';
// import './ts/toysPage/view';
// import './ts/toysPage/utilits';
// import './ts/toysPage/filterBlocks';
// import './ts/interfases';
// import './ts/toysPage/reset';
// import './ts/application';
// import './ts/router';

import BuilderModule from './ts/builder/module';
import { BuilderComponent } from './ts/builder/component';
import bootstrap from './ts/builder/bootstrap';
import appModule from './ts/app/appModule';
import helper from './ts/builder/tools/helper';

export { BuilderModule, BuilderComponent, bootstrap, helper };

helper.delay(1000).then(() => {
  bootstrap(appModule);
});
