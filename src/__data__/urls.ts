import { getNavigations, getNavigationsValue } from '@brojs/cli';
import pkg from '../../package.json';

const baseUrl = getNavigationsValue(`${(pkg as any).name}.main`);
const navs = getNavigations();

export const URLs = {
    baseUrl, // init
    home: {
        url: navs[`${(pkg as any).name}.home`],
    },
    chat: {
        url: navs[`${(pkg as any).name}.chat`],
    },
    auth: {
        url: navs[`${(pkg as any).name}.auth`], // sign in
    },
    reg: {
        url: navs[`${(pkg as any).name}.reg`], // sign up
    },
    account: {
        url: navs[`${(pkg as any).name}.account`],
    },
};
