/* @flow */

export default class BaseEnv {
    referrer: string;
    userAgent: string;
    language: string;
    platform: string;

    constructor(rec: {
        referrer: string;
        userAgent: string;
        language: string;
        platform: string;
    }) {
        this.referrer = rec.referrer
        this.userAgent = rec.userAgent
        this.language = rec.language
        this.platform = rec.platform
    }
}
