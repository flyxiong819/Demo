import {config} from '@vue/test-utils';

// mock i18n
config.mocks.$t = key => key;
