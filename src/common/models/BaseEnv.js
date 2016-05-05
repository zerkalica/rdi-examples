/* @flow */

export default class BaseEnv {
    referrer: string;
    userAgent: string;
    language: string;

    constructor(rec: {
        referrer: string;
        userAgent: string;
        language: string;
    }) {
        this.referrer = rec.referrer
        this.userAgent = rec.userAgent
        this.language = rec.language
    }
}
