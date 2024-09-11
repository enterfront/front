import { getNavigations, getNavigationsValue } from '@ijl/cli';
import pkg from '../../package.json';

const baseUrl = getNavigationsValue(`${(pkg as any).name}.main`);
const navs = getNavigations();
const makeUrl = url => baseUrl + url;

export const URLs = {
    baseUrl,
    auth: {
        url: makeUrl(navs[`link.${(pkg as any).name}.auth`]),
    },
    account: {
        url: makeUrl(navs[`link.${(pkg as any).name}.account`]),
    }
};
