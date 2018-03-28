import * as protobuf from 'protobufjs';

export class Selector {

    // see https://developers.google.com/protocol-buffers/docs/reference/proto3-spec and
    // https://cloud.google.com/service-management/reference/rpc/google.api#google.api.DocumentationRule.FIELDS.string.google.api.DocumentationRule.selector
    private validationRegex = /^([a-zA-Z][a-zA-Z0-9_]*\.)*(([a-zA-Z][a-zA-Z0-9_]*)|\*)$/;

    private selectorRegexes: RegExp[];

    /**
     * 
     * @param selector comman seperated list of patterns see 
     * [Google Documentation](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.DocumentationRule.FIELDS.string.google.api.DocumentationRule.selector)
     * for syntax   
     */
    constructor(selector: string) {
        const selectorStrings = selector.split(',').map(s => s.trim());

        selectorStrings.forEach(individualSelector => {
            if (!this.validationRegex.test(individualSelector)) {
                throw new Error(`Error with selector string '${individualSelector}. ` +
                ` For syntax see https://cloud.google.com/service-management/reference/rpc/google.api#google.api.DocumentationRule.FIELDS.string.google.api.DocumentationRule.selector'`);
            }
        });

        this.selectorRegexes = selectorStrings.map(s => this.createRegexpFromSelector(s))
            // add also camel case versions
            .concat(selectorStrings.map(s => this.createRegexpFromSelector(protobuf.util.camelCase(s))));
    }

    private createRegexpFromSelector(selector: string): RegExp {
        return new RegExp(`^${selector.replace('.', '\\.').replace('*', '.+')}$`);
    }

    /**
     * Test if element matches the selector
     * @param proto 
     */
    match(proto: { fullName: string }) {
        const name = proto.fullName.startsWith('.') ? proto.fullName.substr(1): proto.fullName;
        
        return !!this.selectorRegexes.find(r => r.test(name));
    }
}
